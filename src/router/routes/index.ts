import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const VbenRoutes: AppRouteModule[] = [
  {
    path: '/vben',
    name: 'VBenDemo',
    component: LAYOUT,
    meta: {
      icon: 'ant-design:table-outlined',
      title: 'VBenDemo',
    },
    children: routeModuleList,
  },
];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

/**
 * 前端路由，不会显示到菜单
 */
export const ConstRouter: AppRouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    redirect: '/home/welcome',
    meta: {
      icon: 'bx:bx-home',
      title: t('routes.dashboard.welcome'),
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('/@/views/lamp/home/index.vue'),
        meta: {
          title: t('routes.dashboard.welcome'),
          affix: true,
          icon: 'bx:bx-home',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: LAYOUT,
    redirect: '/profile/index',
    meta: {
      title: '个人中心',
      hideMenu: true,
    },
    children: [
      {
        path: 'index',
        name: 'profileIndex',
        component: () => import('/@/views/lamp/profile/index.vue'),
        meta: {
          title: '个人中心',
          hideMenu: true,
        },
      },
    ],
  },
  // {
  //   path: '/system',
  //   name: 'system',
  //   component: LAYOUT,
  //   redirect: '/system/menu',
  //   meta: {
  //     title: '角色管理',
  //   },
  //   children: [
  //     {
  //       path: 'roleResource/:roleId',
  //       name: 'roleResource',
  //       component: () => import('/@/views/lamp/system/role/resource/RoleResource.vue'),
  //       meta: {
  //         title: '绑定资源',
  //         hideMenu: true,
  //         currentActiveMenu: '/system/role',
  //       },
  //     },
  //     {
  //       path: 'dictionaryItem/:type',
  //       name: 'dictionaryItem',
  //       component: () => import('/@/views/lamp/system/dictionaryItem/index.vue'),
  //       meta: {
  //         title: '字典项管理',
  //         hideMenu: true,
  //         currentActiveMenu: '/system/dictionary',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/resources',
  //   name: 'resources',
  //   component: LAYOUT,
  //   redirect: '/resources/msg',
  //   meta: {
  //     title: '资源管理',
  //   },
  //   children: [
  //     {
  //       path: 'sms/:id',
  //       name: 'smsEdit',
  //       component: () => import('/@/views/lamp/resources/sms/Edit.vue'),
  //       meta: {
  //         title: '发送短信',
  //         hideMenu: true,
  //         currentActiveMenu: '/resources/sms',
  //       },
  //     },
  //     {
  //       path: 'msg/:id',
  //       name: 'msgEdit',
  //       component: () => import('/@/views/lamp/resources/msg/Edit.vue'),
  //       meta: {
  //         title: '发送消息',
  //         hideMenu: true,
  //         currentActiveMenu: '/resources/msg',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/workbench',
  //   name: 'workbench',
  //   component: LAYOUT,
  //   redirect: '/workbench/notice',
  //   meta: {
  //     title: '通知公告',
  //   },
  //   children: [
  //     {
  //       path: 'notice/:id',
  //       name: 'noticeView',
  //       component: () => import('/@/views/lamp/workbench/notice/View.vue'),
  //       meta: {
  //         title: '我的消息',
  //         hideMenu: true,
  //         currentActiveMenu: '/workbench/notice',
  //       },
  //     },
  //   ],
  // },
];

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
