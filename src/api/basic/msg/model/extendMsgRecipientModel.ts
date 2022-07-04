export interface ExtendMsgRecipientPageQuery {
  taskId?: string; // 任务ID
  recipient?: string; // 接收人
}

export interface ExtendMsgRecipientSaveVO {
  taskId?: string; // 任务ID
  recipient?: string; // 接收人
}

export interface ExtendMsgRecipientUpdateVO {
  id: string;
  taskId?: string; // 任务ID
  recipient?: string; // 接收人
}

export interface ExtendMsgRecipientResultVO {
  echoMap?: any;
  id?: string; // ID
  createdBy?: string; // 创建人
  createdTime?: string; // 创建时间
  updatedBy?: string; // 最后修改人
  updatedTime?: string; // 最后修改时间
  taskId?: string; // 任务ID
  recipient?: string; // 接收人
}
