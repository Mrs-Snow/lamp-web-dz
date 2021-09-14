import { AreaSaveDTO, AreaUpdateDTO, Area, AreaPageQuery } from './model/areaModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/area/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Linkage: {
    url: ServicePrefixEnum.AUTHORITY + '/area/linkage',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/area',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/area',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/area',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/area/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const linkage = (parentId = '0') =>
  defHttp.request<Area>({ ...Api.Linkage, params: { parentId } });

export const page = (params: PageParams<AreaPageQuery>) =>
  defHttp.request<PageResult<Area>>({ ...Api.Page, params });

export const query = (params: PageParams<Area>) =>
  defHttp.request<PageResult<Area>>({ ...Api.Query, params });

export const save = (params: AreaSaveDTO) => defHttp.request<Area>({ ...Api.Save, params });

export const update = (params: AreaUpdateDTO) => defHttp.request<Area>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
