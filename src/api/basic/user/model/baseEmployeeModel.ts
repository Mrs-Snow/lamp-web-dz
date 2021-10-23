export interface BaseEmployeePageQuery {
  isDefault?: boolean;
  userId?: string;
  positionId?: string;
  realName?: string;
  nation?: string;
  education?: string;
  positionStatus?: string;
  state?: boolean;
}

export interface BaseEmployeeSaveVO {
  isDefault: boolean;
  userId: string;
  positionId: string;
  realName: string;
  nation: string;
  education: string;
  positionStatus: string;
  state: boolean;
}

export interface BaseEmployeeUpdateVO {
  id: string;
  isDefault: boolean;
  userId: string;
  positionId: string;
  realName: string;
  nation: string;
  education: string;
  positionStatus: string;
  state: boolean;
}

export interface BaseEmployeeResultVO {
  isDefault?: boolean;
  userId?: string;
  positionId?: string;
  realName?: string;
  nation?: string;
  education?: string;
  positionStatus?: string;
  state?: boolean;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
