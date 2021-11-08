export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',

  // 运营系统
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

  // 基础平台
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

  // 角色权限维护
  ROLE_ADD = 'basic:system:role:add',
  ROLE_EDIT = 'basic:system:role:edit',
  ROLE_DELETE = 'basic:system:role:delete',
  ROLE_BING_USER = 'basic:system:role:bindUser',
  ROLE_BIND_RESOURCE = 'basic:system:role:bindResource',
}

export enum PermModeEnum {
  // 拥有所有
  Has = 'Has',
  // 拥有任意
  HasAny = 'HasAny',
  // 没有
  Without = 'Without',
}
