import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/devOperation/base/defDict';
import { stateFilters, stateComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.base.defDict.key'),
      dataIndex: 'key',
    },
    {
      title: t('devOperation.base.defDict.name'),
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
      label: t('devOperation.base.defDict.key'),
      field: 'key',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('devOperation.base.defDict.name'),
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
      label: t('devOperation.base.defDict.key'),
      field: 'key',
      component: 'Input',
      dynamicDisabled: () => {
        return type.value === ActionEnum.EDIT;
      },
    },
    {
      label: t('devOperation.base.defDict.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('devOperation.base.defDict.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.base.defDict.remark'),
      field: 'remark',
      component: 'InputTextArea',
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
              return Promise.reject(t('devOperation.base.defDict.key') + '已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
