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
export enum OrgTypeEnum {
  COMPANY = '10',
  DEPT = '20',
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
export enum InterfaceExecModeEnum {
  IMPL_CLASS = '01',
  SCRIPT = '02',
}
export enum MsgTemplateTypeEnum {
  SMS = '01',
  EMAIL = '02',
  NOTICE = '03',
}
//[01-待办 02-预警 03-提醒]
export enum NoticeRemindModeEnum {
  TO_DO = '01',
  EARLY_WARNING = '02',
  NOTICE = '03',
}
export enum SourceTypeEnum {
  APP = 'APP',
  SERVICE = 'SERVICE',
}

export enum MsgTypeEnum {
  TO_DO = 'TO_DO',
  NOTIFY = 'NOTIFY',
  NOTICE = 'NOTICE',
  EARLY_WARNING = 'EARLY_WARNING',
}
