import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { DictEnum } from '/@/enums/commonEnum';
import { dictComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentName',
    defaultValue: '根节点',
    label: t('lamp.org.org.parentId'),
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'type',
    label: t('lamp.org.org.type'),
    component: 'ApiSelect',
    defaultValue: '02',
    componentProps: {
      ...dictComponentProps(DictEnum.ORG_TYPE),
    },
  },
  {
    field: 'label',
    label: t('lamp.org.org.label'),
    component: 'Input',
  },
  {
    field: 'abbreviation',
    label: t('lamp.org.org.abbreviation'),
    component: 'Input',
  },
  {
    label: t('lamp.org.org.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: t('lamp.common.enable'), value: true },
        { label: t('lamp.common.disable'), value: false },
      ],
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'sortValue',
    label: t('lamp.org.org.sortValue'),
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'parentId',
    defaultValue: 0,
    label: t('lamp.org.org.parentId'),
    component: 'Input',
    show: false,
  },
  {
    label: t('lamp.org.org.describe'),
    field: 'describe',
    component: 'InputTextArea',
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
