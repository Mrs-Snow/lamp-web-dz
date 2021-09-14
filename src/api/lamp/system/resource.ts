import {
  Resource,
  ResourceUpdateDTO,
  ResourceSaveDTO,
  ResourcePageQuery,
} from './model/resourceModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/resource/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/resource',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/resource',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/resource',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/resource/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Check: {
    url: ServicePrefixEnum.AUTHORITY + '/resource/check',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<ResourcePageQuery>) =>
  defHttp.request<PageResult<Resource>>({ ...Api.Page, params });

export const query = (params: Resource) => defHttp.request<Resource[]>({ ...Api.Query, params });

export const save = (params: ResourceSaveDTO) => defHttp.request<Resource>({ ...Api.Save, params });

export const update = (params: ResourceUpdateDTO) =>
  defHttp.request<Resource>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const check = (code: string, id?: string) =>
  defHttp.request<boolean>({ ...Api.Check, params: { id, code } });
