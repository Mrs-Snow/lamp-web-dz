import {
  RoleSaveDTO,
  RoleUpdateDTO,
  Role,
  RolePageQuery,
  RoleAuthoritySaveDTO,
  UserRoleSaveDTO,
} from './model/roleModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import type { AxiosRequestConfig } from 'axios';

export const Api = {
  Page: {
    url: ServicePrefixEnum.AUTHORITY + '/role/page',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: ServicePrefixEnum.AUTHORITY + '/role',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Update: {
    url: ServicePrefixEnum.AUTHORITY + '/role',
    method: RequestEnum.PUT,
  },
  Delete: {
    url: ServicePrefixEnum.AUTHORITY + '/role',
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: ServicePrefixEnum.AUTHORITY + '/role/query',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Check: {
    url: ServicePrefixEnum.AUTHORITY + '/role/check',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  Details: {
    url: ServicePrefixEnum.AUTHORITY + '/role/details',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  ResourceList: {
    url: ServicePrefixEnum.AUTHORITY + '/role/resourceList',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  SaveResource: {
    url: ServicePrefixEnum.AUTHORITY + '/role/saveResource',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  UserList: {
    url: ServicePrefixEnum.AUTHORITY + '/role/userList',
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  SaveUserRole: {
    url: ServicePrefixEnum.AUTHORITY + '/role/saveUserRole',
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
};

export const page = (params: PageParams<RolePageQuery>) =>
  defHttp.request<PageResult<Role>>({ ...Api.Page, params });

export const query = (params?: Role) => defHttp.request<Role[]>({ ...Api.Query, params });

export const save = (params: RoleSaveDTO) => defHttp.request<Role>({ ...Api.Save, params });

export const update = (params: RoleUpdateDTO) => defHttp.request<Role>({ ...Api.Update, params });

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params });

export const check = (code: string) => defHttp.request<boolean>({ ...Api.Check, params: { code } });

export const details = (id: string) =>
  defHttp.request<RolePageQuery>({ ...Api.Details, params: { id } });

export const resourceList = (roleId: string) =>
  defHttp.request<RoleAuthoritySaveDTO>({ ...Api.ResourceList, params: { roleId } });

export const saveResource = (params: RoleAuthoritySaveDTO) =>
  defHttp.request<boolean>({ ...Api.SaveResource, params });

export const userList = (roleId: string) =>
  defHttp.request<string[]>({ ...Api.UserList, params: { roleId } });

export const saveUserRole = (params: UserRoleSaveDTO) =>
  defHttp.request<boolean>({ ...Api.SaveUserRole, params });
