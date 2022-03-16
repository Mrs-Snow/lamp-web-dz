import {
  DefGenTableSaveVO,
  DefGenTableUpdateVO,
  DefGenTableResultVO,
  DefGenTablePageQuery,
} from './model/defGenTableModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

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
  Save: {
    url: `${ServicePrefixEnum.GENERATOR}/${MODULAR}`,
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

export const save = (params: DefGenTableSaveVO) =>
  defHttp.request<DefGenTableResultVO>({
    ...Api.Save,
    params,
  });

export const update = (params: DefGenTableUpdateVO) =>
  defHttp.request<DefGenTableResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const previewCode = (id: string) =>
  defHttp.request<any>({
    ...Api.PreviewCode,
    params: { id },
  });
