import type { DropMenu } from '/@/components/Dropdown/src/typing';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.system.loginLog.requestIp'),
    dataIndex: 'requestIp',
    width: 100,
  },
  {
    title: t('lamp.system.loginLog.userName'),
    dataIndex: 'userName',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.account'),
    dataIndex: 'account',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.description'),
    dataIndex: 'description',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.loginDate'),
    dataIndex: 'loginDate',
    width: 120,
  },
  {
    title: t('lamp.system.loginLog.ua'),
    dataIndex: 'ua',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.browser'),
    dataIndex: 'browser',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.browserVersion'),
    dataIndex: 'browserVersion',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.operatingSystem'),
    dataIndex: 'operatingSystem',
    // width: 180,
  },
  {
    title: t('lamp.system.loginLog.location'),
    dataIndex: 'location',
    // width: 180,
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: t('lamp.system.loginLog.requestIp'),
    field: 'requestIp',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: t('lamp.system.loginLog.userName'),
    field: 'userName',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: t('lamp.system.loginLog.account'),
    field: 'account',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: t('lamp.system.loginLog.description'),
    field: 'description',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

// 编辑页字段
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: t('lamp.system.loginLog.requestIp'),
    field: 'requestIp',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.userId'),
    field: 'userId',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.userName'),
    field: 'userName',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.account'),
    field: 'account',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.description'),
    field: 'description',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.loginDate'),
    field: 'loginDate',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.ua'),
    field: 'ua',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.browser'),
    field: 'browser',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.browserVersion'),
    field: 'browserVersion',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.operatingSystem'),
    field: 'operatingSystem',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.loginLog.location'),
    field: 'location',
    component: 'Input',
    dynamicDisabled: true,
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};

export const clearList: DropMenu[] = [
  {
    text: '保留1个月',
    event: '1',
  },
  {
    text: '保留三个月',
    event: '2',
  },
  {
    text: '保留六个月',
    event: '3',
  },
  {
    text: '保留一年',
    event: '4',
  },
  {
    text: '保留一千条',
    event: '5',
  },
  {
    text: '保留一万条',
    event: '6',
  },
  {
    text: '保留三万条',
    event: '7',
  },
  {
    text: '保留十万条',
    event: '8',
  },
  {
    text: '清空所有',
    event: '9',
  },
];
