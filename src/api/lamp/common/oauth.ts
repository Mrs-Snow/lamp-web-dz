import type { DefUserInfoResultVO } from '/#/store';
import { defHttp } from '/@/utils/http/axios';
import {
  LoginParamVO,
  LoginResultVO,
  LogoutParams,
  RegisterByEmailVO,
  RegisterByMobileVO,
} from './model/userModel';
import { MenuListResultModel, MenuParams, VisibleResourceVO } from './model/menuModel';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

import { ErrorMessageMode } from '/#/axios';
import { AxiosRequestConfig } from 'axios';

export const Api = {
  // 登录
  Login: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/login`,
  },
  // 用户注册
  RegisterByMobile: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/registerByMobile`,
    method: RequestEnum.POST,
  },
  RegisterByEmail: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/registerByEmail`,
    method: RequestEnum.POST,
  },
  // 发送短信验证码
  SendSmsCode: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/sendSmsCode`,
    method: RequestEnum.GET,
  },
  // 发送邮箱验证码
  SendEmailCode: {
    url: `${ServicePrefixEnum.OAUTH}/anyTenant/sendEmailCode`,
    method: RequestEnum.GET,
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
    url: `${ServicePrefixEnum.BASE}/anyone/updateDefaultTenant`,
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

export function registerByMobile(params: RegisterByMobileVO, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<string>(
    {
      ...Api.RegisterByMobile,
      params,
    },
    {
      errorMessageMode: mode,
      withTenant: false,
    },
  );
}
export function registerByEmail(params: RegisterByEmailVO, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<string>(
    {
      ...Api.RegisterByEmail,
      params,
    },
    {
      errorMessageMode: mode,
      withTenant: false,
    },
  );
}

export function sendSmsCode(mobile: string, templateCode: string) {
  return defHttp.request<string>(
    {
      ...Api.SendSmsCode,
      params: {
        mobile,
        templateCode,
      },
    },
    {
      withTenant: false,
    },
  );
}
export function sendEmailCode(email: string, templateCode: string) {
  return defHttp.request<string>(
    {
      ...Api.SendEmailCode,
      params: {
        email,
        templateCode,
      },
    },
    {
      withTenant: false,
    },
  );
}

const aatoken =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJib2R5Ijoie1widXNlckluZm9cIjpcIjE0MTQ4Mzg3MzM3OTAyNTMwNThcIixcInVzZXJOYW1lXCI6XCI1MjAyMDExOTgyMDUyNTQ0MjJcIn0iLCJleHAiOjE2NTkwMDU1ODZ9.hi8ZrzWVkhUmslT3jErgzxo4hpb0Dkrecll00n1ezrg';
export function getCourseInfo(courseId: string) {
  return defHttp.request<string>(
    {
      url: `/gzjxjy/front/api/course/getCourseInfo`,
      method: RequestEnum.GET,
      params: {
        courseId,
      },
      headers: {
        Authorization: aatoken,
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJib2R5Ijoie1widXNlckluZm9cIjpcIjE1NTIxMzUzNjU3MzAwMzc3NjJcIixcInVzZXJOYW1lXCI6XCI1MjIxMjExOTkyMDQxNjMwMTVcIn0iLCJleHAiOjE2NTg5MzMxNzN9.Fwf_3vqIQlq01ev5Lw9r4HFfjGGHzClnVEYMlJHGqlw'
      },
    },
    {
      withTenant: false,
      apiUrl: '',
      isReturnNativeResponse: true,
    },
  );
}
export function saveWork(courseId: string, worksId: string, totalHour: number, studyTime: number) {
  return defHttp.request<string>(
    {
      url: `/gzjxjy/front/api/study/save`,
      method: RequestEnum.POST,
      params: {
        courseId,
        worksId,
        totalHour,
        studyTime,
      },
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJib2R5Ijoie1widXNlckluZm9cIjpcIjE1NTIxMzUzNjU3MzAwMzc3NjJcIixcInVzZXJOYW1lXCI6XCI1MjIxMjExOTkyMDQxNjMwMTVcIn0iLCJleHAiOjE2NTg5MzMxNzN9.Fwf_3vqIQlq01ev5Lw9r4HFfjGGHzClnVEYMlJHGqlw'
        Authorization: aatoken,
      },
    },
    {
      withTenant: false,
      apiUrl: '',
      isReturnNativeResponse: true,
    },
  );
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(_mode: ErrorMessageMode = 'none', userId?: string) {
  return defHttp.get<DefUserInfoResultVO>({
    ...Api.getUserInfoById,
    timeout: 2 * 60 * 1000,
    params: { userId: userId },
  });
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
