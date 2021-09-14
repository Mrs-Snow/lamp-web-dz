import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { query, get } from '/@/api/lamp/resources/smsTemplate';
import { ActionEnum, EnumEnum } from '/@/enums/commonEnum';
import { unref } from 'vue';
import { enumComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.resources.smsTask.templateId'),
    dataIndex: 'echoMap.templateId',
    // width: 180,
  },

  {
    title: t('lamp.resources.smsTask.sourceType'),
    dataIndex: 'sourceType.desc',
    width: 80,
  },
  {
    title: t('lamp.resources.smsTask.topic'),
    dataIndex: 'topic',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTask.content'),
    dataIndex: 'content',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTask.sendTime'),
    dataIndex: 'sendTime',
    width: 180,
    format: (text: string, record: Recordable) => {
      return text ? text : record.createTime;
    },
  },
  {
    title: t('lamp.resources.smsTask.status'),
    dataIndex: 'status.desc',
    width: 100,
  },
  {
    title: t('lamp.resources.smsTask.draft'),
    dataIndex: 'draft',
    width: 80,
    format: (text) => {
      return text ? t('lamp.common.yes') : t('lamp.common.no');
    },
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
    label: t('lamp.resources.smsTask.templateId'),
    field: 'templateId',
    component: 'ApiSelect',
    componentProps: {
      api: query,
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsTask.receiver'),
    field: 'telNum',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsTask.topic'),
    field: 'topic',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 5 },
  },
];

// 编辑页字段
export const editFormSchema = (formState, type): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.resources.smsTask.topic'),
      field: 'topic',
      component: 'Input',
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('lamp.resources.smsTask.receiver'),
      field: 'telNum',
      component: 'Input',
      slot: 'telNum',
    },
    {
      label: t('lamp.resources.smsTask.templateId'),
      field: 'templateId',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
        onChange: async (templateId: any) => {
          const template = await get(templateId);
          if (template?.templateParams) {
            formState.smsTemplate = template;
            try {
              const temp = JSON.parse(template?.templateParams);
              formState.templateParam = [...temp];
            } catch (e) {
              console.warn('解析模板参数异常');
              formState.templateParam = [];
            }
          } else {
            formState.templateParam = [];
          }
        },
      },
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '定时发送',
      field: 'sendTime',
      component: 'Input',
      slot: 'sendTime',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.resources.smsTask.content'),
      field: 'content',
      component: 'Input',
      slot: 'content',
    },
    {
      label: t('lamp.resources.smsTask.templateParams'),
      field: 'templateParam',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.resources.smsTask.status'),
      field: 'status',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.TaskStatus),
      },
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      ifShow: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('lamp.resources.smsTask.draft'),
      field: 'draft',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
      colProps: {
        span: 12,
      },
      defaultValue: false,
      dynamicDisabled: true,
      ifShow: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};

// 列表页字段
export const sendStatusColumns = (enumMap?: object): BasicColumn[] => {
  return [
    {
      title: t('lamp.resources.smsSendStatus.telNum'),
      dataIndex: 'telNum',
      width: 120,
    },
    {
      title: t('lamp.resources.smsSendStatus.sendStatus'),
      dataIndex: 'sendStatus.desc',
      width: 100,
      filters: enumMap?.['SendStatus'],
    },
    {
      title: t('lamp.resources.smsSendStatus.bizId'),
      dataIndex: 'bizId',
    },
    {
      title: t('lamp.resources.smsSendStatus.ext'),
      dataIndex: 'ext',
      width: 180,
    },
    {
      title: t('lamp.resources.smsSendStatus.code'),
      dataIndex: 'code',
      width: 100,
    },
    {
      title: t('lamp.resources.smsSendStatus.message'),
      dataIndex: 'message',
    },
    {
      title: t('lamp.resources.smsSendStatus.fee'),
      dataIndex: 'fee',
      width: 80,
    },
    {
      title: t('lamp.common.createTime'),
      dataIndex: 'createTime',
      sorter: true,
      width: 180,
    },
  ];
};

export const sendStatusSearchFormSchema: FormSchema[] = [
  {
    label: t('lamp.resources.smsSendStatus.telNum'),
    field: 'telNum',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsSendStatus.bizId'),
    field: 'bizId',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsSendStatus.message'),
    field: 'message',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 5 },
  },
];
