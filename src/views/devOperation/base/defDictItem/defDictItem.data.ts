import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { stateFilters, stateComponentProps } from '/@/utils/lamp/common';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/devOperation/base/defDictItem';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.base.defDictItem.key'),
      dataIndex: 'key',
    },
    {
      title: t('devOperation.base.defDictItem.name'),
      dataIndex: 'name',
    },
    {
      title: t('devOperation.base.defDict.state'),
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
      label: t('devOperation.base.defDictItem.key'),
      field: 'key',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('devOperation.base.defDictItem.name'),
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
      label: t('devOperation.base.defDictItem.parentId'),
      field: 'parentId',
      component: 'Input',
      show: false,
    },
    {
      label: t('devOperation.base.defDictItem.parentKey'),
      field: 'parentKey',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('devOperation.base.defDictItem.label'),
      field: 'parentName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('devOperation.base.defDictItem.key'),
      field: 'key',
      component: 'Input',
      dynamicDisabled: () => {
        return type.value === ActionEnum.EDIT;
      },
    },
    {
      label: t('devOperation.base.defDictItem.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('devOperation.base.defDictItem.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.base.defDictItem.remark'),
      field: 'remark',
      component: 'InputTextArea',
    },
    {
      label: t('devOperation.base.defDictItem.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
    },
    {
      label: t('devOperation.base.defDictItem.icon'),
      field: 'icon',
      component: 'IconPicker',
    },
    {
      label: t('devOperation.base.defDictItem.cssStyle'),
      field: 'cssStyle',
      component: 'Input',
    },
    {
      label: t('devOperation.base.defDictItem.cssClass'),
      field: 'cssClass',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (
  type: Ref<ActionEnum>,
  getFieldsValue: () => Recordable,
): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'key',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
          async validator(_, value) {
            if (type.value === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (await check(value, getFieldsValue()?.parentId)) {
              return Promise.reject(t('devOperation.base.defDict.key') + '已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
