import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LogoutParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  GetUserInfoModel,
  GetAuthorityResourceByUserIdParams,
  GetAuthorityResourceByUserIdModel,
} from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getUserInfo = '/getUserInfoById',
  GetPermCodeByUserId = '/oauth/resource/visible',
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
export function getUserInfo(params: GetUserInfoByUserIdParams) {
  return defHttp.get<GetUserInfoModel>(
    {
      url: Api.getUserInfo,
      params,
    },
    { errorMessageMode: 'none' },
  );
}

/**
 * 根据
 * @param params
 */
export function getPermCode(params?: GetAuthorityResourceByUserIdParams) {
  return defHttp.get<GetAuthorityResourceByUserIdModel>({
    url: Api.GetPermCodeByUserId,
    params,
  });
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
