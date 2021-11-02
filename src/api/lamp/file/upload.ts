import { FileResultVO } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { TimeDelayReq, DelayResult, AsyncResult, CacheKeyFunc } from '/@/utils/lamp/timeDelayReq';
import { errImg } from '/@/utils/file/base64Conver';

/**
 * 上传到 租户库
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<FileResultVO>(
    {
      url: ServicePrefixEnum.FILE + '/file/anyone/upload',
      onUploadProgress,
    },
    params,
  );
}

/**
 * 上传到默认库
 * @description: Upload interface
 */
export function uploadToDef(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<FileResultVO>(
    {
      url: ServicePrefixEnum.FILE + '/file/anyTenant/upload',
      onUploadProgress,
    },
    params,
  );
}

export const download = (params: string[] | number[]) =>
  defHttp.request<any>(
    {
      url: ServicePrefixEnum.FILE + '/file/download',
      method: RequestEnum.GET,
      responseType: 'blob',
      params,
    },
    { isReturnNativeResponse: true },
  );

export const findUrlById = (params: string[] | number[]) => {
  return defHttp.request<string[]>({
    url: ServicePrefixEnum.FILE + '/file/anyone/findUrlById',
    method: RequestEnum.POST,
    params,
  });
};

export const findDefUrlById = (params: string[] | number[]) => {
  return defHttp.request<string[]>({
    url: ServicePrefixEnum.FILE + '/file/anyTenant/findUrlById',
    method: RequestEnum.POST,
    params,
  });
};

export const listByBizId = (prefix: ServicePrefixEnum, bizId: string, bizType?: string) => {
  return defHttp.request<FileResultVO[]>({
    url: prefix + '/anyone/appendix/listByBizId',
    method: RequestEnum.POST,
    params: { bizId, bizType },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
};

function buildResult(paramList: Array<any>, cacheKey: CacheKeyFunc, result: string[]) {
  const resultMap: Map<string, DelayResult> = new Map<string, DelayResult>();

  paramList.forEach((param) => {
    const key = cacheKey(param);
    const url = result[param];
    resultMap.set(key, {
      key,
      isOk: url ? true : false,
      data: {
        code: 0,
        data: url ?? errImg,
      },
    });
  });
  return resultMap;
}

const findUrlReq = new TimeDelayReq({
  cacheKey: (param: Recordable) => `${param}`,
  // 实现批量请求
  async api(paramList, cacheKey) {
    const result = await findUrlById(paramList);
    return buildResult(paramList, cacheKey, result);
  },
});

const findDefUrlByIdReq = new TimeDelayReq({
  cacheKey: (param: Recordable) => `${param}`,
  // 实现批量请求
  async api(paramList, cacheKey) {
    const result = await findDefUrlById(paramList);
    return buildResult(paramList, cacheKey, result);
  },
});

/**
 * 查询base库的文件
 * @param id base库 base_file表的文件id
 * @returns 访问路径
 */
export async function asyncFindUrlById(id: string): Promise<AsyncResult> {
  return findUrlReq.loadByParam(id);
}

/**
 * 查询Def库的文件
 * @param id defalts库 base_file表的文件id
 * @returns 访问路径
 */
export async function asyncFindDefUrlById(id: string): Promise<AsyncResult> {
  return findDefUrlByIdReq.loadByParam(id);
}
