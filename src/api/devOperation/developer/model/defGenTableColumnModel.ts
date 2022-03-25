export interface DefGenTableColumnPageQuery {
  tableId?: string;
  name?: string;
  comment?: string;
  swaggerComment?: string;
  type?: string;
  javaType?: string;
  javaField?: string;
  tsType?: string;
  size?: number;
  isPk?: boolean;
  isIncrement?: boolean;
  isRequired?: boolean;
  isLogicDeleteField?: boolean;
  isVersionField?: boolean;
  fill?: string;
  isEdit?: boolean;
  isList?: boolean;
  isQuery?: boolean;
  width?: string;
  queryType?: string;
  component?: string;
  dictType?: string;
  echoStr?: string;
  enumStr?: string;
  sortValue?: number;
  editDefValue?: string;
  editHelpMessage?: string;
  indexHelpMessage?: string;
}

export interface DefGenTableColumnSaveVO {
  tableId?: string;
  name?: string;
  comment?: string;
  swaggerComment?: string;
  type?: string;
  javaType?: string;
  javaField?: string;
  tsType?: string;
  size?: number;
  isPk?: boolean;
  isIncrement?: boolean;
  isRequired?: boolean;
  isLogicDeleteField?: boolean;
  isVersionField?: boolean;
  fill?: string;
  isEdit?: boolean;
  isList?: boolean;
  isQuery?: boolean;
  width?: string;
  queryType?: string;
  component?: string;
  dictType?: string;
  echoStr?: string;
  enumStr?: string;
  sortValue?: number;
  editDefValue?: string;
  editHelpMessage?: string;
  indexHelpMessage?: string;
}

export interface DefGenTableColumnUpdateVO {
  id: string;
  tableId?: string;
  name?: string;
  comment?: string;
  swaggerComment?: string;
  type?: string;
  javaType?: string;
  javaField?: string;
  tsType?: string;
  size?: number;
  isPk?: boolean;
  isIncrement?: boolean;
  isRequired?: boolean;
  isLogicDeleteField?: boolean;
  isVersionField?: boolean;
  fill?: string;
  isEdit?: boolean;
  isList?: boolean;
  isQuery?: boolean;
  width?: string;
  queryType?: string;
  component?: string;
  dictType?: string;
  echoStr?: string;
  enumStr?: string;
  sortValue?: number;
  editDefValue?: string;
  editHelpMessage?: string;
  indexHelpMessage?: string;
}

export interface DefGenTableColumnResultVO {
  echoMap?: any;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  tableId?: string;
  name?: string;
  comment?: string;
  swaggerComment?: string;
  type?: string;
  javaType?: string;
  javaField?: string;
  tsType?: string;
  size?: number;
  isPk?: boolean;
  isIncrement?: boolean;
  isRequired?: boolean;
  isLogicDeleteField?: boolean;
  isVersionField?: boolean;
  fill?: string;
  isEdit?: boolean;
  isList?: boolean;
  isQuery?: boolean;
  width?: string;
  queryType?: string;
  component?: string;
  dictType?: string;
  echoStr?: string;
  enumStr?: string;
  sortValue?: number;
  editDefValue?: string;
  editHelpMessage?: string;
  indexHelpMessage?: string;
}
