import { BasicFetchResult } from '/@/api/model/baseModel';

export interface OptionsItem {
  label: string;
  text: string;
  value: string;
}

/**
 * @description: Request list return value
 */
export type OptionsGetResultModel = BasicFetchResult<OptionsItem[]>;
