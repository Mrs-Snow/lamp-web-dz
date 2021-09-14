import { Enum } from '/@/api/model/baseModel';

export interface GlobalUserPageDTO {
  id: string;
  tenantCode: string;
  confirmPassword: string;
  password: string;
}

export interface UserUpdatePasswordDTO {
  tenantCode: string;
  name: string;
  account: string;
  mobile: string;
  email: string;
}

export interface User {
  echoMap: Recordable;
  id: string;
  account: string;
  name: string;
  orgId: string;
  stationId: string;
  readonly: boolean;
  email: string;
  mobile: string;
  sex: Enum;
  state: boolean;
  avatar: string;
  nation: string;
  education: string;
  positionStatus: string;
  workDescribe: string;
  createTime: string;
  createdBy: string;
  updateTime: string;
  updatedBy: string;
}

export interface GlobalUserSaveDTO {
  tenantCode: string;
  name: string;
  account: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GlobalUserUpdateDTO {
  id: string;
  tenantCode: string;
  name: string;
  account: string;
  mobile: string;
  email: string;
}
