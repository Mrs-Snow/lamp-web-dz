import {
  RateLimiterSaveDTO,
  RateLimiterUpdateDTO,
  RateLimiter,
  RateLimiterPageQuery,
} from './model/rateLimiterModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.GATEWAY + '/rateLimiter/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.GATEWAY + '/rateLimiter',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.GATEWAY + '/rateLimiter',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.GATEWAY + '/rateLimiter',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.GATEWAY + '/rateLimiter/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<RateLimiterPageQuery>) =>
  defHttp.request<PageResult<RateLimiter>>({ ...Api.Page, params });

export const query = (params: RateLimiter) =>
  defHttp.request<RateLimiter[]>({ ...Api.Query, params });

export const save = (params: RateLimiterSaveDTO) =>
  defHttp.request<RateLimiter>({ ...Api.Save, params });

export const update = (params: RateLimiterUpdateDTO) =>
  defHttp.request<RateLimiter>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
