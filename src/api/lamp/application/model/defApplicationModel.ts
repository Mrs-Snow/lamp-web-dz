export interface DefApplicationPageQuery {
  appKey?: string;
  appSecret?: string;
  name?: string;
  version?: string;
  type?: string;
  introduce?: string;
  remark?: string;
  url?: string;
  isVisible?: boolean;
  sortValue?: number;
}

export interface DefApplicationSaveVO {
  appKey: string;
  appSecret: string;
  name: string;
  version: string;
  type: string;
  introduce: string;
  remark: string;
  url: string;
  isVisible: boolean;
  sortValue: number;
}

export interface DefApplicationUpdateVO {
  id: string;
  appKey: string;
  appSecret: string;
  name: string;
  version: string;
  type: string;
  introduce: string;
  remark: string;
  url: string;
  isVisible: boolean;
  sortValue: number;
}

export interface DefApplicationResultVO {
  appKey?: string;
  appSecret?: string;
  name?: string;
  version?: string;
  type?: string;
  introduce?: string;
  remark?: string;
  url?: string;
  isVisible?: boolean;
  sortValue?: number;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
