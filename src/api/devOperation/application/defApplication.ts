import {
  DefApplicationSaveVO,
  DefApplicationUpdateVO,
  DefApplicationResultVO,
  DefApplicationPageQuery,
  ApplicationResourceResultVO,
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
  FindApplicationResourceList: {
    url: `${ServicePrefixEnum.TENANT}/${MODULAR}/findApplicationResourceList`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  FindMyApplication: {
    url: `${ServicePrefixEnum.TENANT}/anyone/findMyApplication`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  // FindRecommendApplication: {
  //   url: `${ServicePrefixEnum.TENANT}/anyone/findRecommendApplication`,
  //   method: RequestEnum.GET,
  // } as AxiosRequestConfig,
};

// export const findMyApplication = (name?: string) =>
//   defHttp.request<DefApplicationResultVO[]>({ ...Api.FindMyApplication, params: { name } });

export const pageFindMyApplication = (params: PageParams<DefApplicationPageQuery>) =>
  defHttp.request<DefApplicationResultVO[]>({
    ...Api.FindMyApplication,
    params: { name: params?.model?.name },
  });

// export const findRecommendApplication = (name?: string) =>
//   defHttp.request<DefApplicationResultVO[]>({ ...Api.FindRecommendApplication, params: { name } });

export const page = (params: PageParams<DefApplicationPageQuery>) =>
  defHttp.request<PageResult<DefApplicationResultVO>>({ ...Api.Page, params });

export const query = (params?: DefApplicationPageQuery) =>
  defHttp.request<DefApplicationResultVO[]>({ ...Api.Query, params });

export const findApplicationResourceList = () =>
  defHttp.request<ApplicationResourceResultVO[]>({ ...Api.FindApplicationResourceList });

export const save = (params: DefApplicationSaveVO) =>
  defHttp.request<DefApplicationResultVO>({ ...Api.Save, params });

export const update = (params: DefApplicationUpdateVO) =>
  defHttp.request<DefApplicationResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
