import {
  SmsTemplateSaveDTO,
  SmsTemplateUpdateDTO,
  SmsTemplate,
  SmsTemplatePageQuery,
} from './model/smsTemplateModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.MSG + '/smsTemplate/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.MSG + '/smsTemplate',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.MSG + '/smsTemplate',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.MSG + '/smsTemplate',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.MSG + '/smsTemplate/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Get: (id: string) => {
    return {
      url: ServicePrefixEnum.MSG + `/smsTemplate/${id}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
};

export const page = (params: PageParams<SmsTemplatePageQuery>) =>
  defHttp.request<PageResult<SmsTemplate>>({ ...Api.Page, params });

export const query = (params: SmsTemplate) =>
  defHttp.request<SmsTemplate[]>({ ...Api.Query, params });

export const get = (id: string) => defHttp.request<SmsTemplate>({ ...Api.Get(id) });

export const save = (params: SmsTemplateSaveDTO) =>
  defHttp.request<SmsTemplate>({ ...Api.Save, params });

export const update = (params: SmsTemplateUpdateDTO) =>
  defHttp.request<SmsTemplate>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });
