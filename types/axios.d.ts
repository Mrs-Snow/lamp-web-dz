export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  withTenant?: boolean;
}

export interface Result<T = any> {
  isSuccess: boolean;
  code: number;
  msg: string;
  data: T;
  path?: string;
  extra: any;
  timestamp: string;
  errorMsg: string;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // 其他的扩展参数
  data?: Recordable;
  // 后台用于接收file对象的参数名称
  name?: string;
  // file name
  file: File | Blob;
  // 传给后端的，文件名
  filename?: string;
  // [key: string]: any;
  // 是否覆盖单个单个文件
  single?: Boolean;
  attachmentId?: string;
  bizId?: string;
  bizType: string;
  group?: string;
}
