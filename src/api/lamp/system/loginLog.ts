import {
  LoginLogSaveDTO,
  LoginLogUpdateDTO,
  LoginLog,
  LoginLogPageQuery,
} from './model/loginLogModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Clear: {
    url: ServicePrefixEnum.AUTHORITY + '/loginLog/clear',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<LoginLogPageQuery>) =>
  defHttp.request<PageResult<LoginLog>>({ ...Api.Page, params });

export const query = (params: LoginLog) => defHttp.request<LoginLog[]>({ ...Api.Query, params });

export const save = (params: LoginLogSaveDTO) => defHttp.request<LoginLog>({ ...Api.Save, params });

export const update = (params: LoginLogUpdateDTO) =>
  defHttp.request<LoginLog>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const clear = (type: number | string) =>
  defHttp.request<boolean>({
    ...Api.Clear,
    params: { type },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
