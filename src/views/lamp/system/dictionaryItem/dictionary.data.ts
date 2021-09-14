import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { ActionEnum } from '/@/enums/commonEnum';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.system.dictionary.type'),
    dataIndex: 'type',
    width: 100,
  },
  {
    title: t('lamp.system.dictionary.label'),
    dataIndex: 'label',
    width: 100,
  },
  {
    title: t('lamp.system.dictionary.code'),
    dataIndex: 'code',
    // width: 180,
  },
  {
    title: t('lamp.system.dictionary.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('lamp.system.dictionary.state'),
    dataIndex: 'state',
    width: 80,
    format: (text) => {
      return text ? t('lamp.common.enable') : t('lamp.common.disable');
    },
  },
  {
    title: t('lamp.system.dictionary.describe'),
    dataIndex: 'describe',
    // width: 180,
  },
  {
    title: t('lamp.system.dictionary.sortValue'),
    dataIndex: 'sortValue',
    width: 100,
  },
  {
    title: t('lamp.system.dictionary.readonly'),
    dataIndex: 'readonly',
    width: 80,
    format: (text: string) => {
      return text ? t('lamp.common.yes') : t('lamp.common.no');
    },
  },
  {
    title: t('lamp.common.createdTime'),
    dataIndex: 'createdTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'createTimeRange',
    label: t('lamp.common.createdTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

// 编辑页字段
export const editFormSchema = (type): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.system.dictionary.type'),
      field: 'type',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.system.dictionary.label'),
      field: 'label',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.system.dictionary.code'),
      field: 'code',
      component: 'Input',
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      label: t('lamp.system.dictionary.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('lamp.system.dictionary.state'),
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
      label: t('lamp.system.dictionary.describe'),
      field: 'describe',
      component: 'Input',
    },

    {
      label: t('lamp.system.dictionary.icon'),
      field: 'icon',
      component: 'IconPicker',
    },
    {
      label: t('lamp.system.dictionary.cssStyle'),
      field: 'cssStyle',
      component: 'Input',
    },
    {
      label: t('lamp.system.dictionary.cssClass'),
      field: 'cssClass',
      component: 'Input',
    },
    {
      label: t('lamp.system.dictionary.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
      colProps: { span: 12 },
    },
    {
      label: t('lamp.system.dictionary.readonly'),
      field: 'readonly',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
      defaultValue: true,
      colProps: { span: 12 },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
