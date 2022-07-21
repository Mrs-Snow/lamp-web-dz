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
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { MsgTemplateTypeEnum } from '/@/enums/biz/base';
import { check } from '/@/api/devOperation/msg/defMsgTemplate';
import { query } from '/@/api/devOperation/msg/defInterface';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.msg.defMsgTemplate.type'),
      dataIndex: ['echoMap', 'type'],
      key: 'type',
      width: 100,
    },
    {
      title: t('devOperation.msg.defMsgTemplate.state'),
      dataIndex: 'state',
      width: 80,
      customRender: ({ record }) => {
        const text = record.state ? t('lamp.common.enable') : t('lamp.common.disable');
        const color = record.state ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: t('devOperation.msg.defMsgTemplate.code'),
      dataIndex: 'code',
    },
    {
      title: t('devOperation.msg.defMsgTemplate.name'),
      dataIndex: 'name',
    },
    {
      title: t('devOperation.msg.defMsgTemplate.title'),
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
      label: t('devOperation.msg.defMsgTemplate.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictAllComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
      },
      colProps: { span: 8 },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.code'),
      field: 'code',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(true),
      },
      colProps: { span: 8 },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.title'),
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
      label: t('devOperation.msg.defMsgTemplate.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
      },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.interfaceId'),
      field: 'interfaceId',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.msg.defMsgTemplate.code'),
      field: 'code',
      component: 'Input',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.title'),
      field: 'title',
      component: 'Input',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.sign'),
      field: 'sign',
      component: 'Input',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.content'),
      field: 'content',
      component: 'Input',
      slot: 'content',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.script'),
      field: 'script',
      component: 'Input',
      slot: 'script',
    },
    // {
    //   label: t('devOperation.msg.defMsgTemplate.param'),
    //   field: 'param',
    //   component: 'Input',
    // },
    {
      label: t('devOperation.msg.defMsgTemplate.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
    },
    {
      label: t('devOperation.msg.defMsgTemplate.templateCode'),
      field: 'templateCode',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.SMS;
      },
    },
    {
      label: t('devOperation.msg.defMsgTemplate.target'),
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
      label: t('devOperation.msg.defMsgTemplate.autoRead'),
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
      label: t('devOperation.msg.defMsgTemplate.remindMode'),
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
      label: t('devOperation.msg.defMsgTemplate.url'),
      field: 'url',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.type === MsgTemplateTypeEnum.NOTICE;
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (
  _type: Ref<ActionEnum>,
  getFieldsValue: () => Recordable,
): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
          async validator(_, value) {
            if (value && (await check(value, getFieldsValue()?.id))) {
              return Promise.reject(t('devOperation.msg.defMsgTemplate.code') + '已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
