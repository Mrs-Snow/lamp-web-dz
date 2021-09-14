import {
  DatasourceConfigPageQuery,
  DatasourceConfigResult,
  DatasourceConfigSaveDTO,
  DatasourceConfigUpdateDTO,
  DatasourceConfig,
} from './model/datasourceConfigModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

export const Api = {
  Page: { url: ServicePrefixEnum.TENANT + '/datasourceConfig/page', method: RequestEnum.POST },
  Save: { url: ServicePrefixEnum.TENANT + '/datasourceConfig', method: RequestEnum.POST },
  Update: { url: ServicePrefixEnum.TENANT + '/datasourceConfig', method: RequestEnum.PUT },
  Delete: { url: ServicePrefixEnum.TENANT + '/datasourceConfig', method: RequestEnum.DELETE },
  TestConnect: {
    url: ServicePrefixEnum.TENANT + '/datasourceConfig/testConnect',
    method: RequestEnum.POST,
  },
  Query: {
    url: ServicePrefixEnum.TENANT + '/datasourceConfig/query',
    method: RequestEnum.POST,
  },
};

export const page = (params: PageParams<DatasourceConfigPageQuery>) =>
  defHttp.request<PageResult<DatasourceConfigResult>>({ ...Api.Page, params });

export const save = (params: DatasourceConfigSaveDTO) =>
  defHttp.request<DatasourceConfig>({ ...Api.Save, params });

export const update = (params: DatasourceConfigUpdateDTO) =>
  defHttp.request<DatasourceConfig>({ ...Api.Update, params });

export const remove = (ids: string[]) =>
  defHttp.request<boolean>({
    ...Api.Delete,
    params: ids,
  });

export const testConnect = (params: any) =>
  defHttp.request<boolean>({ ...Api.TestConnect, params });

export const query = (params?: DatasourceConfig) =>
  defHttp.request<DatasourceConfig[]>({ ...Api.Query, params });
