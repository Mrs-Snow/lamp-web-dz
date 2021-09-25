import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LogoutParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getUserInfoById = '/oauth/anyone/getUserInfoById',
  Login = '/oauth/anyUser/login',
  Logout = '/oauth/anyUser/logout',
  LoadCaptcha = '/oauth/anno/captcha',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
      headers: {
        tenant: params.tenant,
      },
    },
    {
      errorMessageMode: mode,
      withTenant: false,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfoById(userId?: string) {
  return defHttp.get<GetUserInfoModel>(
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
