import { TestUserSaveVO, TestUserUpdateVO, TestUserResultVO, TestUserPageQuery } from './model/testUserModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

const MODULAR = 'testUser';
// tips: 建议在ServicePrefixEnum中新增：DD = '/dd'，并将下方代码改为： const ServicePrefix = ServicePrefixEnum.DD;
// tips: /dd 需要与 lamp-gateway-server.yml中配置的Path一致，否则无法正常调用接口！！！
// const ServicePrefix = ServicePrefixEnum.DD;
const ServicePrefix = '/dd';

export const Api = {
  Page: {
    url: `${ServicePrefix}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Detail: {
    url: `${ServicePrefix}/${MODULAR}/detail`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  Copy: {
    url: `${ServicePrefix}/${MODULAR}/copy`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.PUT,
  },
  Delete: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: `${ServicePrefix}/${MODULAR}/query`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const copy = (id: string) => defHttp.request<TestUserResultVO>({ ...Api.Copy, params: { id } });

export const page = (params: PageParams<TestUserPageQuery>) =>
  defHttp.request<PageResult<TestUserResultVO>>({ ...Api.Page, params });

export const detail = (id: string) =>
  defHttp.request<TestUserResultVO>({ ...Api.Detail, params: { id } });

export const query = (params: TestUserPageQuery) => defHttp.request<TestUserResultVO[]>({ ...Api.Query, params });

export const save = (params: TestUserSaveVO) => defHttp.request<TestUserResultVO>({ ...Api.Save, params });

export const update = (params: TestUserUpdateVO) =>
  defHttp.request<TestUserResultVO>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

