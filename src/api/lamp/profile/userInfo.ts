import { defHttp } from '/@/utils/http/axios';
import {
  DefUserAvatarUpdateVO,
  DefUserBaseInfoUpdateVO,
  DefUserPasswordUpdateVO,
} from './model/userInfoModel';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';

import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { AxiosRequestConfig } from 'axios';
import { DefApplicationResultVO } from '../../devOperation/application/model/defApplicationModel';

export const Api = {
  FindMyApplication: {
    url: `${ServicePrefixEnum.TENANT}/anyone/findMyApplication`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  FindRecommendApplication: {
    url: `${ServicePrefixEnum.TENANT}/anyone/findRecommendApplication`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  UpdateAvatar: {
    url: `${ServicePrefixEnum.TENANT}/anyone/avatar`,
    method: RequestEnum.PUT,
  } as AxiosRequestConfig,
  UpdatePassword: {
    url: `${ServicePrefixEnum.TENANT}/anyone/password`,
    method: RequestEnum.PUT,
  } as AxiosRequestConfig,
  UpdateBaseInfo: {
    url: `${ServicePrefixEnum.TENANT}/anyone/baseInfo`,
    method: RequestEnum.PUT,
  } as AxiosRequestConfig,
  UpdateDefApp: {
    url: `${ServicePrefixEnum.TENANT}/anyone/updateDefApp`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  GetDefApp: {
    url: `${ServicePrefixEnum.TENANT}/anyone/getDefApp`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
};

export const updateDefApp = (applicationId: string) =>
  defHttp.request<boolean>({
    ...Api.UpdateDefApp,
    params: { applicationId },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });

export const getDefApp = () => defHttp.request<string>({ ...Api.GetDefApp });

export const findMyApplication = (name?: string) =>
  defHttp.request<DefApplicationResultVO[]>({
    ...Api.FindMyApplication,
    params: { name },
    timeout: 60 * 1000,
  });

export const findRecommendApplication = (name?: string) =>
  defHttp.request<DefApplicationResultVO[]>({ ...Api.FindRecommendApplication, params: { name } });

export const updateAvatar = (params: DefUserAvatarUpdateVO) =>
  defHttp.request<boolean>({ ...Api.UpdateAvatar, params });

export const updatePassword = (params: DefUserPasswordUpdateVO) =>
  defHttp.request<boolean>({ ...Api.UpdatePassword, params });

export const updateBaseInfo = (params: DefUserBaseInfoUpdateVO) =>
  defHttp.request<boolean>({ ...Api.UpdateBaseInfo, params });
