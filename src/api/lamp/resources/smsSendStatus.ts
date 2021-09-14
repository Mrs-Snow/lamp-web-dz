import { SmsSendStatus } from './model/smsSendStatusModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.MSG + '/smsSendStatus/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<SmsSendStatus>) =>
  defHttp.request<PageResult<SmsSendStatus>>({ ...Api.Page, params });
