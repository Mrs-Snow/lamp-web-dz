import { BaseFileResultVO, BaseFilePageQuery } from './model/baseFileModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'file';

export const Api = {
  Page: {
    url: `${ServicePrefixEnum.FILE}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Delete: {
    url: `${ServicePrefixEnum.FILE}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,

  Download: {
    url: `${ServicePrefixEnum.FILE}/${MODULAR}/download`,
    method: RequestEnum.POST,
    responseType: 'blob',
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<BaseFilePageQuery>) =>
  defHttp.request<PageResult<BaseFileResultVO>>({ ...Api.Page, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const download = (params: string[]) =>
  defHttp.request<void>({ ...Api.Download, params }, { isReturnNativeResponse: true });
