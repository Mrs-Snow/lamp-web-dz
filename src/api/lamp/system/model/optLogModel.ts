import { Enum } from '/@/api/model/baseModel';

export interface OptLogPageQuery {
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
}

export interface OptLogSaveDTO {
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
}

export interface OptLogUpdateDTO {
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
}

export interface OptLog {
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
  id: string;
  createTime: string;
  createdBy: string;
  echoMap: Recordable;
  params: string;
  result: string;
  exDetail: string;
}
