import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { stateComponentProps } from '/@/utils/lamp/common';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.system.baseRole.name'),
      dataIndex: 'name',
      // width: 180,
    },
  ];
};

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'name',
      label: t('basic.system.baseRole.name'),
      component: 'Input',
      colProps: { span: 12 },
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
      label: t('basic.system.baseRole.code'),
      field: 'code',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.name'),
      field: 'name',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.remarks'),
      field: 'remarks',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
