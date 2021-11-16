import { Enum } from '/@/api/model/baseModel';

export interface EMsgPageQuery {
  bizId?: string;
  bizType?: string;
  msgType?: Enum | string;
  title?: string;
  content?: string;
  author?: string;
  handlerUrl?: string;
  handlerParams?: string;
  isSingleHandle?: boolean;
  createTime?: string;
  updateTime?: string;
}

export interface EMsgSaveVO {
  msgVO: MsgVO;
  userIdList?: [];
  roleCodeList?: [];
}

export interface MsgVO {
  bizId: string;
  bizType: string;
  msgType: Enum;
  title: string;
  content: string;
  author: string;
  handlerUrl: string;
  handlerParams: string;
  isSingleHandle: boolean;
  createTime: string;
  updateTime: string;
}

export interface EMsgUpdateVO {
  id: string;
  bizId: string;
  bizType: string;
  msgType: Enum | string;
  title: string;
  content: string;
  author: string;
  handlerUrl: string;
  handlerParams: string;
  isSingleHandle: boolean;
  createTime: string;
  updateTime: string;
}

export interface EMsgResultVO {
  bizId?: string;
  bizType?: string;
  msgType?: Enum | string;
  title?: string;
  content?: string;
  author?: string;
  handlerUrl?: string;
  handlerParams?: string;
  isSingleHandle?: boolean;
  createTime?: string;
  updateTime?: string;
  id?: string;
  createdBy?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}
