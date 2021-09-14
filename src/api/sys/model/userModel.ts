/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
  tenantView?: string;
  tenant?: string;
  code?: string;
  key?: string;
  grantType?: string;
  refreshToken?: string;
}

/**
 * @description: Logout interface parameters
 */
export interface LogoutParams {
  token: string;
  userId: string | number;
  clientId: string;
}

/**
 * @description: 获取验证码
 */
export interface GetCaptchaByKeyParams {
  key: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface GetAuthorityResourceByUserIdParams {
  userId: string | number;
  menuId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  tokenType: string;
  refreshToken: string;
  name: string;
  account: string;
  avatarId: string;
  workDescribe: string;
  expire: string;
  expiration: string;
  expireMillis: string;
  homePath: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  id: string | number;
  // 用户名
  account?: string;
  // 真实名字
  name?: string;
  // 头像
  avatarId?: string;
  // 介绍
  workDescribe?: string;
}

/**
 * @description: 获取用户的资源和角色
 */
export interface GetAuthorityResourceByUserIdModel {
  // 是否启用
  enabled: boolean;
  // 区分大小写
  caseSensitive: boolean;
  // 拥有的资源编码
  resourceList: string[];
  // 用用的角色编码
  roleList: string[];
}
