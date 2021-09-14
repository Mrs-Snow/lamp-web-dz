import {
  ParameterSaveDTO,
  ParameterUpdateDTO,
  Parameter,
  ParameterPageQuery,
} from './model/parameterModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/parameter/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/parameter',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/parameter',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/parameter',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/parameter/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<ParameterPageQuery>) =>
  defHttp.request<PageResult<Parameter>>({ ...Api.Page, params });

export const query = (params: Parameter) => defHttp.request<Parameter[]>({ ...Api.Query, params });

export const save = (params: ParameterSaveDTO) =>
  defHttp.request<Parameter>({ ...Api.Save, params });

export const update = (params: ParameterUpdateDTO) =>
  defHttp.request<Parameter>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
