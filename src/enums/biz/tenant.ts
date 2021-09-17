export enum TenantStatusEnum {
  NORMAL = 'NORMAL',
  WAIT_INIT = 'WAIT_INIT',
  FORBIDDEN = 'FORBIDDEN',
  WAITING = 'WAITING',
  REFUSE = 'REFUSE',
  DELETE = 'DELETE',
}
export enum TenantTypeEnum {
  CREATE = 'CREATE',
  REGISTER = 'REGISTER',
}
export enum TenantConnectTypeEnum {
  LOCAL = 'LOCAL',
  REMOTE = 'REMOTE',
}

export enum MultiTenantTypeEnum {
  NONE = 'NONE',
  COLUMN = 'COLUMN',
  SCHEMA = 'SCHEMA',
  DATASOURCE = 'DATASOURCE',
  DATASOURCE_COLUMN = 'DATASOURCE_COLUMN',
}

// 20-菜单 30-视图 40-功能 50-字段 60-接口
export enum ResourceTypeEnum {
  MENU = '20',
  VIEW = '30',
  FUNCTION = '40',
  FIELD = '50',
  API = '60',
}
