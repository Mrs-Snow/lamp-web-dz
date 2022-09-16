import type { DefUserInfoResultVO } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import {
  APPLICATION_ID_KEY,
  EXPIRE_TIME_KEY,
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TENANT_ID_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import type {
  LoginParamVO,
  LogoutParams,
  RegisterByEmailVO,
  RegisterByMobileVO,
} from '/@/api/lamp/common/model/userModel';

import {
  doLogout,
  getUserInfoById,
  loadCaptcha,
  loginApi,
  registerByEmail,
  registerByMobile,
  switchTenantAndOrg,
} from '/@/api/lamp/common/oauth';

import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { h } from 'vue';
import { useTabs } from '/@/hooks/web/useTabs';
import { useGlobSetting } from '/@/hooks/setting';

const globSetting = useGlobSetting();
const DEF_APP_ID = globSetting.defApplicationId;

interface UserState {
  userInfo: Nullable<DefUserInfoResultVO>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  refreshToken?: string;
  expireTime?: string;
  tenantId?: string;
  applicationId: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    refreshToken: '',
    expireTime: '',
    // 租户ID
    tenantId: '',
    // 应用id
    applicationId: '',
  }),
  getters: {
    getUserInfo(): DefUserInfoResultVO {
      return this.userInfo || getAuthCache<DefUserInfoResultVO>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
    getRefreshToken(): string {
      return this.refreshToken || getAuthCache<string>(REFRESH_TOKEN_KEY);
    },
    getExpireTime(): string {
      return this.expireTime || getAuthCache<string>(EXPIRE_TIME_KEY);
    },
    // 4.0.0 存储的是租户id
    getTenantId(): string {
      return this.tenantId || getAuthCache<string>(TENANT_ID_KEY);
    },
    getApplicationId(): string {
      return this.applicationId || getAuthCache<string>(APPLICATION_ID_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: DefUserInfoResultVO | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    // 4.0.0 存储的是租户id
    setTenantId(info: string) {
      this.tenantId = info;
      setAuthCache(TENANT_ID_KEY, info);
    },
    setApplicationId(info: string) {
      this.applicationId = info;
      setAuthCache(APPLICATION_ID_KEY, info);
    },
    setExpireTime(info: string) {
      this.expireTime = info;
      setAuthCache(EXPIRE_TIME_KEY, info);
    },
    setRefreshToken(info: string) {
      this.refreshToken = info;
      setAuthCache(REFRESH_TOKEN_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
      this.tenantId = '';
      this.expireTime = '';
      this.refreshToken = '';
      this.applicationId = '';
    },

    async switchTenantAndOrg(switchTenantId: string, companyId: string, deptId: string) {
      try {
        const data = await switchTenantAndOrg(switchTenantId, companyId, deptId);
        const { token, tenantId, refreshToken, expiration, applicationId } = data;
        // save token
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        this.setExpireTime(expiration);
        this.setTenantId(tenantId);
        this.setApplicationId(applicationId ?? DEF_APP_ID);
        this.setSessionTimeout(false);
        const permissionStore = usePermissionStore();
        permissionStore.resetState();
        const { closeAll } = useTabs(router);
        await closeAll();
        await router.replace(PageEnum.BASE_HOME);
        setTimeout(() => {
          location.reload();
        }, 200);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: login
     */
    async login(
      params: LoginParamVO & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<DefUserInfoResultVO | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token, tenantId, refreshToken, expiration, applicationId } = data;

        // save token
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        this.setExpireTime(expiration);
        this.setTenantId(tenantId);
        this.setApplicationId(applicationId ?? DEF_APP_ID);

        return this.afterLoginAction(mode, goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction(
      mode: ErrorMessageMode,
      goHome?: boolean,
    ): Promise<DefUserInfoResultVO | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction(mode);

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },

    // 刷新时加载用户信息
    async getUserInfoAction(mode: ErrorMessageMode = 'none'): Promise<DefUserInfoResultVO> {
      const userInfo = await getUserInfoById(mode);
      this.setUserInfo(userInfo);
      return userInfo;
    },

    async loadCaptcha(key: string): Promise<string | ''> {
      try {
        const res = await loadCaptcha(key).catch((e) => {
          const { createMessage } = useMessage();
          if (e.toString().indexOf('429') !== -1) {
            createMessage.error('获取验证码过于频繁，请1分钟后再试');
          } else {
            createMessage.error('加载验证码失败');
          }
        });
        if (res.byteLength <= 100) {
          const { createMessage } = useMessage();
          createMessage.error('系统维护中，请稍微再试~');
          return '';
        }
        return (
          'data:image/png;base64,' +
          btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        );
      } catch (error) {
        console.error(error);
        return '';
      }
    },

    /**
     * @description: register
     */
    async registerByMobile(params: RegisterByMobileVO): Promise<string> {
      try {
        return await registerByMobile(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async registerByEmail(params: RegisterByEmailVO): Promise<string> {
      try {
        return await registerByEmail(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        const param: LogoutParams = {
          token: this.getToken,
        };
        await doLogout(param).finally(() => {
          this.setToken('');
          this.setSessionTimeout(false);
          goLogin && router.push(PageEnum.BASE_LOGIN);
        });
      } else {
        this.setToken('');
        this.setSessionTimeout(false);
        goLogin && router.push(PageEnum.BASE_LOGIN);
      }
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
