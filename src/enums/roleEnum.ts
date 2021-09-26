export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',

  APPLICATION_ADD = 'tenant:application:application:add',
  APPLICATION_DELETE = 'tenant:application:application:delete',
  APPLICATION_EDIT = 'tenant:application:application:edit',
  APPLICATION_COPY = 'tenant:application:application:copy',
  APPLICATION_RESOURCE = 'tenant:application:application:resource',
  APPLICATION_IS_VISIBLE = 'tenant:application:application:isVisible',
}

export enum PermMode {
  Has = 'Has',
  HasAny = 'HasAny',
  HasNo = 'HasNo',
}
