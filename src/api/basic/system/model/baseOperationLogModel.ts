import { Enum } from '/@/api/model/baseModel';

export interface BaseOperationLogPageQuery {
  requestIp?: string;
  type?: Enum;
  userName?: string;
  description?: string;
  classPath?: string;
  actionMethod?: string;
  requestUri?: string;
  httpMethod?: Enum;
  startTime?: string;
  finishTime?: string;
  consumingTime?: string;
  ua?: string;
  createdOrgId?: string;
}

export interface BaseOperationLogSaveVO {
  requestIp: string;
  type: Enum;
  userName: string;
  description: string;
  classPath: string;
  actionMethod: string;
  requestUri: string;
  httpMethod: Enum;
  startTime: string;
  finishTime: string;
  consumingTime: string;
  ua: string;
  createdOrgId: string;
}

export interface BaseOperationLogUpdateVO {
  id: string;
  requestIp: string;
  type: Enum;
  userName: string;
  description: string;
  classPath: string;
  actionMethod: string;
  requestUri: string;
  httpMethod: Enum;
  startTime: string;
  finishTime: string;
  consumingTime: string;
  ua: string;
  createdOrgId: string;
}

export interface BaseOperationLogResultVO {
  requestIp?: string;
  type?: Enum;
  userName?: string;
  description?: string;
  classPath?: string;
  actionMethod?: string;
  requestUri?: string;
  httpMethod?: Enum;
  startTime?: string;
  finishTime?: string;
  consumingTime?: string;
  ua?: string;
  createdOrgId?: string;
  id?: string;
  createdTime?: string;
  createdBy?: string;
  updatedTime?: string;
  updatedBy?: string;
  echoMap?: any;
}
