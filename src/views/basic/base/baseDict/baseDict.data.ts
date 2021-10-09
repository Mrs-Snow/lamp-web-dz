import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/basic/base/baseDict';
import { stateFilters, stateComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.base.baseDict.key'),
      dataIndex: 'key',
      // width: 180,
    },
    {
      title: t('basic.base.baseDict.name'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('basic.base.baseDict.state'),
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
    // {
    //   label: t('basic.base.baseDictItem.classify'),
    //   field: 'classify',
    //   component: 'ApiSelect',
    //   colProps: { span: 6 },
    //   componentProps: {
    //     ...dictComponentProps(DictEnum.DICT_CLASSIFY),
    //     mode: 'multiple',
    //   },
    // },
    {
      label: t('basic.base.baseDict.key'),
      field: 'key',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.base.baseDict.name'),
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
      label: t('basic.base.baseDict.key'),
      field: 'key',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.EDIT, ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.base.baseDict.name'),
      field: 'name',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.base.baseDict.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.base.baseDict.remark'),
      field: 'remark',
      component: 'InputTextArea',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (type: Ref<ActionEnum>): Partial<FormSchemaExt>[] => {
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
            if (await check(value)) {
              return Promise.reject(t('basic.base.baseDict.key') + '已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
