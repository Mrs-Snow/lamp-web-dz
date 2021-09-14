export interface DictionaryPageQuery {
  type: string;
  label: string;
  code: string;
  name: string;
  state: boolean;
  describe: string;
  sortValue: number;
  icon: string;
  cssStyle: string;
  cssClass: string;
  readonly: boolean;
}

export interface DictionarySaveDTO {
  type: string;
  label: string;
  code: string;
  name: string;
  state: boolean;
  describe: string;
  sortValue: number;
  icon: string;
  cssStyle: string;
  cssClass: string;
  readonly: boolean;
}

export interface DictionaryUpdateDTO {
  id: string;
  type: string;
  label: string;
  code: string;
  name: string;
  state: boolean;
  describe: string;
  sortValue: number;
  icon: string;
  cssStyle: string;
  cssClass: string;
  readonly: boolean;
}

export interface Dictionary {
  type?: string;
  label?: string;
  code?: string;
  name?: string;
  state?: boolean;
  describe?: string;
  sortValue?: number;
  icon?: string;
  cssStyle?: string;
  cssClass?: string;
  readonly?: boolean;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
