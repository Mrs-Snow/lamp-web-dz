import {
  BasePositionSaveVO,
  BasePositionUpdateVO,
  BasePositionResultVO,
  BasePositionPageQuery,
} from './model/basePositionModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'basePosition';

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

export const page = (params: PageParams<BasePositionPageQuery>) =>
  defHttp.request<PageResult<BasePositionResultVO>>({ ...Api.Page, params });

export const query = (params: BasePositionPageQuery) =>
  defHttp.request<BasePositionResultVO[]>({ ...Api.Query, params });

export const save = (params: BasePositionSaveVO) =>
  defHttp.request<BasePositionResultVO>({ ...Api.Save, params });

export const update = (params: BasePositionUpdateVO) =>
  defHttp.request<BasePositionResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
