import { defHttp } from '/@/utils/http/axios';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { OptionsGetResultModel } from './model/optionsModel';
import { RequestEnum } from '/@/enums/httpEnum';
import { isString } from '/@/utils/is';
import { TimeDelayReq, DelayResult } from '/@/utils/lamp/timeDelayReq';

export const Api = {
  EnumList: {
    url: `${ServicePrefixEnum.OAUTH}/enumList`,
    method: RequestEnum.POST,
  },
  DictList: {
    url: `${ServicePrefixEnum.OAUTH}/dictionary/codeList`,
    method: RequestEnum.POST,
  },
  Params: {
    url: `${ServicePrefixEnum.OAUTH}/parameter/value`,
    method: RequestEnum.GET,
  },
};

/**
 * @description: Get 字典
 */
export const findEnumList = (params: string[] | string = []) => {
  if (isString(params)) {
    params = [params];
  }
  return defHttp.request<OptionsGetResultModel>({ ...Api.EnumList, params });
};

export const findDictList = (params: string[] | string = []) => {
  if (isString(params)) {
    params = [params];
  }
  return defHttp.request<OptionsGetResultModel>({ ...Api.DictList, params });
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
  cacheKey: (param) => `${param}`,
  getErrorData(_param, error, _reject) {
    return {
      code: 400,
      msg: error.message || '请求错误',
      data: [],
    };
  },
  // 实现批量请求
  async service(paramList, cacheKey) {
    const data = await findDictList(paramList);
    const resultMap: Map<String, DelayResult> = new Map<String, DelayResult>();
    paramList.forEach((code) => {
      const key = cacheKey(code);
      const dictList = data[code];
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

export async function asyncFindDictList(code: String) {
  return codeTimeDelayReq.loadByParam(code);
}

const enumTimeDelayReq = new TimeDelayReq({
  cacheKey: (param) => `${param}`,
  getErrorData(_param, error, _reject) {
    return {
      code: 400,
      msg: error.message || '请求错误',
      data: [],
    };
  },
  // 实现批量请求
  async service(paramList, cacheKey) {
    const data = await findEnumList(paramList);
    const resultMap: Map<String, DelayResult> = new Map<String, DelayResult>();
    paramList.forEach((code) => {
      const key = cacheKey(code);
      const dictList = data[code];
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
