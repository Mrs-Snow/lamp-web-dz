import {
  MsgSaveDTO,
  MsgUpdateDTO,
  Msg,
  MsgPageQuery,
  MyMsgResult,
  MsgPageResult,
} from './model/msgModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.MSG + '/msg/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.MSG + '/msg',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.MSG + '/msg',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.MSG + '/msg',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,

  Query: {
    url: ServicePrefixEnum.MSG + '/msg/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Get: (id) => {
    return {
      url: ServicePrefixEnum.MSG + `/msg/${id}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
  Mark: {
    url: ServicePrefixEnum.MSG + '/anyone/myMsg/mark',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  MyMsg: {
    url: ServicePrefixEnum.MSG + '/anyone/myMsg',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  PageMyMsg: {
    url: ServicePrefixEnum.MSG + '/anyone/myMsg/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<MsgPageQuery>) =>
  defHttp.request<PageResult<Msg>>({ ...Api.Page, params });

export const query = (params: Msg) => defHttp.request<Msg[]>({ ...Api.Query, params });

export const get = (id: string) => defHttp.request<Msg>({ ...Api.Get(id) });

export const save = (params: MsgSaveDTO) => defHttp.request<Msg>({ ...Api.Save, params });

export const update = (params: MsgUpdateDTO) => defHttp.request<Msg>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const mark = (params: string[]) => defHttp.request<boolean>({ ...Api.Mark, params });

export const myMsg = (params: PageParams<MsgPageQuery>) =>
  defHttp.request<MyMsgResult>({ ...Api.MyMsg, params }, { errorMessageMode: 'none' });

export const pageMyMsg = (params: PageParams<MsgPageQuery>) =>
  defHttp.request<PageResult<MsgPageResult>>({ ...Api.PageMyMsg, params });
