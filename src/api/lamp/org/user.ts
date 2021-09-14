import {
  UserSaveDTO,
  UserUpdateDTO,
  User,
  UserPageQuery,
  UserUpdateBaseInfoDTO,
  UserUpdateAvatarDTO,
  UserUpdatePasswordDTO,
} from './model/userModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/user/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/user',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/user',
    method: RequestEnum.PUT,
  },
  UpdateBase: {
    url: ServicePrefixEnum.AUTHORITY + '/user/base',
    method: RequestEnum.PUT,
  },
  UpdateAvatar: {
    url: ServicePrefixEnum.AUTHORITY + '/user/avatar',
    method: RequestEnum.PUT,
  },
  UpdatePassword: {
    url: ServicePrefixEnum.AUTHORITY + '/user/password',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/user',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Get: (id: string | number) => {
    return {
      url: ServicePrefixEnum.AUTHORITY + `/user/${id}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig;
  },
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/user/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Preview: {
    url: ServicePrefixEnum.AUTHORITY + '/user/preview',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Export: {
    url: ServicePrefixEnum.AUTHORITY + '/user/export',
    method: RequestEnum.POST,
    responseType: 'blob',
  } as AxiosRequestConfig,
  Import: {
    url: ServicePrefixEnum.AUTHORITY + '/user/import',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Check: {
    url: ServicePrefixEnum.AUTHORITY + '/user/check',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<UserPageQuery>) =>
  defHttp.request<PageResult<User>>({ ...Api.Page, params });

export const query = (params?: User) => defHttp.request<User[]>({ ...Api.Query, params });

export const get = (id: number | string) => defHttp.request<User>({ ...Api.Get(id) });

export const save = (params: UserSaveDTO) => defHttp.request<User>({ ...Api.Save, params });

export const update = (params: UserUpdateDTO) => defHttp.request<User>({ ...Api.Update, params });

export const updateBase = (params: UserUpdateBaseInfoDTO) =>
  defHttp.request<User>({ ...Api.UpdateBase, params });

export const updatePassword = (params: UserUpdatePasswordDTO) =>
  defHttp.request<boolean>({ ...Api.UpdatePassword, params });

export const updateAvatar = (params: UserUpdateAvatarDTO) =>
  defHttp.request<boolean>({ ...Api.UpdateAvatar, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const exportPreview = (params: PageParams<UserPageQuery>) =>
  defHttp.request<string>({ ...Api.Preview, params });

export const exportFile = (params: PageParams<UserPageQuery>) =>
  defHttp.request<any>({ ...Api.Export, params }, { isReturnNativeResponse: true });

export const importFile = (params: UploadFileParams) =>
  defHttp.uploadFile<boolean>({ ...Api.Import }, params);

export const check = (name: string, id?: string) =>
  defHttp.request<boolean>({ ...Api.Check, params: { name: name, id: id } });
