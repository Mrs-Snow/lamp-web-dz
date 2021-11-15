import {
  TenantSaveDTO,
  TenantUpdateDTO,
  Tenant,
  TenantPageQuery,
  DefTenantInitVO,
  ReviewComment,
} from './model/tenantModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'defTenant';

export const Api = {
  Page: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}`,
    method: RequestEnum.PUT,
  },
  Delete: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/query`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  UpdateState: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/updateState`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  UpdateStatus: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/updateStatus`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,

  Check: function (code: string) {
    return {
      url: `${ServicePrefixEnum.TENANT}/${MODULAR}/check/${code}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
  InitData: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/initData`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  InitConnect: function (serviceProfix: string) {
    return {
      url: `/${serviceProfix}/ds/initDataSource`,
      method: RequestEnum.POST,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    } as AxiosRequestConfig;
  },
  CheckDs: function (serviceProfix: string) {
    return {
      url: `/${serviceProfix}/ds/check`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
  FindOnlineServicePrefix: {
    url: `${ServicePrefixEnum.GATEWAY}/findOnlineServicePrefix`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<TenantPageQuery>) =>
  defHttp.request<PageResult<Tenant>>({ ...Api.Page, params });

export const query = (params: TenantPageQuery) =>
  defHttp.request<Tenant[]>({ ...Api.Query, params });

export const save = (params: TenantSaveDTO) => defHttp.request<Tenant>({ ...Api.Save, params });

export const update = (params: TenantUpdateDTO) =>
  defHttp.request<Tenant>({ ...Api.Update, params });

export const updateState = (id: string, state: boolean) =>
  defHttp.request<boolean>({ ...Api.UpdateState, params: { id, state } });

export const updateStatus = (params: ReviewComment) =>
  defHttp.request<boolean>({ ...Api.UpdateStatus, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const check = (code: string) => defHttp.request<boolean>(Api.Check(code));

export const initData = (params: DefTenantInitVO) =>
  defHttp.request<boolean>({ ...Api.InitData, params });

export const findOnlineServicePrefix = () =>
  defHttp.request<Recordable>({ ...Api.FindOnlineServicePrefix });

export const initConnect = (serviceProfix: string, tenantId: string) =>
  defHttp.request<boolean>({ ...Api.InitConnect(serviceProfix), params: { tenantId } });

export const checkDs = (serviceProfix: string, tenantId: string) =>
  defHttp.request<boolean>({ ...Api.CheckDs(serviceProfix), params: { tenantId } });
