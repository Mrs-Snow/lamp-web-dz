import {
  DictionarySaveDTO,
  DictionaryUpdateDTO,
  Dictionary,
  DictionaryPageQuery,
} from './model/dictionaryItemModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/dictionary/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/dictionary',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/dictionary',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/dictionary',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<DictionaryPageQuery>) =>
  defHttp.request<PageResult<Dictionary>>({ ...Api.Page, params });

export const save = (params: DictionarySaveDTO) =>
  defHttp.request<Dictionary>({ ...Api.Save, params });

export const update = (params: DictionaryUpdateDTO) =>
  defHttp.request<Dictionary>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
