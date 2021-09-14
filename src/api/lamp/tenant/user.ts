import {
  GlobalUserPageDTO,
  GlobalUserSaveDTO,
  GlobalUserUpdateDTO,
  User,
  UserUpdatePasswordDTO,
} from './model/userModel';
import { PageParams, PageResult } from '/@/api/model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

const MODULAR = 'user';

export const Api = {
  Page: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}/page`, method: RequestEnum.POST },
  Save: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}`, method: RequestEnum.POST },
  Update: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}/delete`, method: RequestEnum.DELETE },
  Reset: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}/reset`, method: RequestEnum.PUT },
  Check: { url: `${ServicePrefixEnum.TENANT}/${MODULAR}/check`, method: RequestEnum.GET },
};

export const page = (params: PageParams<GlobalUserPageDTO>) =>
  defHttp.request<PageResult<User>>({ ...Api.Page, params });

export const save = (params: GlobalUserSaveDTO) => defHttp.request<User>({ ...Api.Save, params });

export const update = (params: GlobalUserUpdateDTO) =>
  defHttp.request<User>({ ...Api.Update, params });

export const reset = (params: UserUpdatePasswordDTO) =>
  defHttp.request<boolean>({ ...Api.Reset, params });

export const check = (tenantCode: string, account: string) =>
  defHttp.request<boolean>({
    ...Api.Check,
    params: { tenantCode, account },
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  });

export const remove = (code: string, ids: string[]) =>
  defHttp.request<boolean>({
    ...Api.Delete,
    params: { tenantCode: code, ids: ids },
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  });
