import type { DefUserInfoResultVO } from '/#/store';
import { defHttp } from '/@/utils/http/axios';
import { LoginParamVO, LogoutParams, LoginResultVO } from './model/userModel';
import { MenuParams, MenuListResultModel, VisibleResourceVO } from './model/menuModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

import { ErrorMessageMode } from '/#/axios';
import { AxiosRequestConfig } from 'axios';

const Api = {
  // 登录
  Login: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/login`,
  },
  // 获取用户信息
  getUserInfoById: {
    url: `${ServicePrefixEnum.OAUTH}/anyone/getUserInfoById`,
  },
  // 退出
  Logout: { url: `${ServicePrefixEnum.OAUTH}/anyUser/logout` },
  // 加载验证码
  LoadCaptcha: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/captcha`,
    method: 'GET',
    responseType: 'arraybuffer',
  } as AxiosRequestConfig,
  // 获取菜单
  FindMenuList: {
    url: '/oauth/anyone/visible/router',
  },
  // 获取资源
  FindResourceList: {
    url: '/oauth/anyone/visible/resource',
  },
  // 切换当前企业
  SwitchTenant: {
    url: `${ServicePrefixEnum.OAUTH}/anyone/switchTenant`,
  },
  // 设置默认企业
  UpdateDefaultTenant: {
    url: `${ServicePrefixEnum.TENANT}/anyone/updateDefaultTenant`,
  },
  // 检测员工是否拥有指定应用的权限
  CheckEmployeeHaveApplication: {
    url: `${ServicePrefixEnum.OAUTH}/anyone/checkEmployeeHaveApplication`,
  },
};

/**
 * @description: user login api
 */
export function loginApi(params: LoginParamVO, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultVO>(
    {
      ...Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      withTenant: false,
    },
  );
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(mode: ErrorMessageMode = 'none', userId?: string) {
  return defHttp.get<DefUserInfoResultVO>(
    {
      ...Api.getUserInfoById,
      params: { userId: userId },
    },
    { errorMessageMode: mode },
  );
}

/**
 * @description: 加载验证码
 */
export function loadCaptcha(key: String) {
  return defHttp.request(
    {
      ...Api.LoadCaptcha,
      params: { key: key },
    },
    { isTransformResponse: false },
  );
}

/**
 * @description: user logout api
 */
export function doLogout(params: LogoutParams) {
  return defHttp.post<boolean>({
    ...Api.Logout,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
}

export function switchTenant(tenantId: string) {
  return defHttp.get<LoginResultVO>({
    ...Api.SwitchTenant,
    params: { tenantId },
  });
}

export function updateDefaultTenant(tenantId: string) {
  return defHttp.put<boolean>({
    ...Api.UpdateDefaultTenant,
    params: { tenantId },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
}

/**
 * @description: Get user menu based on id
 */

export const findMenuList = (params?: MenuParams) => {
  return defHttp.get<MenuListResultModel>({ ...Api.FindMenuList, params });
};

/**
 * 查询指定应用资源
 * @param params
 */
export function findResourceList(applicationId: string) {
  return defHttp.get<VisibleResourceVO>({
    ...Api.FindResourceList,
    params: { applicationId },
  });
}

export function checkEmployeeHaveApplication(applicationId: string) {
  return defHttp.get<boolean>({
    ...Api.CheckEmployeeHaveApplication,
    params: { applicationId },
  });
}
