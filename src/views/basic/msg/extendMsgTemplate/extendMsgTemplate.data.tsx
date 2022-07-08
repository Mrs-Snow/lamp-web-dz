import { Ref } from 'vue';
import { Tag } from 'ant-design-vue';
import { DictEnum } from '/@/enums/commonEnum';
import {
  dictComponentProps,
  dictAllComponentProps,
  stateComponentProps,
} from '/@/utils/lamp/common';
import { yesNoComponentProps } from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { MsgTemplateTypeEnum } from '/@/enums/biz/base';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendMsgTemplate.type'),
      dataIndex: ['echoMap', 'type'],
      key: 'type',
      width: 100,
    },
    {
      title: t('basic.msg.extendMsgTemplate.state'),
      dataIndex: 'state',
      width: 80,
      customRender: ({ record }) => {
        const text = record.state ? t('lamp.common.enable') : t('lamp.common.disable');
        const color = record.state ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: t('basic.msg.extendMsgTemplate.code'),
      dataIndex: 'code',
    },
    {
      title: t('basic.msg.extendMsgTemplate.name'),
      dataIndex: 'name',
    },
    {
      title: t('basic.msg.extendMsgTemplate.title'),
      dataIndex: 'title',
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
      label: t('basic.msg.extendMsgTemplate.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictAllComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
      },
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.code'),
      field: 'code',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(true),
      },
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.title'),
      field: 'title',
      component: 'Input',
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
      label: t('basic.msg.extendMsgTemplate.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
      },
    },
    {
      label: t('basic.msg.extendMsgTemplate.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('basic.msg.extendMsgTemplate.code'),
      field: 'code',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsgTemplate.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsgTemplate.title'),
      field: 'title',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsgTemplate.content'),
      field: 'content',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsgTemplate.script'),
      field: 'script',
      component: 'Input',
    },
    // {
    //   label: t('basic.msg.extendMsgTemplate.param'),
    //   field: 'param',
    //   component: 'Input',
    // },
    {
      label: t('basic.msg.extendMsgTemplate.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
    },
    {
      label: t('basic.msg.extendMsgTemplate.target'),
      field: 'target',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_TARGET),
      },
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.NOTICE;
      },
    },
    {
      label: t('basic.msg.extendMsgTemplate.autoRead'),
      field: 'autoRead',
      component: 'RadioGroup',
      defaultValue: true,
      componentProps: {
        ...yesNoComponentProps(),
      },
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.NOTICE;
      },
    },
    {
      label: t('basic.msg.extendMsgTemplate.remindMode'),
      field: 'remindMode',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_REMIND_MODE),
      },
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.NOTICE;
      },
    },
    {
      label: t('basic.msg.extendMsgTemplate.url'),
      field: 'url',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.NOTICE;
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
