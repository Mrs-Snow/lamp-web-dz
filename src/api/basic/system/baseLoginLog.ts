import {
  BaseLoginLogSaveVO,
  BaseLoginLogUpdateVO,
  BaseLoginLogResultVO,
  BaseLoginLogPageQuery,
} from './model/baseLoginLogModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'baseLoginLog';

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
  Clear: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}/clear`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<BaseLoginLogPageQuery>) =>
  defHttp.request<PageResult<BaseLoginLogResultVO>>({ ...Api.Page, params });

export const query = (params: BaseLoginLogPageQuery) =>
  defHttp.request<BaseLoginLogResultVO[]>({ ...Api.Query, params });

export const save = (params: BaseLoginLogSaveVO) =>
  defHttp.request<BaseLoginLogResultVO>({ ...Api.Save, params });

export const update = (params: BaseLoginLogUpdateVO) =>
  defHttp.request<BaseLoginLogResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
export const clear = (type: string | number) =>
  defHttp.request<boolean>({
    ...Api.Clear,
    params: { type },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
