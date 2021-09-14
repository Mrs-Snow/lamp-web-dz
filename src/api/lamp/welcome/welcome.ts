import { defHttp } from '/@/utils/http/axios';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { GetChartResult, GetItemResult } from './model/welcomeModel';

const Api = {
  getChart: {
    url: ServicePrefixEnum.AUTHORITY + `/dashboard/chart`,
  },
  getItem: { url: ServicePrefixEnum.AUTHORITY + `/dashboard/item` },
  pvIncr: { url: ServicePrefixEnum.AUTHORITY + `/dashboard/pvIncr` },
};

export const getChart = () => {
  return defHttp.get<GetChartResult>({ ...Api.getChart });
};

export const getItem = () => {
  return defHttp.get<GetItemResult>({ ...Api.getItem });
};

export const pvIncr = () => {
  return defHttp.post<Boolean>({ ...Api.pvIncr });
};
