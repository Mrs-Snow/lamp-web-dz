import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();

// 编辑页字段
export const editFormSchema = (_): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.application.defResource.label'),
      field: 'label',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.applicationId'),
      field: 'applicationId',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.code'),
      field: 'code',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.resourceType'),
      field: 'resourceType',
      component: 'ApiSelect',
    },
    {
      label: t('lamp.application.defResource.describe'),
      field: 'describe',
      component: 'InputTextArea',
    },
    {
      label: t('lamp.application.defResource.path'),
      field: 'path',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.component'),
      field: 'component',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.redirect'),
      field: 'redirect',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.icon'),
      field: 'icon',
      component: 'IconPicker',
    },
    {
      label: t('lamp.application.defResource.isGeneral'),
      field: 'isGeneral',
      component: 'Checkbox',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
    },
    {
      label: t('lamp.application.defResource.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
    },
    {
      label: t('lamp.application.defResource.subGroup'),
      field: 'subGroup',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.fieldIsSecret'),
      field: 'fieldIsSecret',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
    },
    {
      label: t('lamp.application.defResource.fieldIsEdit'),
      field: 'fieldIsEdit',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
    },
    {
      label: t('lamp.application.defResource.apiController'),
      field: 'apiController',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.apiSpringApplicationName'),
      field: 'apiSpringApplicationName',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.apiRequestMethod'),
      field: 'apiRequestMethod',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.metaJson'),
      field: 'metaJson',
      component: 'Input',
    },
    {
      label: t('lamp.application.defResource.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
