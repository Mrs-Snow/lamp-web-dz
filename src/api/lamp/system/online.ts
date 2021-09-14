import { Online } from './model/onlineModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/online/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/online/t',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<String>) =>
  defHttp.request<PageResult<Online>>({ ...Api.Page, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
