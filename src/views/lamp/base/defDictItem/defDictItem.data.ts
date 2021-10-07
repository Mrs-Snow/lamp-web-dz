import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { dictComponentProps, stateFilters, stateComponentProps } from '/@/utils/lamp/common';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('lamp.base.defDictItem.key'),
      dataIndex: 'key',
      // width: 180,
    },
    {
      title: t('lamp.base.defDictItem.name'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('lamp.base.defDictItem.classify'),
      dataIndex: 'echoMap.classify',
      width: 120,
    },
    {
      title: t('lamp.base.defDict.state'),
      dataIndex: 'state',
      width: 100,
      filters: [...stateFilters()],
      format: (text) => {
        return text ? t('lamp.common.enable') : t('lamp.common.disable');
      },
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
      label: t('lamp.base.defDictItem.classify'),
      field: 'classify',
      component: 'ApiSelect',
      colProps: { span: 6 },
      componentProps: {
        ...dictComponentProps(DictEnum.DICT_CLASSIFY),
      },
    },
    {
      label: t('lamp.base.defDictItem.key'),
      field: 'key',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('lamp.base.defDictItem.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 6 },
    },
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
      label: t('lamp.base.defDictItem.parentId'),
      field: 'parentId',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.base.defDictItem.parentKey'),
      field: 'parentKey',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.base.defDictItem.label'),
      field: 'parentName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.base.defDictItem.classify'),
      field: 'classify',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.DICT_CLASSIFY),
      },
    },
    {
      label: t('lamp.base.defDictItem.key'),
      field: 'key',
      component: 'Input',
      dynamicDisabled: () => {
        return type.value === ActionEnum.EDIT;
      },
    },
    {
      label: t('lamp.base.defDictItem.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('lamp.base.defDictItem.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('lamp.base.defDictItem.remark'),
      field: 'remark',
      component: 'InputTextArea',
    },
    {
      label: t('lamp.base.defDictItem.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
    },
    {
      label: t('lamp.base.defDictItem.icon'),
      field: 'icon',
      component: 'IconPicker',
    },
    {
      label: t('lamp.base.defDictItem.cssStyle'),
      field: 'cssStyle',
      component: 'Input',
    },
    {
      label: t('lamp.base.defDictItem.cssClass'),
      field: 'cssClass',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
