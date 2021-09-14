import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.system.dictionary.type'),
    dataIndex: 'type',
    // width: 180,
  },
  {
    title: t('lamp.system.dictionary.label'),
    dataIndex: 'label',
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
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'label',
    label: '关键词',
    component: 'Input',
    colProps: { span: 5 },
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
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      label: t('lamp.system.dictionary.label'),
      field: 'label',
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
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
