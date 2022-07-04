export interface ExtendMsgPageQuery {
  templateId?: string; // 消息模板
  status?: string; // 执行状态
  channel?: string; // 发送渠道
  param?: string; // 参数 
  title?: string; // 标题
  content?: string; // 发送内容
  sendTime?: string; // 发送时间
  draft?: boolean; // 是否草稿
}

export interface ExtendMsgSaveVO {
  templateId?: string; // 消息模板
  status?: string; // 执行状态
  channel?: string; // 发送渠道
  param?: string; // 参数 
  title?: string; // 标题
  content?: string; // 发送内容
  sendTime?: string; // 发送时间
  draft?: boolean; // 是否草稿
}

export interface ExtendMsgUpdateVO {
  id: string;
  templateId?: string; // 消息模板
  status?: string; // 执行状态
  channel?: string; // 发送渠道
  param?: string; // 参数 
  title?: string; // 标题
  content?: string; // 发送内容
  sendTime?: string; // 发送时间
  draft?: boolean; // 是否草稿
}

export interface ExtendMsgResultVO {
  echoMap?: any;
  id?: string; // 短信记录ID
  createdBy?: string; // 创建人ID
  createdTime?: string; // 创建时间
  updatedBy?: string; // 最后修改人
  updatedTime?: string; // 最后修改时间
  templateId?: string; // 消息模板
  status?: string; // 执行状态
  channel?: string; // 发送渠道
  param?: string; // 参数 
  title?: string; // 标题
  content?: string; // 发送内容
  sendTime?: string; // 发送时间
  draft?: boolean; // 是否草稿
}
