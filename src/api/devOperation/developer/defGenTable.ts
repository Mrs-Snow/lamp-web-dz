import {
  DefGenTableImportVO,
  DefGenTablePageQuery,
  DefGenTableResultVO,
  DefGenTableUpdateVO,
} from './model/defGenTableModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const MODULAR = 'defGenTable';

export const Api = {
  Page: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  SelectTableList: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/selectTableList`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}`,
    method: RequestEnum.PUT,
  },
  Delete: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/query`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  PreviewCode: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/previewCode`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  ImportTable: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/importTable`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  ImportCheck: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/importCheck`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  GeneratorCode: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/generatorCode`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  DownloadZip: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/downloadZip`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  syncField: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/syncField`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  Detail: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}/detail`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<DefGenTablePageQuery>) =>
  defHttp.request<PageResult<DefGenTableResultVO>>({ ...Api.Page, params });

export const selectTableList = (params: PageParams<DefGenTablePageQuery>) =>
  defHttp.request<PageResult<DefGenTableResultVO>>({ ...Api.SelectTableList, params });

export const query = (params: DefGenTablePageQuery) =>
  defHttp.request<DefGenTableResultVO[]>({
    ...Api.Query,
    params,
  });

export const update = (params: DefGenTableUpdateVO) =>
  defHttp.request<DefGenTableResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const previewCode = (id: string, template: string) =>
  defHttp.request<any>({
    ...Api.PreviewCode,
    params: { id, template },
  });

export const importCheck = (tableNames: string[]) =>
  defHttp.request<boolean>(
    {
      ...Api.ImportCheck,
      params: tableNames,
    },
    { errorMessageMode: 'none' },
  );

export const importTable = (params: DefGenTableImportVO) =>
  defHttp.request<boolean>({
    ...Api.ImportTable,
    params,
  });

export const downloadZip = (ids: string[], template: string) =>
  defHttp.request<void>(
    {
      ...Api.DownloadZip,
      responseType: 'blob',
      params: qs.stringify({ ids, template }, { arrayFormat: 'repeat' }),
    },
    { isReturnNativeResponse: true },
  );

export const generatorCode = (ids: string[], template: string) =>
  defHttp.request<boolean>({
    ...Api.GeneratorCode,
    params: qs.stringify({ ids, template }, { arrayFormat: 'repeat' }),
  });

export const syncField = (id: string) =>
  defHttp.request<boolean>({
    ...Api.syncField,
    params: { id },
  });

export const detail = (id: string) =>
  defHttp.request<DefGenTableResultVO>({
    ...Api.Detail,
    params: { id },
  });
