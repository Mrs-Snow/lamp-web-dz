export interface BaseLoginLogPageQuery {
  requestIp?: string;
  userId?: string;
  userName?: string;
  account?: string;
  description?: string;
  loginDate?: string;
  ua?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  location?: string;
  createdOrgId?: string;
}

export interface BaseLoginLogSaveVO {
  requestIp: string;
  userId: string;
  userName: string;
  account: string;
  description: string;
  loginDate: string;
  ua: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  location: string;
  createdOrgId: string;
}

export interface BaseLoginLogUpdateVO {
  id: string;
  requestIp: string;
  userId: string;
  userName: string;
  account: string;
  description: string;
  loginDate: string;
  ua: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  location: string;
  createdOrgId: string;
}

export interface BaseLoginLogResultVO {
  requestIp?: string;
  userId?: string;
  userName?: string;
  account?: string;
  description?: string;
  loginDate?: string;
  ua?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  location?: string;
  createdOrgId?: string;
  id?: string;
  createdTime?: string;
  createdBy?: string;
  updatedTime?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}
