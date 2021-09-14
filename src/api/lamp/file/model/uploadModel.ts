import { Enum } from '/@/api/model/baseModel';

export interface AttachmentDTO {
  id: string;
  bizType: string;
  fileType: Enum;
  storageType?: Enum;
  bucket: string;
  path: string;
  url: string;
  uniqueFileName?: string;
  fileMd5?: string;
  originalFileName: string;
  contentType: string;
  suffix: string;
  size: string;
}

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
