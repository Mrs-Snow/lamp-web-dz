import { defHttp } from '/@/utils/http/axios';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { OptionsGetResultModel, CodeQueryVO, SystemApiVO } from './model/optionsModel';
import { RequestEnum } from '/@/enums/httpEnum';
import { isString } from '/@/utils/is';
import { TimeDelayReq, DelayResult } from '/@/utils/lamp/timeDelayReq';

export const Api = {
  SystemApiScan: (serviceProfix: string) => {
    return {
      url: `/${serviceProfix}/anyone/systemApiScan`,
      method: RequestEnum.GET,
    };
  },
  FindEnumListByType: {
    url: `${ServicePrefixEnum.OAUTH}/enums/findEnumListByType`,
    method: RequestEnum.POST,
  },
  FindCodeListByType: {
    url: `${ServicePrefixEnum.OAUTH}/dictionary/findCodeListByType`,
    method: RequestEnum.POST,
  },
  Params: {
    url: `${ServicePrefixEnum.OAUTH}/parameter/value`,
    method: RequestEnum.GET,
  },
};

export const findSystemApi = (serviceProfix: string) => {
  return defHttp.request<Map<String, SystemApiVO[]>>({ ...Api.SystemApiScan(serviceProfix) });
};

/**
 * @description: Get 字典
 */
export const findEnumListByType = (params: CodeQueryVO[] = []) => {
  return defHttp.request<OptionsGetResultModel>({ ...Api.FindEnumListByType, params });
};

export const findCodeListByType = (params: CodeQueryVO[] = []) => {
  return defHttp.request<OptionsGetResultModel>({
    ...Api.FindCodeListByType,
    params,
  });
};
export const findParams = (params: string[] | string = []) => {
  if (isString(params)) {
    params = [params];
  }
  return defHttp.request<string>({ ...Api.Params, params });
};

export interface AsyncGetVO {
  code: number;
  data: string;
}

const codeTimeDelayReq = new TimeDelayReq({
  cacheKey: (param) => `${param?.type || param}`,
  getErrorData(_param, error, _reject) {
    return {
      code: 400,
      msg: error.message || '请求错误',
      data: [],
    };
  },
  // 实现批量请求
  async service(paramList, cacheKey) {
    const data = await findCodeListByType(paramList);
    const resultMap: Map<String, DelayResult> = new Map<String, DelayResult>();
    paramList.forEach((code) => {
      const key = cacheKey(code);
      const dictList = data[code?.type];
      if (dictList) {
        resultMap.set(key, {
          key,
          isOk: true,
          data: {
            code: 0,
            data: dictList,
          },
        });
      }
    });
    return resultMap;
  },
});

export async function asyncFindDictList(param: {}) {
  return codeTimeDelayReq.loadByParam(param);
}

const enumTimeDelayReq = new TimeDelayReq({
  cacheKey: (param) => `${param?.type || param}`,
  getErrorData(_param, error, _reject) {
    return {
      code: 400,
      msg: error.message || '请求错误',
      data: [],
    };
  },
  // 实现批量请求
  async service(paramList, cacheKey) {
    const data = await findEnumListByType(paramList);
    const resultMap: Map<String, DelayResult> = new Map<String, DelayResult>();
    paramList.forEach((code) => {
      const key = cacheKey(code);
      const dictList = data[code?.type];
      if (dictList) {
        resultMap.set(key, {
          key,
          isOk: true,
          data: {
            code: 0,
            data: dictList,
          },
        });
      }
    });
    return resultMap;
  },
});

export async function asyncFindEnumList(code: string): Promise<AsyncGetVO> {
  const data = await enumTimeDelayReq.loadByParam(code);
  return data as AsyncGetVO;
}
