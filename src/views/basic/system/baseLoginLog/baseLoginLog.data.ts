import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { DropMenu } from '/@/components/Dropdown/src/typing';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.system.baseLoginLog.requestIp'),
      dataIndex: 'requestIp',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.userId'),
      dataIndex: 'userId',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.userName'),
      dataIndex: 'userName',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.account'),
      dataIndex: 'account',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.description'),
      dataIndex: 'description',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.loginDate'),
      dataIndex: 'loginDate',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.ua'),
      dataIndex: 'ua',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.browser'),
      dataIndex: 'browser',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.browserVersion'),
      dataIndex: 'browserVersion',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.operatingSystem'),
      dataIndex: 'operatingSystem',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.location'),
      dataIndex: 'location',
      // width: 180,
    },
    {
      title: t('basic.system.baseLoginLog.createdOrgId'),
      dataIndex: 'createdOrgId',
      // width: 180,
    },
    {
      title: t('lamp.common.createdTime'),
      dataIndex: 'createdTime',
      sorter: true,
      width: 180,
    },
  ];
};

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      label: t('basic.system.baseLoginLog.requestIp'),
      field: 'requestIp',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.system.baseLoginLog.userName'),
      field: 'userName',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.system.baseLoginLog.account'),
      field: 'account',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.system.baseLoginLog.description'),
      field: 'description',
      component: 'Input',
      colProps: { span: 5 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createdTime'),
      component: 'RangePicker',
      colProps: { span: 6 },
    },
  ];
};

// 编辑页字段
export const editFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('basic.system.baseLoginLog.requestIp'),
      field: 'requestIp',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.userId'),
      field: 'userId',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.userName'),
      field: 'userName',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.account'),
      field: 'account',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.description'),
      field: 'description',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.loginDate'),
      field: 'loginDate',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.ua'),
      field: 'ua',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.browser'),
      field: 'browser',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.browserVersion'),
      field: 'browserVersion',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.operatingSystem'),
      field: 'operatingSystem',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseLoginLog.location'),
      field: 'location',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
  ];
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
