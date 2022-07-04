import { Ref } from 'vue';
import { DictEnum } from '/@/enums/commonEnum';
import { dateUtil } from '/@/utils/dateUtil';
import { dictComponentProps } from '/@/utils/lamp/common';
import { stateComponentProps } from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendInterface.code'),
      dataIndex: 'code',
    },
    {
      title: t('basic.msg.extendInterface.name'),
      dataIndex: 'name',
    },
    {
      title: t('basic.msg.extendInterface.execMode'),
      dataIndex: ['echoMap', 'execMode'],
      key: 'execMode',
    },
    {
      title: t('basic.msg.extendInterface.script'),
      dataIndex: 'script',
    },
    {
      title: t('basic.msg.extendInterface.state'),
      dataIndex: 'state',
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
      label: t('basic.msg.extendInterface.code'),
      field: 'code',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterface.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterface.execMode'),
      field: 'execMode',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_INTERFACE_EXEC_MODE),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterface.script'),
      field: 'script',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterface.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(true),
      },
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
export const editFormSchema = (_type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('basic.msg.extendInterface.code'),
      field: 'code',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterface.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterface.execMode'),
      field: 'execMode',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_INTERFACE_EXEC_MODE),
      },
    },
    {
      label: t('basic.msg.extendInterface.script'),
      field: 'script',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterface.state'),
      field: 'state',
      component: 'RadioGroup',
      componentProps: {
        ...stateComponentProps(),
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
