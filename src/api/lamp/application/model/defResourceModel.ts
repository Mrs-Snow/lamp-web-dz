export interface DefResourcePageQuery {
  applicationId: string;
  code: string;
  resourceType: string;
  describe: string;
  path: string;
  component: string;
  redirect: string;
  icon: string;
  isGeneral: boolean;
  state: boolean;
  subGroup: string;
  fieldIsSecret: boolean;
  fieldIsEdit: boolean;
  apiController: string;
  apiSpringApplicationName: string;
  apiRequestMethod: string;
  metaJson: string;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface DefResourceSaveVO {
  applicationId: string;
  code: string;
  resourceType: string;
  describe: string;
  path: string;
  component: string;
  redirect: string;
  icon: string;
  isGeneral: boolean;
  state: boolean;
  subGroup: string;
  fieldIsSecret: boolean;
  fieldIsEdit: boolean;
  apiController: string;
  apiSpringApplicationName: string;
  apiRequestMethod: string;
  metaJson: string;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface DefResourceUpdateVO {
  id: string;
  applicationId: string;
  code: string;
  resourceType: string;
  describe: string;
  path: string;
  component: string;
  redirect: string;
  icon: string;
  isGeneral: boolean;
  state: boolean;
  subGroup: string;
  fieldIsSecret: boolean;
  fieldIsEdit: boolean;
  apiController: string;
  apiSpringApplicationName: string;
  apiRequestMethod: string;
  metaJson: string;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface DefResourceResultVO {
  applicationId?: string;
  code?: string;
  resourceType?: string;
  describe?: string;
  path?: string;
  component?: string;
  redirect?: string;
  icon?: string;
  isGeneral?: boolean;
  state?: boolean;
  subGroup?: string;
  fieldIsSecret?: boolean;
  fieldIsEdit?: boolean;
  apiController?: string;
  apiSpringApplicationName?: string;
  apiRequestMethod?: string;
  metaJson?: string;
  id?: string;
  label?: string;
  parentId?: string;
  sortValue?: number;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
