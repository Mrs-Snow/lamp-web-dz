export interface GlobalUserPageDTO {
  id: string;
  tenantCode: string;
  confirmPassword: string;
  password: string;
}

export interface UserUpdatePasswordDTO {
  tenantCode: string;
  name: string;
  username: string;
  mobile: string;
  email: string;
}

export interface User {
  echoMap: Recordable;
  id: string;
  username: string;
  nickName: string;
  email: string;
  mobile: string;
  idCard: string;
  wxOpenId: string;
  ddOpenId: string;
  readonly: boolean;
  sex: string;
  nation: string;
  education: string;
  state: boolean;
  workDescribe: string;
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  updatedBy: string;
}

export interface GlobalUserSaveDTO {
  tenantCode: string;
  name: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GlobalUserUpdateDTO {
  id: string;
  tenantCode: string;
  name: string;
  username: string;
  mobile: string;
  email: string;
}
