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
 * 拼接在后端路由之前的前端路由
 */
export const BeforeRoutes: AppRouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    redirect: '/home/welcome',
    meta: {
      icon: 'bx:bx-home',
      hideMenu: true,
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
];

/**
 * 拼接在后端路由之后的前端路由
 */
export const AfterRoutes: AppRouteModule[] = [
  {
    path: '/myTenant',
    name: 'myTenant',
    component: LAYOUT,
    redirect: '/myTenant/info',
    meta: {
      title: '我的企业',
      hideChildrenInMenu: true,
      icon: 'ant-design:group-outlined',
    },
    children: [
      {
        path: 'info',
        name: 'myTenantInfo',
        component: () => import('/@/views/basic/myTenant/index.vue'),
        meta: {
          title: '我的企业',
          hideMenu: true,
          icon: 'ant-design:group-outlined',
        },
      },
    ],
  },
  {
    path: '/vben',
    name: '更多功能',
    component: LAYOUT,
    meta: {
      icon: 'ant-design:table-outlined',
      title: '更多功能',
    },
    children: routeModuleList,
  },
];

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
