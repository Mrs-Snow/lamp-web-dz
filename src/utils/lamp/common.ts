import { useMessage } from '/@/hooks/web/useMessage';
import componentSetting from '/@/settings/componentSetting';
import { isArray, isFunction } from '/@/utils/is';
import { DictEnum, EnumEnum } from '/@/enums/commonEnum';
import { asyncFindDictList, asyncFindEnumList } from '/@/api/lamp/common/general';

const { createMessage } = useMessage();

const PAGE_PARAMS = Object.values(componentSetting.table.fetchSetting);

export const handleSearchInfoByCreateTime = (data: Recordable) => {
  const temp = { ...data };
  for (const k in data) {
    delete data[k];
  }
  data.model = temp;
  if (temp.createTimeRange) {
    data.extra = {
      createTime_st: temp.createTimeRange[0],
      createTime_ed: temp.createTimeRange[1],
    };
  }
  delete data.model['createTimeRange'];
  return data;
};

export const handleFetchParams = (data: Recordable) => {
  const tempData = { model: {}, extra: {} };
  const model = {};
  for (const key in data) {
    if (PAGE_PARAMS.includes(key)) {
      tempData[key] = data[key];
    } else if (key.endsWith('.desc')) {
      model[key.split('.desc')[0]] = data[key];
    } else if (key.startsWith('echoMap.')) {
      const tempK = key.split('echoMap.')[1];
      model[tempK.split('.')[0]] = data[key];
    } else if (key === 'createTimeRange') {
    } else {
      model[key] = data[key];
    }
  }
  if (data?.createTimeRange) {
    tempData.extra = {
      createTime_st: data.createTimeRange[0],
      createTime_ed: data.createTimeRange[1],
    };
  }
  tempData.model = model;
  return tempData;
};

/**
 * 下载方法
 * @param response
 */
export const downloadFile = (response) => {
  const res = response.data;
  const type = res.type;
  if (type.includes('application/json')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.readyState === 2) {
        const data = JSON.parse(e.target?.result as string);
        createMessage.warning(data.msg);
      }
    };
    reader.readAsText(res);
  } else {
    const disposition = response?.headers?.['content-disposition'];
    let fileName = '下载文件.zip';
    if (disposition) {
      const respcds = disposition.split(';');
      for (let i = 0; i < respcds.length; i++) {
        const header = respcds[i];
        if (header !== null && header !== '') {
          const headerValue = header.split('=');
          if (headerValue !== null && headerValue.length > 0) {
            if (headerValue[0].trim().toLowerCase() === 'filename') {
              fileName = decodeURI(headerValue[1]);
              break;
            }
          }
        }
      }
    }
    //处理引号
    if (
      (fileName.startsWith("'") || fileName.startsWith('"')) &&
      (fileName.endsWith("'") || fileName.endsWith('"'))
    ) {
      fileName = fileName.substring(1, fileName.length - 1);
    }

    const blob = new Blob([res]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
};

/**
 * 根据 key 查询节点
 * @param key 唯一键
 * @param list 树列表
 */
export function findNodeByKey(key: any, list: any[]) {
  if (key === '0') {
    return {
      id: '0',
      label: '根节点',
    };
  }
  if (!key) {
    return {
      id: key,
      label: '根节点',
    };
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.id === key) {
      return item;
    }
    if (item.children) {
      const res = findNodeByKey(key, item.children);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

/**
 * 根据 条件回调 查找节点
 * @param list 树列表
 * @param func 条件回调
 * @param resultFunc 返回值回调
 */
export function findNodeByFunction(list: any[], func: Fn, resultFunc: Fn) {
  if (!isFunction(func)) {
    console.error('func 参数不是一个函数');
    return [];
  }
  if (!list || !isArray(list)) {
    return [];
  }
  let nodeList: any[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (func(item)) {
      nodeList.push(resultFunc(item));
    }
    if (item.children && item.children.length > 0) {
      const childrenNodes = findNodeByFunction(item.children, func, resultFunc);
      nodeList = [...nodeList, ...childrenNodes];
    }
  }
  return nodeList;
}

/**
 * 校验手机号格式
 * @param mobile
 */
export function validMobile(mobile) {
  const reg = /^0?1[0-9]{10}$/;
  return reg.test(mobile);
}

// 格式化文件大小 单位：B、KB、MB、GB
export const formatFileSize = (value) => {
  if (null == value || value == '') {
    return '0 M';
  }
  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const srcSize = parseFloat(value);
  const index = Math.floor(Math.log(srcSize) / Math.log(1024));
  const size = srcSize / Math.pow(1024, index);
  if (unitArr[index]) {
    return size.toFixed(2) + unitArr[index];
  }
  return '文件太大';
};

export const enumComponentProps = (code: EnumEnum) => {
  return { api: asyncFindEnumList, params: code, resultField: 'data' };
};

export const dictComponentProps = (code: DictEnum) => {
  return { api: asyncFindDictList, params: code, resultField: 'data' };
};
