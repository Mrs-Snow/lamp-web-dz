import type { DefUserInfoResultVO } from '/#/store';
import { defHttp } from '/@/utils/http/axios';
import { LoginParamVO, LogoutParams, LoginResultVO } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getUserInfoById = '/oauth/anyone/getUserInfoById',
  Login = '/oauth/anyTenant/login',
  Logout = '/oauth/anyUser/logout',
  LoadCaptcha = '/oauth/anyTenant/captcha',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParamVO, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultVO>(
    {
      url: Api.Login,
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
export function getUserInfoById(userId?: string) {
  return defHttp.get<DefUserInfoResultVO>(
    {
      url: Api.getUserInfoById,
      params: { userId },
    },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: 加载验证码
 */
export function loadCaptcha(key: String) {
  return defHttp.request(
    {
      url: Api.LoadCaptcha,
      method: 'GET',
      responseType: 'arraybuffer',
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
    url: Api.Logout,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
}
