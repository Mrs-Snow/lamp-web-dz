import { BaseOrgResultVO } from '/@/api/basic/user/model/baseOrgModel';

export type GrantType = 'CAPTCHA' | 'PASSWORD' | 'MOBILE' | 'REFRESH_TOKEN';

/**
 * @description: Login interface parameters
 */
export interface LoginParamVO {
  username?: string;
  password?: string;
  code?: string;
  key?: string;
  grantType: GrantType;
  refreshToken?: string;
  mobile?: string;
}

export interface RegisterVO {
  code: string;
  key: string;
  password: string;
  confirmPassword: GrantType;
  nickName?: string;
}
export interface RegisterByMobileVO extends RegisterVO {
  mobile: string;
}
export interface RegisterByEmailVO extends RegisterVO {
  email: string;
}

export interface OrgResultVO {
  // 当前租户下，所属单位
  companyList: BaseOrgResultVO[];
  // 当前租户下和单位下，所属部门
  deptList: BaseOrgResultVO[];
  // 当前单位ID
  currentCompanyId: string;
  // 当前部门ID
  currentDeptId: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultVO {
  userId: string;
  employeeId: string;
  tenantId: string;
  token: string;
  uuid: string;
  tokenType: string;
  refreshToken: string;
  applicationId: string;
  // name: string;
  // account: string;
  // avatarId: string;
  // workDescribe: string;
  // expireMillis: string;
  // homePath: string;
  expire: string;
  expiration: string;
  userStatus: string;
}

/**
 * @description: Logout interface parameters
 */
export interface LogoutParams {
  token: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
