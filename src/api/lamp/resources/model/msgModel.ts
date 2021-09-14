import { Enum } from '/@/api/model/baseModel';
import { PageResult } from '/@/api/model/baseModel';

export interface MsgPageQuery {
  bizId?: string;
  bizType?: Enum;
  msgType?: Enum;
  title?: string;
  content?: string;
  author?: string;
  handlerUrl?: string;
  handlerParams?: string;
  isSingleHandle?: boolean;
  isRead?: boolean;
}

export interface MsgSaveDTO {
  msgDTO: MsgDTO;
  userIdList?: [];
  roleCodeList?: [];
}
export interface MsgDTO {
  bizId: string;
  bizType: Enum;
  msgType: Enum;
  title: string;
  content: string;
  author: string;
  handlerUrl: string;
  handlerParams: string;
  isSingleHandle: boolean;
}

export interface MsgUpdateDTO {
  id: string;
  bizId: string;
  bizType: Enum;
  msgType: Enum;
  title: string;
  content: string;
  author: string;
  handlerUrl: string;
  handlerParams: string;
  isSingleHandle: boolean;
}

export interface Msg {
  bizId?: string;
  bizType?: Enum | string;
  msgType?: Enum | string;
  title?: string;
  content?: string;
  author?: string;
  handlerUrl?: string;
  handlerParams?: string;
  isSingleHandle?: boolean;
  id: string;
  createdTime?: string;
  createdBy?: string;
  updatedTime?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}

export interface MsgPageResult extends Msg {
  isRead: boolean;
  readTime: string;
  receiveId: string;
}

export interface MyMsgResult {
  todoList: PageResult<MsgPageResult>;
  notifyList: PageResult<MsgPageResult>;
  noticeList: PageResult<MsgPageResult>;
  earlyWarningList: PageResult<MsgPageResult>;
}
