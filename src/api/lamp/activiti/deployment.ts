import type { AxiosRequestConfig } from 'axios';
import { DefinitionUploadVO, ProcessDefinitionDO } from './model/deploymentModel';
import { Model } from './model/modelModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

export const Api = {
  Page: {
    url: ServicePrefixEnum.ACTIVITI + '/definition/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Delete: {
    url: ServicePrefixEnum.ACTIVITI + '/definition/delete',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Upload: {
    url: ServicePrefixEnum.ACTIVITI + '/definition/upload',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  UpdateSuspendState: {
    url: ServicePrefixEnum.ACTIVITI + '/definition/updateSuspendState',
    method: RequestEnum.PUT,
  } as AxiosRequestConfig,
  SaveModelByPro: {
    url: ServicePrefixEnum.ACTIVITI + '/definition/saveModelByPro',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<ProcessDefinitionDO>) =>
  defHttp.request<PageResult<ProcessDefinitionDO>>({ ...Api.Page, params });

export const upload = (params: DefinitionUploadVO) =>
  defHttp.request<string>({ ...Api.Upload, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const saveModelByPro = (processDefinitionId: string) =>
  defHttp.request<Model>({
    ...Api.SaveModelByPro,
    params: { processDefinitionId },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });

export const updateSuspendState = (id: string, suspendState: string) =>
  defHttp.request<boolean>({
    ...Api.UpdateSuspendState,
    params: { id, suspendState },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
