export interface RateLimiterPageQuery {
  count: number;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
  intervalSec: string;
}

export interface RateLimiterSaveDTO {
  count: number;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
  intervalSec: string;
}

export interface RateLimiterUpdateDTO {
  id: string;
  count: number;
  requestUri: string;
  requestMethod: string;
  limitStart: string;
  limitEnd: string;
  state: boolean;
  intervalSec: string;
}

export interface RateLimiter {
  count?: number;
  requestUri?: string;
  requestMethod?: string;
  limitStart?: string;
  limitEnd?: string;
  state?: boolean;
  intervalSec?: string;
  id?: string;
  createTime?: string;
  createdBy?: string;
  updateTime?: string;
  updatedBy?: string;
  echoMap?: Recordable;
}
