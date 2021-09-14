import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.system.parameter.key'),
    dataIndex: 'key',
    // width: 180,
  },
  {
    title: t('lamp.system.parameter.value'),
    dataIndex: 'value',
    // width: 180,
  },
  {
    title: t('lamp.system.parameter.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('lamp.system.parameter.describe'),
    dataIndex: 'describe',
    // width: 180,
  },
  {
    title: t('lamp.system.parameter.state'),
    dataIndex: 'state',
    width: 80,
    format: (text: string) => {
      return text ? t('lamp.common.enable') : t('lamp.common.disable');
    },
  },
  {
    title: t('lamp.system.parameter.readonly'),
    dataIndex: 'readonly',
    width: 80,
    format: (text: string) => {
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
    label: t('lamp.system.parameter.key'),
    field: 'key',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('lamp.system.parameter.value'),
    field: 'value',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('lamp.system.parameter.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: t('lamp.system.parameter.describe'),
    field: 'describe',
    component: 'Input',
    colProps: { span: 6 },
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
    label: t('lamp.system.parameter.key'),
    field: 'key',
    component: 'Input',
  },
  {
    label: t('lamp.system.parameter.value'),
    field: 'value',
    component: 'Input',
  },
  {
    label: t('lamp.system.parameter.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('lamp.system.parameter.describe'),
    field: 'describe',
    component: 'Input',
  },
  {
    label: t('lamp.system.parameter.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.yes'), value: true },
        { label: t('lamp.common.no'), value: false },
      ],
    },
    defaultValue: true,
  },
  {
    label: t('lamp.system.parameter.readonly'),
    field: 'readonly',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.yes'), value: true },
        { label: t('lamp.common.no'), value: false },
      ],
    },
    defaultValue: false,
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
