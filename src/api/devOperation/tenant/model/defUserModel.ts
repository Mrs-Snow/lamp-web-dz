export interface DefUserPageQuery {
  username?: string;
  name?: string;
  email?: string;
  mobile?: string;
  idCard?: string;
  wxOpenId?: string;
  ddOpenId?: string;
  readonly?: boolean;
  sex?: string;
  nation?: string;
  education?: string;
  state?: boolean;
  workDescribe?: string;
  passwordErrorLastTime?: string;
  passwordErrorNum?: number;
  passwordExpireTime?: string;
  password?: string;
  salt?: string;
  lastLoginTime?: string;
}

export interface DefUserSaveVO {
  username: string;
  name: string;
  email: string;
  mobile: string;
  idCard: string;
  wxOpenId: string;
  ddOpenId: string;
  readonly: boolean;
  sex: string;
  state: boolean;
  nation?: string;
  education?: string;
  workDescribe: string;
  passwordErrorLastTime: string;
  passwordErrorNum: number;
  passwordExpireTime: string;
  password: string;
  salt: string;
  lastLoginTime: string;
}

export interface DefUserUpdateVO {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  idCard: string;
  wxOpenId: string;
  ddOpenId: string;
  readonly: boolean;
  sex: string;
  nation?: string;
  education?: string;
  state: boolean;
  workDescribe: string;
  passwordErrorLastTime: string;
  passwordErrorNum: number;
  passwordExpireTime: string;
  password: string;
  salt: string;
  lastLoginTime: string;
}

export interface DefUserResultVO {
  username?: string;
  name?: string;
  email?: string;
  mobile?: string;
  idCard?: string;
  wxOpenId?: string;
  ddOpenId?: string;
  readonly?: boolean;
  sex?: string;
  nation?: string;
  education?: string;
  state?: boolean;
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

export interface DefUserPasswordResetVO {
  id: string;
  isUseSystemPassword: boolean;
  password?: string;
  confirmPassword?: string;
}
