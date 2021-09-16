import {
  DefApplicationSaveVO,
  DefApplicationUpdateVO,
  DefApplicationResultVO,
  DefApplicationPageQuery,
} from './model/defApplicationModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'defApplication';

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
};

export const page = (params: PageParams<DefApplicationPageQuery>) =>
  defHttp.request<PageResult<DefApplicationResultVO>>({ ...Api.Page, params });

export const query = (params: DefApplicationPageQuery) =>
  defHttp.request<DefApplicationResultVO[]>({ ...Api.Query, params });

export const save = (params: DefApplicationSaveVO) =>
  defHttp.request<DefApplicationResultVO>({ ...Api.Save, params });

export const update = (params: DefApplicationUpdateVO) =>
  defHttp.request<DefApplicationResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
