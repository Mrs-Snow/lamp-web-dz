import { Enum } from '/@/api/model/baseModel';

export interface SmsTaskPageQuery {
  templateId: string;
  status: Enum;
  sourceType: Enum;
  receiver: string;
  topic: string;
  templateParams: string;
  sendTime: string;
  content: string;
  draft: boolean;
}

export interface SmsTaskSaveDTO {
  templateId: string;
  status: Enum;
  sourceType: Enum;
  receiver: string;
  topic: string;
  templateParams: string;
  sendTime: string;
  content: string;
  draft: boolean;
}

export interface SmsTaskUpdateDTO {
  id: string;
  templateId: string;
  status: Enum;
  sourceType: Enum;
  receiver: string;
  topic: string;
  templateParams: string;
  sendTime: string;
  content: string;
  draft: boolean;
}

export interface SmsTask {
  templateId?: string;
  status?: Enum;
  sourceType?: Enum;
  receiver?: string;
  topic?: string;
  templateParams?: string;
  sendTime?: string;
  content?: string;
  draft?: boolean;
  id?: string;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
  telNumList?: string[];
  echoMap?: Recordable;
}
