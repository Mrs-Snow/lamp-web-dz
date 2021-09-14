export interface DictionaryPageQuery {
  type: string;
  label: string;
  state: boolean;
  describe: string;
  readonly: boolean;
}

export interface DictionarySaveDTO {
  type: string;
  label: string;
  state: boolean;
  describe: string;
  readonly: boolean;
}

export interface DictionaryUpdateDTO {
  id: string;
  type: string;
  label: string;
  state: boolean;
  describe: string;
  sortValue: number;
  readonly: boolean;
}

export interface Dictionary {
  type?: string;
  label?: string;
  state?: boolean;
  describe?: string;
  readonly?: boolean;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
