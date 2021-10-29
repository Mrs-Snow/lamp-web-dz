import type { DefUserInfoResultVO } from '/#/store';
import { defHttp } from '/@/utils/http/axios';
import { LoginParamVO, LogoutParams, LoginResultVO } from './model/userModel';
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
  // 切换当前企业
  SwitchTenant: {
    url: `${ServicePrefixEnum.OAUTH}/anyone/switchTenant`,
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
