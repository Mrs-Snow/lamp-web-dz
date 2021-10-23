import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { yesNoComponentProps } from '/@/utils/lamp/common';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.system.baseRole.type'),
      dataIndex: 'type',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.name'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.code'),
      dataIndex: 'code',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.remarks'),
      dataIndex: 'remarks',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.state'),
      dataIndex: 'state',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.readonly'),
      dataIndex: 'readonly',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.dsType'),
      dataIndex: 'dsType.desc',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.orgId'),
      dataIndex: 'orgId',
      // width: 180,
    },
    {
      title: t('basic.system.baseRole.label'),
      dataIndex: 'label',
    },
    {
      title: t('basic.system.baseRole.sortValue'),
      dataIndex: 'sortValue',
      width: 40,
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
      field: 'createTimeRange',
      label: t('lamp.common.createdTime'),
      component: 'RangePicker',
      colProps: { span: 6 },
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
      label: t('basic.system.baseRole.label'),
      field: 'label',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.type'),
      field: 'type',
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
      label: t('basic.system.baseRole.code'),
      field: 'code',
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
        ...yesNoComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('basic.system.baseRole.readonly'),
      field: 'readonly',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
      defaultValue: true,
    },
    // {
    //   label: t('basic.system.baseRole.dsType'),
    //   field: 'dsType',
    //   component: 'Input',
    //   dynamicDisabled: () => {
    //     return [ActionEnum.VIEW].includes(type.value);
    //   },
    //   componentProps: {
    //     ...enumComponentProps(EnumEnum.),
    //   },
    // },
    {
      label: t('basic.system.baseRole.orgId'),
      field: 'orgId',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
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
