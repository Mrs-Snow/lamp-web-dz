import {
  DefGenTestSimpleSaveVO,
  DefGenTestSimpleUpdateVO,
  DefGenTestSimpleResultVO,
  DefGenTestSimplePageQuery,
} from './model/defGenTestSimpleModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'defGenTestSimple';

export const Api = {
  Page: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}`,
    method: RequestEnum.PUT,
  },
  Delete: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}/query`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<DefGenTestSimplePageQuery>) =>
  defHttp.request<PageResult<DefGenTestSimpleResultVO>>({ ...Api.Page, params });

export const query = (params: DefGenTestSimplePageQuery) =>
  defHttp.request<DefGenTestSimpleResultVO[]>({ ...Api.Query, params });

export const save = (params: DefGenTestSimpleSaveVO) =>
  defHttp.request<DefGenTestSimpleResultVO>({ ...Api.Save, params });

export const update = (params: DefGenTestSimpleUpdateVO) =>
  defHttp.request<DefGenTestSimpleResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
