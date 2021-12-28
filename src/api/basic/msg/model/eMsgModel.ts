import { Enum, PageResult } from '/@/api/model/baseModel';

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
  createdTime?: string;
  updatedTime?: string;
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
  createdTime: string;
  updatedTime: string;
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
  createdTime: string;
  updatedTime: string;
}

export interface MyMsgResult {
  todoList: PageResult<EMsgResultVO>;
  notifyList: PageResult<EMsgResultVO>;
  noticeList: PageResult<EMsgResultVO>;
  earlyWarningList: PageResult<EMsgResultVO>;
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
  createdTime?: string;
  updatedTime?: string;
  id: string;
  createdBy?: string;
  updatedBy?: string;
  echoMap?: Recordable;
  isRead?: boolean;
  employeeIdList?: string[];
  roleIdList?: string[];
}
