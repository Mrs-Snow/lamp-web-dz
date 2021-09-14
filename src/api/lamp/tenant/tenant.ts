import {
  TenantSaveDTO,
  TenantUpdateDTO,
  Tenant,
  TenantPageQuery,
  TenantConnectDTO,
} from './model/tenantModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.TENANT + '/tenant/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.TENANT + '/tenant',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.TENANT + '/tenant',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.TENANT + '/tenant',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.TENANT + '/tenant/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  InitConnect: {
    url: ServicePrefixEnum.TENANT + '/tenant/initConnect',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Check: function (code: string) {
    return {
      url: ServicePrefixEnum.TENANT + `/tenant/check/${code}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
};

export const page = (params: PageParams<TenantPageQuery>) =>
  defHttp.request<PageResult<Tenant>>({ ...Api.Page, params });

export const query = (params: Tenant) => defHttp.request<Tenant[]>({ ...Api.Query, params });

export const save = (params: TenantSaveDTO) => defHttp.request<Tenant>({ ...Api.Save, params });

export const update = (params: TenantUpdateDTO) =>
  defHttp.request<Tenant>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const check = (code: string) => defHttp.request<boolean>(Api.Check(code));

export const initConnect = (params: TenantConnectDTO) =>
  defHttp.request<boolean>({ ...Api.InitConnect, params });
