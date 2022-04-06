export enum DictClassifyEnum {
  SYSTEM = '10',
  BUSINESS = '20',
}
export enum LogTypeEnum {
  OPT = 'OPT',
  EX = 'EX',
}
export enum DataTypeEnum {
  SYSTEM = '10',
  BUSINESS = '20',
}

// 角色类别
export enum RoleCategoryEnum {
  FUNCTION = '10',
  DESKTOP = '20',
  DATA_SCOPE = '30',
}

// 绑定范围类型
export enum ScopeTypeEnum {
  EMPLOYEE = '1',
  ORG = '2',
}

export const categoryMap = new Map();
categoryMap.set(RoleCategoryEnum.FUNCTION, 'success');
categoryMap.set(RoleCategoryEnum.DATA_SCOPE, 'error');
categoryMap.set(RoleCategoryEnum.DESKTOP, 'processing');

// 项目类型
export enum ProjectTypeEnum {
  CLOUD = 'CLOUD',
  BOOT = 'BOOT',
}
