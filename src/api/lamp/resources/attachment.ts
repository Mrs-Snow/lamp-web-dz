import { Attachment, AttachmentPageQuery } from './model/attachmentModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.FILE + '/file/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Delete: {
    url: ServicePrefixEnum.FILE + '/file',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Download: {
    url: ServicePrefixEnum.FILE + '/file/download',
    method: RequestEnum.POST,
    responseType: 'blob',
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<AttachmentPageQuery>) =>
  defHttp.request<PageResult<Attachment>>({ ...Api.Page, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const download = (params: string[]) =>
  defHttp.request<void>({ ...Api.Download, params }, { isReturnNativeResponse: true });
