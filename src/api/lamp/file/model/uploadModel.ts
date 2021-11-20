import { Enum } from '/@/api/model/baseModel';
import { ServicePrefixEnum } from '/@/enums/commonEnum';

export interface AppendixSaveVO {
  id: string;
  bizId: string;
  bizType: string;
  fileType: Enum;
  bucket: string;
  path: string;
  originalFileName: string;
  contentType: string;
  suffix: string;
  size: string;
}

export interface FileResultVO extends AppendixSaveVO {
  id: string;
  bizType: string;
  fileType: Enum;
  bucket: string;
  path: string;
  url: string;
  uniqueFileName?: string;
  fileMd5?: string;
  originalFileName: string;
  contentType: string;
  suffix: string;
  size: string;
  storageType?: Enum;
}

export interface AppendixResultVO {
  id: string;
  bizId: string;
  bizType: string;
  fileType: Enum;
  bucket: string;
  path: string;
  originalFileName: string;
  contentType: string;
  size: string;
  createdTime: string;
}

export interface AppendixQuery {
  prefix: ServicePrefixEnum;
  bizId: string;
  isDef?: boolean;
  bizType?: string;
}
