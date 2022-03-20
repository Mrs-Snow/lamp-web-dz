export enum TenantStatusEnum {
  NORMAL = '05',
  WAIT_INIT_SCHEMA = '10',
  WAIT_INIT_DATASOURCE = '15',
  WITHDRAW = '20',
  WAITING = '25',
  REFUSE = '30',
  AGREED = '35',
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

// 20-菜单 30-视图 40-功能 50-字段 60-数据
export enum ResourceTypeEnum {
  MENU = '20',
  VIEW = '30',
  FUNCTION = '40',
  FIELD = '50',
  DATA = '60',
}

// 01-内部组件 02-内链 03-外链
export enum ResourceOpenWithEnum {
  INNER_COMPONENT = '01',
  INNER_CHAIN = '02',
  OUTER_CHAIN = '03',
}

// 10-应用授权 20-应用续期 30-取消授权
export enum ApplicationGrantTypeEnum {
  GRANT = '10',
  RENEWAL = '20',
  CANCEL = '30',
}

export enum RouteEnum {
  DICT_ITEM = '字典项维护',
  APPLICATION_RESOURCE = '应用资源维护',
  APPLICATION_GRANT_MANAGE = '应用授权管理',
  APPLICATION_GRANT = '应用授权',

  BASIC_DICT_ITEM = '个性字典项',
  BASIC_MSG_ADD = '发布消息',
  BASIC_MY_MSG = '我的消息',
  BASIC_MY_MSG_VIEW = '查看我的消息',
  BASIC_MSG = '消息管理',
  TENANT_VIEW = '查看企业信息',
  CODE_GENERATOR_EDIT = '修改代码配置',
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

// 数据范围
export enum DataScopeEnum {
  ALL = '01',
  SELF_COMPANY_CHILDREN = '02',
  SELF_COMPANY = '03',
  SELF_DEPT_CHILDREN = '04',
  SELF_DEPT = '05',
  SELF = '06',
  CUSTOM = '07',
}

// 代码生成方式
export enum GenTypeEnum {
  ZIP = '01',
  GEN = '02',
}
