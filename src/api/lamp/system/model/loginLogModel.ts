export interface LoginLogPageQuery {
  requestIp?: string;
  userId?: string | number;
  userName?: string;
  account?: string;
  description?: string;
  loginDate?: string;
  ua?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  location?: string;
}

export interface LoginLogSaveDTO {
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
}

export interface LoginLogUpdateDTO {
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
}

export interface LoginLog {
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
  id: string;
  createdTime: string;
  createdBy: string;
  echoMap: Recordable;
}
