export enum TenantStatusEnum {
  NORMAL = '05',
  WAIT_INIT = '10',
  WITHDRAW = '15',
  WAITING = '20',
  REFUSE = '25',
  AGREED = '30',
}
export enum TenantTypeEnum {
  CREATE = 'CREATE',
  REGISTER = 'REGISTER',
}
export enum TenantConnectTypeEnum {
  SYSTEM = 'SYSTEM',
  CUSTOM = 'CUSTOM',
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

// 01-内部组件 02-内链 03-外链
export enum ResourceOpenWithEnum {
  INNER_COMPONENT = '01',
  INNER_CHAIN = '02',
  OUTER_CHAIN = '03',
}

export enum RouteEnum {
  DICT_ITEM = '字典项维护',
  APPLICATION_RESOURCE = '应用资源维护',
  APPLICATION_GRANT_MANAGE = '应用授权管理',
  APPLICATION_GRANT = '应用授权',

  BASIC_DICT_ITEM = '个性字典项',
  BASIC_MSG_ADD = '发布消息',
  BASIC_MY_MSG_VIEW = '查看我的消息',
  BASIC_MSG = '消息管理',
  TENANT_VIEW = '查看企业信息',
}

//0-过期 1-有效
export enum ExpireStateEnum {
  EFFECTIVE = '1',
  EXPIRED = '0',
}

// 登录状态
export enum LoginStatusEnum {
  SUCCESS = '01',
  CAPTCHA_ERROR = '02',
  PASSWORD_ERROR = '03',
  USER_ERROR = '04',
}
