import { OptLogSaveDTO, OptLogUpdateDTO, OptLog, OptLogPageQuery } from './model/optLogModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Get: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog/get',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  Clear: {
    url: ServicePrefixEnum.AUTHORITY + '/optLog/clear',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<OptLogPageQuery>) =>
  defHttp.request<PageResult<OptLog>>({ ...Api.Page, params });

export const query = (params: OptLog) => defHttp.request<OptLog[]>({ ...Api.Query, params });

export const get = (id: string) => defHttp.request<OptLog>({ ...Api.Get, params: { id } });

export const save = (params: OptLogSaveDTO) => defHttp.request<OptLog>({ ...Api.Save, params });

export const update = (params: OptLogUpdateDTO) =>
  defHttp.request<OptLog>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const clear = (type: number) =>
  defHttp.request<boolean>({
    ...Api.Clear,
    params: { type },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
