import { StationSaveDTO, StationUpdateDTO, Station, StationPageQuery } from './model/stationModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/station/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/station',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/station',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/station',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/station/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Preview: {
    url: ServicePrefixEnum.AUTHORITY + '/station/preview',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Export: {
    url: ServicePrefixEnum.AUTHORITY + '/station/export',
    method: RequestEnum.POST,
    responseType: 'blob',
  } as AxiosRequestConfig,
  Import: {
    url: ServicePrefixEnum.AUTHORITY + '/station/import',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<StationPageQuery>) =>
  defHttp.request<PageResult<Station>>({ ...Api.Page, params });

export const query = (params: Station) => defHttp.request<Station[]>({ ...Api.Query, params });

export const save = (params: StationSaveDTO) => defHttp.request<Station>({ ...Api.Save, params });

export const update = (params: StationUpdateDTO) =>
  defHttp.request<Station>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const exportPreview = (params: PageParams<StationPageQuery>) =>
  defHttp.request<string>({ ...Api.Preview, params });

export const exportFile = (params: PageParams<StationPageQuery>) =>
  defHttp.request<any>({ ...Api.Export, params }, { isReturnNativeResponse: true });

export const importFile = (params: UploadFileParams) =>
  defHttp.uploadFile<boolean>({ ...Api.Import }, params);
