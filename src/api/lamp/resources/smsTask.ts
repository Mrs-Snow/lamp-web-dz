import { SmsTaskSaveDTO, SmsTaskUpdateDTO, SmsTask, SmsTaskPageQuery } from './model/smsTaskModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.MSG + '/smsTask/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.MSG + '/smsTask',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.MSG + '/smsTask',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.MSG + '/smsTask',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.MSG + '/smsTask/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Detail: (id: string) => {
    return {
      url: ServicePrefixEnum.MSG + `/smsTask/detail/${id}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
};

export const page = (params: PageParams<SmsTaskPageQuery>) =>
  defHttp.request<PageResult<SmsTask>>({ ...Api.Page, params });

export const query = (params: SmsTask) => defHttp.request<SmsTask[]>({ ...Api.Query, params });

export const detail = (id: string) => defHttp.request<SmsTask>({ ...Api.Detail(id) });

export const save = (params: SmsTaskSaveDTO) => defHttp.request<SmsTask>({ ...Api.Save, params });

export const update = (params: SmsTaskUpdateDTO) =>
  defHttp.request<SmsTask>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
