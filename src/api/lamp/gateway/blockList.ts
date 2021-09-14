import {
  BlockListSaveDTO,
  BlockListUpdateDTO,
  BlockList,
  BlockListPageQuery,
} from './model/blockListModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.GATEWAY + '/blockList/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.GATEWAY + '/blockList',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.GATEWAY + '/blockList',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.GATEWAY + '/blockList',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.GATEWAY + '/blockList/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<BlockListPageQuery>) =>
  defHttp.request<PageResult<BlockList>>({ ...Api.Page, params });

export const query = (params: BlockList) => defHttp.request<BlockList[]>({ ...Api.Query, params });

export const save = (params: BlockListSaveDTO) =>
  defHttp.request<BlockList>({ ...Api.Save, params });

export const update = (params: BlockListUpdateDTO) =>
  defHttp.request<BlockList>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
