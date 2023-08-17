export interface TestUserPageQuery {
  username?: string; // 用户名
  nickName?: string; // 昵称
  email?: string; // 邮箱
  mobile?: string; // 手机
  idCard?: string; // 身份证
  wxOpenId?: string; // 微信OpenId
  ddOpenId?: string; // 钉钉OpenId
  readonly?: boolean; // 内置
  nation?: string; // 民族
  education?: string; // 学历
  sex?: string; // 性别
  state?: boolean; // 状态
  workDescribe?: string; // 工作描述
  passwordErrorLastTime?: string; // 输错密码时间
  passwordErrorNum?: number; // 密码错误次数
  passwordExpireTime?: string; // 密码过期时间
  password?: string; // 密码
  salt?: string; // 密码盐
  lastLoginTime?: string; // 最后登录时间
}

export interface TestUserSaveVO {
  username?: string; // 用户名
  nickName?: string; // 昵称
  email?: string; // 邮箱
  mobile?: string; // 手机
  idCard?: string; // 身份证
  wxOpenId?: string; // 微信OpenId
  ddOpenId?: string; // 钉钉OpenId
  readonly?: boolean; // 内置
  nation?: string; // 民族
  education?: string; // 学历
  sex?: string; // 性别
  state?: boolean; // 状态
  workDescribe?: string; // 工作描述
  passwordErrorLastTime?: string; // 输错密码时间
  passwordErrorNum?: number; // 密码错误次数
  passwordExpireTime?: string; // 密码过期时间
  password?: string; // 密码
  salt?: string; // 密码盐
  lastLoginTime?: string; // 最后登录时间
}

export interface TestUserUpdateVO {
  id: string;
  username?: string; // 用户名
  nickName?: string; // 昵称
  email?: string; // 邮箱
  mobile?: string; // 手机
  idCard?: string; // 身份证
  wxOpenId?: string; // 微信OpenId
  ddOpenId?: string; // 钉钉OpenId
  readonly?: boolean; // 内置
  nation?: string; // 民族
  education?: string; // 学历
  sex?: string; // 性别
  state?: boolean; // 状态
  workDescribe?: string; // 工作描述
  passwordErrorLastTime?: string; // 输错密码时间
  passwordErrorNum?: number; // 密码错误次数
  passwordExpireTime?: string; // 密码过期时间
  password?: string; // 密码
  salt?: string; // 密码盐
  lastLoginTime?: string; // 最后登录时间
}

export interface TestUserResultVO {
  echoMap?: any;
  id?: string; // ID
  createdBy?: string; // 创建人id
  createdTime?: string; // 创建时间
  updatedBy?: string; // 更新人id
  updatedTime?: string; // 更新时间
  username?: string; // 用户名
  nickName?: string; // 昵称
  email?: string; // 邮箱
  mobile?: string; // 手机
  idCard?: string; // 身份证
  wxOpenId?: string; // 微信OpenId
  ddOpenId?: string; // 钉钉OpenId
  readonly?: boolean; // 内置
  nation?: string; // 民族
  education?: string; // 学历
  sex?: string; // 性别
  state?: boolean; // 状态
  workDescribe?: string; // 工作描述
  passwordErrorLastTime?: string; // 输错密码时间
  passwordErrorNum?: number; // 密码错误次数
  passwordExpireTime?: string; // 密码过期时间
  password?: string; // 密码
  salt?: string; // 密码盐
  lastLoginTime?: string; // 最后登录时间
}
