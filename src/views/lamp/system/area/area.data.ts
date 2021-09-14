import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { dictComponentProps } from '/@/utils/lamp/common';
import { DictEnum } from '/@/enums/commonEnum';

const { t } = useI18n();

// 编辑页字段
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentId',
    label: 'parentId',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentName',
    defaultValue: '根节点',
    label: t('lamp.system.area.parentId'),
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.area.label'),
    field: 'label',
    component: 'Input',
  },
  {
    label: t('lamp.system.area.code'),
    field: 'code',
    component: 'Input',
  },
  {
    label: t('lamp.system.area.fullName'),
    field: 'fullName',
    component: 'Input',
  },

  {
    label: t('lamp.system.area.level'),
    field: 'level',
    component: 'Input',
  },
  {
    label: t('lamp.system.area.source'),
    field: 'source',
    component: 'ApiSelect',
    componentProps: {
      ...dictComponentProps(DictEnum.AREA_LEVEL),
    },
  },
  {
    label: t('lamp.system.area.longitude'),
    field: 'longitude',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: t('lamp.system.area.latitude'),
    field: 'latitude',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: t('lamp.system.area.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.yes'), value: true },
        { label: t('lamp.common.no'), value: false },
      ],
    },
    defaultValue: true,
    colProps: {
      span: 12,
    },
  },
  {
    label: t('lamp.system.area.sortValue'),
    field: 'sortValue',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
