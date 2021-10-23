import {
  BaseOrgSaveVO,
  BaseOrgUpdateVO,
  BaseOrgResultVO,
  BaseOrgPageQuery,
} from './model/baseOrgModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'baseOrg';

export const Api = {
  Page: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Tree: {
    url: `${ServicePrefixEnum.BASE}/${MODULAR}/tree`,
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

export const tree = (params?: BaseOrgPageQuery) =>
  defHttp.request<BaseOrgResultVO>({ ...Api.Tree, params });

export const page = (params: PageParams<BaseOrgPageQuery>) =>
  defHttp.request<PageResult<BaseOrgResultVO>>({ ...Api.Page, params });

export const query = (params: BaseOrgPageQuery) =>
  defHttp.request<BaseOrgResultVO[]>({ ...Api.Query, params });

export const save = (params: BaseOrgSaveVO) =>
  defHttp.request<BaseOrgResultVO>({ ...Api.Save, params });

export const update = (params: BaseOrgUpdateVO) =>
  defHttp.request<BaseOrgResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
