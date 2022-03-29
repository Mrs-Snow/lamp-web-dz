import { Ref } from 'vue';
import { Badge, Tag } from 'ant-design-vue';
import { dateUtil } from '/@/utils/dateUtil';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { enumComponentProps } from '/@/utils/lamp/common';
import { ActionEnum, EnumEnum } from '/@/enums/commonEnum';
import { DropMenu } from '/@/components/Dropdown/src/typing';
import { LogTypeEnum } from '/@/enums/biz/base';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.system.baseOperationLog.requestIp'),
      dataIndex: 'requestIp',
      width: 170,
    },
    {
      title: t('basic.system.baseOperationLog.type'),
      dataIndex: ['echoMap', 'type'],
      width: 100,
      customRender: ({ record }) => {
        const status = record?.type?.code === LogTypeEnum.OPT ? 'success' : 'error';
        return <Badge status={status} text={record?.type?.desc} />;
      },
    },
    // {
    //   title: t('basic.system.baseOperationLog.userName'),
    //   dataIndex: 'userName',
    //   width: 100,
    // },
    {
      title: t('basic.system.baseOperationLog.description'),
      dataIndex: 'description',
      // width: 180,
    },
    {
      title: t('basic.system.baseOperationLog.actionMethod'),
      dataIndex: 'actionMethod',
      // width: 180,
      format: (actionMethod, record) => {
        return record?.classPath + '#' + actionMethod;
      },
    },
    {
      title: t('basic.system.baseOperationLog.requestUri'),
      dataIndex: 'requestUri',
      // width: 180,
    },
    {
      title: t('basic.system.baseOperationLog.consumingTime'),
      dataIndex: 'consumingTime',
      width: 100,
      customRender: ({ record }) => {
        const status =
          record.consumingTime < 100
            ? 'success'
            : record.consumingTime < 1000
            ? 'warning'
            : 'error';
        return <Badge status={status} text={record.consumingTime + 'ms'} />;
      },
    },
    {
      title: t('basic.system.baseOperationLog.httpMethod'),
      dataIndex: ['echoMap', 'httpMethod'],
      width: 100,
      customRender: ({ record }) => {
        let color = '';
        switch (record?.httpMethod?.code) {
          case 'POST':
            color = 'success';
            break;
          case 'GET':
            color = 'default';
            break;
          case 'DELETE':
            color = 'warning';
            break;
          case 'PUT':
            color = 'processing';
            break;
          default:
            color = 'success';
            break;
        }
        return <Tag color={color}>{record?.httpMethod?.desc}</Tag>;
      },
    },
    {
      title: t('basic.system.baseOperationLog.startTime'),
      dataIndex: 'startTime',
      width: 180,
    },
    {
      title: t('basic.system.baseOperationLog.finishTime'),
      dataIndex: 'finishTime',
      width: 180,
    },

    {
      title: t('basic.system.baseOperationLog.ua'),
      dataIndex: 'ua',
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
      field: 'description',
      label: t('basic.system.baseOperationLog.description'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'userName',
      label: t('basic.system.baseOperationLog.userName'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'classPath',
      label: t('basic.system.baseOperationLog.classPath'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'requestUri',
      label: t('basic.system.baseOperationLog.requestUri'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'requestIp',
      label: t('basic.system.baseOperationLog.requestIp'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createdTime'),
      component: 'RangePicker',
      colProps: { span: 8 },
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
      label: t('basic.system.baseOperationLog.requestIp'),
      field: 'requestIp',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.type'),
      field: 'type',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.LogType),
      },
    },
    {
      label: t('basic.system.baseOperationLog.userName'),
      field: 'userName',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.description'),
      field: 'description',
      component: 'InputTextArea',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.classPath'),
      field: 'classPath',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.actionMethod'),
      field: 'actionMethod',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.requestUri'),
      field: 'requestUri',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.httpMethod'),
      field: 'httpMethod',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.HttpMethod),
      },
    },
    {
      label: t('basic.system.baseOperationLog.startTime'),
      field: 'startTime',
      component: 'DatePicker',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('basic.system.baseOperationLog.finishTime'),
      field: 'finishTime',
      component: 'DatePicker',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('basic.system.baseOperationLog.consumingTime'),
      field: 'consumingTime',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseOperationLog.ua'),
      field: 'ua',
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
