import { Ref } from 'vue';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { dictComponentProps, stateComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();

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
      field: 'parentId',
      label: 'parentId',
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
      label: t('basic.user.baseOrg.name'),
      field: 'name',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.user.baseOrg.type'),
      field: 'type',
      component: 'ApiRadioGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      defaultValue: '02',
      componentProps: {
        ...dictComponentProps(DictEnum.ORG_TYPE),
        isBtn: true,
      },
    },
    {
      label: t('basic.user.baseOrg.shortName'),
      field: 'shortName',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.user.baseOrg.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      defaultValue: true,
      componentProps: {
        ...stateComponentProps(),
      },
    },
    {
      label: t('basic.user.baseOrg.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.user.baseOrg.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
