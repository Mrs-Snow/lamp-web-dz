import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';

import projectSetting from '/@/settings/projectSetting';
import { useGlobSetting } from '/@/hooks/setting';
import { PermissionModeEnum } from '/@/enums/appEnum';

import { asyncRoutes, AfterRoutes, AfterVbenRoutes, AfterMyTenantRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

import { findMenuList, findResourceList } from '/@/api/lamp/common/oauth';
import { VisibleResourceVO } from '/@/api/lamp/common/model/menuModel';

import { useMessage } from '/@/hooks/web/useMessage';
import { PageEnum } from '/@/enums/pageEnum';

import { BeforeRoutes } from '/@/router/routes/index';

const globSetting = useGlobSetting();
const BASE_APP_ID = globSetting.baseApplicationId;
const DEV_OPER_APP_ID = globSetting.devOperationApplicationId;

interface PermissionState {
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
  // 权限
  visibleResource: VisibleResourceVO;
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
    // 权限
    visibleResource: {} as VisibleResourceVO,
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getVisibleResource(): VisibleResourceVO {
      return this.visibleResource;
    },
  },
  actions: {
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },

    setVisibleResource(visibleResource: VisibleResourceVO) {
      this.visibleResource = visibleResource;
    },

    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
      this.visibleResource = {} as VisibleResourceVO;
    },
    // 加载资源
    async changePermissionCode() {
      const userStore = useUserStore();
      const applicationId = userStore.getApplicationId;
      const visibleResource = await findResourceList(applicationId);
      this.setVisibleResource(visibleResource);
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          const menuList = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage();

          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });

          // 当前应用
          const applicationId = userStore.getApplicationId;
          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [];
          try {
            await this.changePermissionCode();
            routeList = (await findMenuList({ applicationId })) as AppRouteRecordRaw[];
          } catch (error) {
            console.error(error);
          }

          // 动态引入组件
          routeList = transformObjToRoute(routeList);

          const isBase = applicationId === BASE_APP_ID; // 基础平台才显示 我的企业
          const isDevOper = applicationId === DEV_OPER_APP_ID; // 开发运营系统才显示 vben官方的静态示例
          // 后台路由(routeList) + 前端写死的路由(BeforeRoutes、AfterRoutes、AfterMyTenantRoutes)
          const afterRouteList = [
            ...AfterRoutes,
            ...(isBase ? AfterMyTenantRoutes : []),
            ...(isDevOper ? AfterVbenRoutes : []),
          ];

          routeList = [...BeforeRoutes, ...routeList, ...afterRouteList];

          //  后台路由转菜单结构
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
      }

      routes.push(ERROR_LOG_ROUTE);
      patchHomeAffix(routes);
      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
