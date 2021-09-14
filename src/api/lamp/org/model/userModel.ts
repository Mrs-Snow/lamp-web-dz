import { AppendixSaveVO } from '../../file/model/uploadModel';
import { Enum } from '/@/api/model/baseModel';

export interface UserPageQuery {
  account: string;
  name: string;
  orgId: string;
  stationId: string;
  readonly: boolean;
  email: string;
  mobile: string;
  sex: Enum | string;
  state: boolean;
  avatar: string;
  nation: string;
  education: string;
  positionStatus: string;
  workDescribe: string;
  passwordErrorLastTime: string;
  passwordErrorNum: number;
  passwordExpireTime: string;
  password: string;
  salt: string;
  lastLoginTime: string;
}

export interface UserSaveDTO {
  account: string;
  name: string;
  orgId: string;
  stationId: string;
  readonly: boolean;
  email: string;
  mobile: string;
  sex: Enum | string;
  state: boolean;
  avatar: string;
  nation: string;
  education: string;
  positionStatus: string;
  workDescribe: string;
  passwordErrorLastTime: string;
  passwordErrorNum: number;
  passwordExpireTime: string;
  password: string;
  salt: string;
  lastLoginTime: string;
}

export interface UserUpdateDTO {
  id: string;
  account: string;
  name: string;
  orgId: string;
  stationId: string;
  readonly: boolean;
  email: string;
  mobile: string;
  sex: Enum | string;
  state: boolean;
  avatar: string;
  nation: string;
  education: string;
  positionStatus: string;
  workDescribe: string;
  passwordErrorLastTime: string;
  passwordErrorNum: number;
  passwordExpireTime: string;
  password: string;
  salt: string;
  lastLoginTime: string;
}
export interface UserUpdateBaseInfoDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  sex: Enum | string;
  nation: string;
  education: string;
  positionStatus: string;
  workDescribe: string;
}

export interface UserUpdateAvatarDTO {
  id: string;
  appendixAvatar: AppendixSaveVO;
  avatar: string;
}

export interface User {
  account?: string;
  name?: string;
  orgId?: string;
  stationId?: string;
  readonly?: boolean;
  email?: string;
  mobile?: string;
  sex?: Enum | string;
  state?: boolean;
  avatar?: string;
  nation?: string;
  education?: string;
  positionStatus?: string;
  workDescribe?: string;
  passwordErrorLastTime?: string;
  passwordErrorNum?: number;
  passwordExpireTime?: string;
  password?: string;
  salt?: string;
  lastLoginTime?: string;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}

export interface UserUpdatePasswordDTO {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
