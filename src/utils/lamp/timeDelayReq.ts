// 延时请求结果
export interface DelayResult {
  key: String;
  data: any;
  endTime?: Number;
  isOk: Boolean;
}

type cacheKeyFunc = (data: any) => String;
type serviceFunc = (
  paramList: Array<any>,
  cacheKey: cacheKeyFunc
) => Promise<Map<String, DelayResult>>;
type getErrorDataFunc = (param, error, reject) => any;

// 初始化参数
// getErrorData如果没传，遇到错误的时候会把异常抛给每一个reject，如果有则按getErrorData规则执行
export interface InitOption {
  cacheTime?: number;
  service: serviceFunc;
  cacheKey?: cacheKeyFunc;
  delay?: number;
  getErrorData?: (param, error, reject) => any;
}
// 延时请求工具类
export class TimeDelayReq {
  timeoutId: NodeJS.Timeout | null = null; // 倒计时id
  tempParam: Array<any> = []; // 零时参数存放
  resMap: Map<String, DelayResult> = new Map<String, DelayResult>(); // 结果集缓存
  cacheTime = 60 * 1000 * 30; // 默认缓存30分钟
  delay = 100; // 请求延时
  cacheKey: cacheKeyFunc = JSON.stringify; // 默认获取缓存key的方式
  service: serviceFunc = async () => new Map<String, DelayResult>(); // 具体执行请求的方法
  getErrorData: getErrorDataFunc | undefined = undefined; // 错误处理函数
  // 构造函数需要传配置值
  constructor(initOption: InitOption) {
    const { service, getErrorData, cacheKey, cacheTime, delay } = initOption;
    this.service = service;
    this.cacheTime = cacheTime || this.cacheTime;
    this.cacheKey = cacheKey || this.cacheKey;
    this.getErrorData = getErrorData;
    this.delay = delay || 100;
  }
  // 清空缓存
  clear() {
    this.resMap.clear();
  }
  // 清空超时内容
  clearTimeoutCache() {
    // 清空超时的缓存
    for (const key1 of this.resMap.keys()) {
      const item: DelayResult | undefined = this.resMap.get(key1);
      if (item && (item.endTime || 0) > Date.now()) {
        this.resMap.delete(key1);
      }
    }
  }
  // 缓存的KEY 默认是JSON字串
  _loadFormCache(param) {
    const key = this.cacheKey(param);
    this.clearTimeoutCache();
    const res = this.resMap.get(key);
    if (res) {
      return res.data;
    }
    return null;
  }
  // 单词请求，缓存有取缓存，缓存没有放进演示请求参数中，会集中请求
  async loadByParam(param) {
    const result = new Promise((resolve, reject) => {
      try {
        const cache = this._loadFormCache(param);
        if (cache) {
          resolve(cache);
          return;
        }
      } catch (error) {}
      this._loadByParam(param, resolve, reject);
    });
    return result;
  }
  //  处理请求参数合并的问题
  _loadByParam(param, resolve, reject) {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
    this.tempParam.push({ param, resolve, reject });
    this.timeoutId = setTimeout(() => {
      const paramList = this.tempParam;
      this.tempParam = [];
      this._loadByParams(paramList);
    }, this.delay);
  }
  // 合并请求
  async _loadByParams(paramList) {
    const resRejMap: Map<String, any> = new Map();
    paramList.forEach((item) => {
      const key: any = this.cacheKey(item.param);
      resRejMap.set(key, item);
    });
    const formatedParamList = paramList.map((item) => item.param);
    try {
      const res: Map<String, DelayResult> = await this.service(formatedParamList, this.cacheKey);
      const endTime = Date.now() + this.cacheTime;
      for (const key of res.keys()) {
        const item: DelayResult | undefined = res.get(key);
        if (item) {
          if (item.isOk) {
            // 请求正确
            item.data.endTime = endTime;
            resRejMap.get(key).resolve(item.data);
          } else {
            // 请求有错
            resRejMap.get(key).resolve(item.data);
            res.delete(key);
          }
        }
        resRejMap.delete(key);
      }
      // 写入缓存
      for (const key of res.keys()) {
        const item = res.get(key);
        if (item) {
          this.resMap.set(key, item);
        }
      }
      // 处理没有结果的内容
      this.doErro(resRejMap, Error('请求无结果'));
    } catch (error) {
      this.doErro(resRejMap, error);
    }
  }

  doErro(resRejMap, error) {
    if (this.getErrorData) {
      for (const key of resRejMap.keys()) {
        const item = resRejMap.get(key);
        const errData = this.getErrorData(item.param, error, item.reject);
        if (errData) {
          item.resolve(errData);
        }
      }
    } else {
      for (const key of resRejMap.keys()) {
        resRejMap.get(key).reject(error);
      }
    }
  }
}
