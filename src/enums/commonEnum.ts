/**
 * 后端服务请求 前缀
 */
export enum ServicePrefixEnum {
  // 租户服务
  TENANT = '/tenant',
  // 认证服务
  OAUTH = '/oauth',
  // 文件服务
  FILE = '/file',
  // 权限服务
  AUTHORITY = '/authority',
  // 消息服务
  MSG = '/msg',
  // 工作流服务
  ACTIVITI = '/activiti',
  // 网关
  GATEWAY = '/gateway',
}

/**
 * 操作列 类型
 */
export enum ActionEnum {
  // 新增
  ADD = 'add',
  // 编辑
  EDIT = 'edit',
  // 复制
  COPY = 'copy',
  // 删除
  DELETE = 'delete',
  // 详情
  VIEW = 'view',
}

/**
 * 文件的业务 类型
 */
export enum FileBizTypeEnum {
  // 默认库 租户logo
  DEF_TENANT_LOGO = 'DEF_TENANT_LOGO',
  // 基础库 用户头像
  BASE_USER_AVATAR = 'BASE_USER_AVATAR',
  // 基础库 文件中心
  BASE_FILE = 'BASE_FILE',
  // 扩展库 消息内容附件
  EXTEND_MSG_CONTENT = 'EXTEND_MSG_CONTENT',
}

/**
 * 文件的 桶 （需要提前跟后端约定，并让后端配置到OSS中）
 */
export enum FileBucketEnum {
  //公开桶
  public = 'public',
}

export enum EnumEnum {
  // msg
  TaskStatus = 'TaskStatus',
  SendStatus = 'SendStatus',
  SourceType = 'SourceType',
  ProviderType = 'ProviderType',
  MsgBizType = 'MsgBizType',
  MsgType = 'MsgType',
  // file
  FileType = 'FileType',
  FileStorageType = 'FileStorageType',
  // tenant
  TenantConnectTypeEnum = 'TenantConnectTypeEnum',
  // authority
  ApplicationAppTypeEnum = 'ApplicationAppTypeEnum',
  TenantStatusEnum = 'TenantStatusEnum',
  TenantTypeEnum = 'TenantTypeEnum',
  Sex = 'Sex',
  AuthorizeType = 'AuthorizeType',
  LogType = 'LogType',
  DataScopeType = 'DataScopeType',
  HttpMethod = 'HttpMethod',
}
export enum DictEnum {
  // authority
  POSITION_STATUS = 'POSITION_STATUS',
  ORG_TYPE = 'ORG_TYPE',
  NATION = 'NATION',
  EDUCATION = 'EDUCATION',
  AREA_LEVEL = 'TENANT_AREA_LEVEL',
  AREA_SOURCE = 'TENANT_AREA_SOURCE',
  RESOURCE_TYPE = 'TENANT_RESOURCE_TYPE',
  RESOURCE_TRANSITION_NAME = 'TENANT_RESOURCE_TRANSITION_NAME',
  DICT_TYPE = 'TENANT_DICT_TYPE',
  DICT_CLASSIFY = 'TENANT_DICT_CLASSIFY',
  PARAMETER_TYPE = 'TENANT_PARAMETER_TYPE',
  APPLICATION_TYPE = 'TENANT_APPLICATION_TYPE',
}

export enum MsgTypeEnum {
  TO_DO = 'TO_DO',
  NOTIFY = 'NOTIFY',
  NOTICE = 'NOTICE',
  EARLY_WARNING = 'EARLY_WARNING',
}
