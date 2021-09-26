export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',

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
}

export enum PermModeEnum {
  Has = 'Has',
  HasAny = 'HasAny',
  HasNo = 'HasNo',
}
