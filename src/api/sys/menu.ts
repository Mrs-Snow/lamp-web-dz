import { defHttp } from '/@/utils/http/axios';
import { getMenuListByIdParams, getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/oauth/menu/router',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params?: getMenuListByIdParams) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList, params });
};
