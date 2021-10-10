import {
  DefUserSaveVO,
  DefUserUpdateVO,
  DefUserResultVO,
  DefUserPageQuery,
} from './model/defUserModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'defUser';

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

export const page = (params: PageParams<DefUserPageQuery>) =>
  defHttp.request<PageResult<DefUserResultVO>>({ ...Api.Page, params });

export const query = (params: DefUserPageQuery) =>
  defHttp.request<DefUserResultVO[]>({ ...Api.Query, params });

export const save = (params: DefUserSaveVO) =>
  defHttp.request<DefUserResultVO>({ ...Api.Save, params });

export const update = (params: DefUserUpdateVO) =>
  defHttp.request<DefUserResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
