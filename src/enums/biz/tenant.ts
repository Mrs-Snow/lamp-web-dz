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
