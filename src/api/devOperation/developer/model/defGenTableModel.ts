export interface DefGenTablePageQuery {
  tableName?: string;
  tableComment?: string;
  subTableName?: string;
  subTableFkName?: string;
  className?: string;
  tplCategory?: string;
  packageName?: string;
  moduleName?: string;
  businessName?: string;
  functionName?: string;
  functionAuthor?: string;
  genType?: string;
  genPath?: string;
  addAuth?: string;
  editAuth?: string;
  deleteAuth?: string;
  copyAuth?: string;
  addShow?: boolean;
  editShow?: boolean;
  deleteShow?: boolean;
  copyShow?: boolean;
  options?: string;
  remark?: string;
}

export interface DefGenTableSaveVO {
  tableName: string;
  tableComment: string;
  subTableName: string;
  subTableFkName: string;
  className: string;
  tplCategory: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  functionAuthor: string;
  genType: string;
  genPath: string;
  addAuth: string;
  editAuth: string;
  deleteAuth: string;
  copyAuth: string;
  addShow: boolean;
  editShow: boolean;
  deleteShow: boolean;
  copyShow: boolean;
  options: string;
  remark: string;
}

export interface DefGenTableUpdateVO {
  id: string;
  tableName: string;
  tableComment: string;
  subTableName: string;
  subTableFkName: string;
  className: string;
  tplCategory: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  functionAuthor: string;
  genType: string;
  genPath: string;
  addAuth: string;
  editAuth: string;
  deleteAuth: string;
  copyAuth: string;
  addShow: boolean;
  editShow: boolean;
  deleteShow: boolean;
  copyShow: boolean;
  options: string;
  remark: string;
}

export interface DefGenTableResultVO {
  tableName?: string;
  tableComment?: string;
  subTableName?: string;
  subTableFkName?: string;
  className?: string;
  tplCategory?: string;
  packageName?: string;
  moduleName?: string;
  businessName?: string;
  functionName?: string;
  functionAuthor?: string;
  genType?: string;
  genPath?: string;
  addAuth?: string;
  editAuth?: string;
  deleteAuth?: string;
  copyAuth?: string;
  addShow?: boolean;
  editShow?: boolean;
  deleteShow?: boolean;
  copyShow?: boolean;
  options?: string;
  remark?: string;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: any;
}
