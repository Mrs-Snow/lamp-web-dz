export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',

  // 运营系统
  // 数据源维护
  TENANT_DATASOURCE_CONFIG_ADD = 'tenant:tenant:datasourceConfig:add',
  TENANT_DATASOURCE_CONFIG_EDIT = 'tenant:tenant:datasourceConfig:edit',
  TENANT_DATASOURCE_CONFIG_DELETE = 'tenant:tenant:datasourceConfig:delete',
  TENANT_DATASOURCE_CONFIG_VIEW = 'tenant:tenant:datasourceConfig:view',
  TENANT_DATASOURCE_CONFIG_DEBUG = 'tenant:tenant:datasourceConfig:test',

  // 租户维护
  TENANT_TENANT_ADD = 'tenant:tenant:tenant:add',
  TENANT_TENANT_EDIT = 'tenant:tenant:tenant:edit',
  TENANT_TENANT_DELETE = 'tenant:tenant:tenant:delete',
  TENANT_TENANT_VIEW = 'tenant:tenant:tenant:view',
  TENANT_TENANT_INIT_DATA = 'tenant:tenant:tenant:initData',
  TENANT_TENANT_INIT_DATA_SOURCE = 'tenant:tenant:tenant:initDataSource',
  TENANT_TENANT_BIND_USER = 'tenant:tenant:tenant:bindUser',
  TENANT_TENANT_TO_EXAMINE = 'tenant:tenant:tenant:toExamine',

  // 用户维护
  TENANT_USER_ADD = 'tenant:tenant:user:add',
  TENANT_USER_EDIT = 'tenant:tenant:user:edit',
  TENANT_USER_DELETE = 'tenant:tenant:user:delete',
  TENANT_USER_VIEW = 'tenant:tenant:user:view',

  // 应用
  APPLICATION_ADD = 'tenant:application:application:add',
  APPLICATION_DELETE = 'tenant:application:application:delete',
  APPLICATION_EDIT = 'tenant:application:application:edit',
  APPLICATION_COPY = 'tenant:application:application:copy',
  APPLICATION_RESOURCE = 'tenant:application:application:resource',
  APPLICATION_IS_VISIBLE = 'tenant:application:application:isVisible',
  // 应用资源
  APPLICATION_RESOURCE_ADD = 'tenant:application:application:resource:add',
  APPLICATION_RESOURCE_EDIT = 'tenant:application:application:resource:edit',
  APPLICATION_RESOURCE_DELETE = 'tenant:application:application:resource:delete',
  // 资源
  RESOURCE_ADD = 'tenant:application:resource:add',
  RESOURCE_EDIT = 'tenant:application:resource:edit',
  RESOURCE_DELETE = 'tenant:application:resource:delete',
  // 应用授权
  APPLICATION_AUTHORIZE_GRANT = 'tenant:application:authorize:grant',
  APPLICATION_AUTHORIZE_RENEWAL = 'tenant:application:authorize:renewal',
  APPLICATION_AUTHORIZE_CANCEL = 'tenant:application:authorize:cancel',

  // 字典
  SYSTEM_DICT_ADD = 'tenant:system:dict:add',
  SYSTEM_DICT_EDIT = 'tenant:system:dict:edit',
  SYSTEM_DICT_DELETE = 'tenant:system:dict:delete',
  SYSTEM_DICT_ADD_ITEM = 'tenant:system:dict:addItem',
  SYSTEM_DICT_EDIT_ITEM = 'tenant:system:dict:editItem',
  SYSTEM_DICT_DELETE_ITEM = 'tenant:system:dict:deleteItem',
  // 参数维护
  SYSTEM_PARAM_ADD = 'tenant:system:param:add',
  SYSTEM_PARAM_EDIT = 'tenant:system:param:edit',
  SYSTEM_PARAM_DELETE = 'tenant:system:param:delete',
  SYSTEM_PARAM_VIEW = 'tenant:system:param:view',
  // 地区维护
  SYSTEM_AREA_ADD = 'tenant:system:area:add',
  SYSTEM_AREA_EDIT = 'tenant:system:area:edit',
  SYSTEM_AREA_DELETE = 'tenant:system:area:delete',
  // 客户端维护
  SYSTEM_CLIENT_ADD = 'tenant:system:client:add',
  SYSTEM_CLIENT_EDIT = 'tenant:system:client:edit',
  SYSTEM_CLIENT_DELETE = 'tenant:system:client:delete',
  SYSTEM_CLIENT_VIEW = 'tenant:system:client:view',
  // 客户端维护
  SYSTEM_LOGIN_LOG_DELETE = 'tenant:system:loginLog:delete',
  SYSTEM_LOGIN_LOG_VIEW = 'tenant:system:loginLog:view',

  // 基础平台
  // 消息管理
  MSG_MSG_ADD = 'basic:msg:msg:add',
  MSG_MSG_EDIT = 'basic:msg:msg:edit',
  MSG_MSG_DELETE = 'basic:msg:msg:delete',
  MSG_MSG_VIEW = 'basic:msg:msg:view',
  // 我的消息
  MSG_MY_MSG_DELETE = 'basic:msg:myMsg:delete',
  MSG_MY_MSG_VIEW = 'basic:msg:myMsg:edit',

  // 员工维护
  EMPLOYEE_ADD = 'basic:user:employee:add',
  EMPLOYEE_EDIT = 'basic:user:employee:edit',
  EMPLOYEE_DELETE = 'basic:user:employee:delete',
  EMPLOYEE_VIEW = 'basic:user:employee:view',

  // 机构维护
  ORG_ADD = 'basic:user:org:add',
  ORG_EDIT = 'basic:user:org:edit',
  ORG_DELETE = 'basic:user:org:delete',
  ORG_VIEW = 'basic:user:org:view',

  // 岗位维护
  POSITION_ADD = 'basic:user:position:add',
  POSITION_EDIT = 'basic:user:position:edit',
  POSITION_DELETE = 'basic:user:position:delete',
  POSITION_VIEW = 'basic:user:position:view',

  // 个性字典
  BASIC_DICT_IMPORT = 'basic:base:dict:import',
  BASIC_DICT_EDIT = 'basic:base:dict:edit',
  BASIC_DICT_DELETE = 'basic:base:dict:delete',
  BASIC_DICT_VIEW = 'basic:base:dict:view',
  BASIC_DICT_ITEM_ADD = 'basic:base:dict:addItem',
  BASIC_DICT_ITEM_EDIT = 'basic:base:dict:editItem',
  BASIC_DICT_ITEM_DELETE = 'basic:base:dict:deleteItem',

  // 个性参数
  PARAMETER_ADD = 'basic:base:parameter:add',
  PARAMETER_EDIT = 'basic:base:parameter:edit',
  PARAMETER_DELETE = 'basic:base:parameter:delete',
  PARAMETER_VIEW = 'basic:base:parameter:view',

  // 角色权限维护
  ROLE_ADD = 'basic:system:role:add',
  ROLE_EDIT = 'basic:system:role:edit',
  ROLE_DELETE = 'basic:system:role:delete',
  ROLE_BING_USER = 'basic:system:role:bindUser',
  ROLE_BIND_RESOURCE = 'basic:system:role:bindResource',

  // 附件管理
  SYSTEM_APPENDIX_UPLOAD = 'basic:system:appendix:upload',
  SYSTEM_APPENDIX_DEBUG_UPLOAD = 'basic:system:appendix:debug:upload',
  SYSTEM_APPENDIX_DOWNLOAD = 'basic:system:appendix:download',
  SYSTEM_APPENDIX_DELETE = 'basic:system:appendix:delete',

  // 操作日志
  SYSTEM_WEB_LOG_DELETE = 'basic:system:webLog:delete',
  SYSTEM_WEB_LOG_VIEW = 'basic:system:webLog:view',
  // 登录日志
  BASIC_SYSTEM_LOGIN_LOG_DELETE = 'basic:system:loginLog:delete',
  BASIC_SYSTEM_LOGIN_LOG_VIEW = 'basic:system:loginLog:view',
}

export enum PermModeEnum {
  // 拥有所有
  Has = 'Has',
  // 拥有任意
  HasAny = 'HasAny',
  // 没有
  Without = 'Without',
}
