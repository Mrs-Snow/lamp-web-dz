import { AttachmentDTO } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile<AttachmentDTO>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
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
    { isReturnNativeResponse: true }
  );

export const getUrls = (params: string[] | number[]) => {
  return defHttp.request<string[]>({
    url: ServicePrefixEnum.FILE + '/file/anyone/findUrlById',
    method: RequestEnum.POST,
    params,
  });
};

export const listByBizId = (prefix: ServicePrefixEnum, bizId: string, bizType?: string) => {
  return defHttp.request<AttachmentDTO[]>({
    url: prefix + '/anyone/appendix/listByBizId',
    method: RequestEnum.POST,
    params: { bizId, bizType },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
};

// 用于缓存请求过得url，短时间内不比重新请求
const urlMap = {};
// 过期时间30分钟
const urlTimeOut = 1000 * 60 * 30;

export interface FileGetUrlVO {
  code: number;
  url: string;
}

export async function asyncGetUrls(id: string | number): Promise<FileGetUrlVO> {
  return new Promise<FileGetUrlVO>((resolve, reject) => {
    try {
      if (urlMap[id]) {
        const now = Date.now();
        if (now - urlMap[id].time < urlTimeOut) {
          resolve({
            ...urlMap[id].path,
          });
          return;
        }
      }
    } catch (error) {}

    timeoutGetUrl({
      resolve,
      reject,
      id,
    });
  });
}

let tempParams = [] as any[];
let timeoutId;
async function timeoutGetUrl(params: any) {
  clearTimeout(timeoutId);
  tempParams.push(params);
  // 延迟100毫秒执行，合并处理瞬时多个请求
  timeoutId = setTimeout(() => {
    loadUrlsByTempParams();
  }, 100);
}

function loadUrlsByTempParams() {
  const paramList = tempParams;
  tempParams = [];
  const params = paramList.map((item) => {
    return item.id;
  });
  getUrls(params)
    .then((data) => {
      paramList.forEach((item) => {
        item.resolve({
          code: 0,
          url: data[item.id],
        });
        // 缓存数据
        urlMap[item.path] = {
          path: {
            code: 0,
            url: data[item.id],
          },
          time: Date.now(),
        };
      });
    })
    .catch((_) => {
      // 请求发送错误
      paramList.forEach((item) => {
        item.resolve({
          code: 400,
          url: '',
        });
      });
    });
}
