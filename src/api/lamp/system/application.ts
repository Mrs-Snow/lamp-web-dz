import {
  ApplicationSaveDTO,
  ApplicationUpdateDTO,
  Application,
  ApplicationPageQuery,
} from './model/applicationModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/application/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/application',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/application',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/application',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/application/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<ApplicationPageQuery>) =>
  defHttp.request<PageResult<Application>>({ ...Api.Page, params });

export const query = (params: Application) =>
  defHttp.request<Application[]>({ ...Api.Query, params });

export const save = (params: ApplicationSaveDTO) =>
  defHttp.request<Application>({ ...Api.Save, params });

export const update = (params: ApplicationUpdateDTO) =>
  defHttp.request<Application>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
