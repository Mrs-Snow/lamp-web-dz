import { Ref } from 'vue';
import { DictEnum } from '/@/enums/commonEnum';
import { dictAllComponentProps, dictComponentProps } from '/@/utils/lamp/common';
import { stateComponentProps } from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { InterfaceExecModeEnum } from '/@/enums/biz/base';

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
      title: t('basic.msg.extendInterface.state'),
      dataIndex: 'state',
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
      label: t('basic.msg.extendInterface.code'),
      field: 'code',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendInterface.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendInterface.execMode'),
      field: 'execMode',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictAllComponentProps(DictEnum.EchoDictType_Base_INTERFACE_EXEC_MODE),
        isBtn: true,
      },
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendInterface.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(true),
      },
      colProps: { span: 8 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createdTime'),
      component: 'RangePicker',
      colProps: { span: 8 },
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
        isBtn: true,
      },
      defaultValue: InterfaceExecModeEnum.IMPL_CLASS,
    },
    {
      label: t('basic.msg.extendInterface.implClass'),
      field: 'implClass',
      component: 'Input',
      itemProps: {
        extra: '代码中存在的由Spring管理的实现类',
      },
      ifShow: ({ values }) => {
        return values.execMode === InterfaceExecModeEnum.IMPL_CLASS;
      },
    },
    {
      label: t('basic.msg.extendInterface.script'),
      field: 'script',
      component: 'Input',
      slot: 'script',
      itemProps: {
        extra: 'groovy 脚本',
      },
      ifShow: ({ values }) => {
        return values.execMode === InterfaceExecModeEnum.SCRIPT;
      },
    },
    {
      label: t('basic.msg.extendInterface.state'),
      field: 'state',
      component: 'RadioGroup',
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
