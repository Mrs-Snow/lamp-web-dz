import { Enum } from '/@/api/model/baseModel';

export interface SmsSendStatus {
  taskId?: string;
  sendStatus?: Enum | string;
  telNum?: string;
  bizId?: string;
  ext?: string;
  code?: string;
  message?: string;
  fee?: number;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  telNumList?: string[];
  echoMap?: Recordable;
}
