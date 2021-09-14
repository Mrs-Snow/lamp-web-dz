import { OrgSaveDTO, OrgUpdateDTO, Org } from './model/orgModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

export const Api = {
  Tree: { url: ServicePrefixEnum.AUTHORITY + '/org/tree', method: RequestEnum.GET },
  Save: { url: ServicePrefixEnum.AUTHORITY + '/org', method: RequestEnum.POST },
  Update: { url: ServicePrefixEnum.AUTHORITY + '/org', method: RequestEnum.PUT },
  Delete: { url: ServicePrefixEnum.AUTHORITY + '/org', method: RequestEnum.DELETE },
};

export const tree = (params: object) => defHttp.request<Org>({ ...Api.Tree, params });

export const save = (params: OrgSaveDTO) => defHttp.request<Org>({ ...Api.Save, params });

export const update = (params: OrgUpdateDTO) => defHttp.request<Org>({ ...Api.Update, params });

export const remove = (params: string[]) =>
  defHttp.request<boolean>({
    ...Api.Delete,
    params,
  });
