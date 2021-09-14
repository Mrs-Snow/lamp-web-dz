import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { EnumEnum } from '/@/enums/commonEnum';
import { enumComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.resources.smsTemplate.providerType'),
    dataIndex: 'providerType.desc',
    width: 120,
  },
  {
    title: t('lamp.resources.smsTemplate.appId'),
    dataIndex: 'appId',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTemplate.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTemplate.templateCode'),
    dataIndex: 'templateCode',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTemplate.signName'),
    dataIndex: 'signName',
    // width: 180,
  },
  {
    title: t('lamp.resources.smsTemplate.templateDescribe'),
    dataIndex: 'templateDescribe',
    // width: 180,
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: t('lamp.resources.smsTemplate.providerType'),
    field: 'providerType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.ProviderType),
    },
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsTemplate.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: t('lamp.resources.smsTemplate.signName'),
    field: 'signName',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 5 },
  },
];

// 编辑页字段
export const editFormSchema = (_): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.resources.smsTemplate.providerType'),
      field: 'providerType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.ProviderType),
      },
    },
    {
      label: t('lamp.resources.smsTemplate.appId'),
      field: 'appId',
      component: 'Input',
      helpMessage: ['阿里云：accessKeyId', '腾讯云：appid', '百度云：accessKeyId'],
    },
    {
      label: t('lamp.resources.smsTemplate.appSecret'),
      field: 'appSecret',
      component: 'Input',
      helpMessage: ['阿里云：secret', '腾讯云：appkey', '百度云：secretKey'],
    },
    {
      label: t('lamp.resources.smsTemplate.content'),
      field: 'content',
      component: 'Input',
      helpMessage: [
        '在第三方供应商处，配置的短信模板或短信内容',
        '百度云：使用 ${xx} 作为占位符',
        '阿里云：使用 ${xx} 作为占位符',
        '腾讯云：使用 {xx} 作为占位符',
      ],
    },
    {
      label: t('lamp.resources.smsTemplate.templateCode'),
      field: 'templateCode',
      component: 'Input',
      helpMessage: ['阿里云：templateCode', '腾讯云：templateId', '百度云：templateCode'],
    },
    {
      label: t('lamp.resources.smsTemplate.url'),
      field: 'url',
      component: 'Input',
      helpMessage: ['阿里云：无此参数', '腾讯云：无此参数', '百度云：无此参数'],
    },
    {
      label: t('lamp.resources.smsTemplate.name'),
      field: 'name',
      component: 'Input',
      helpMessage: ['建议跟第三方供应商配置的模板名称一致，便于查看'],
    },

    {
      label: t('lamp.resources.smsTemplate.signName'),
      field: 'signName',
      component: 'Input',
      helpMessage: ['阿里云：SignName', '腾讯云：sign', '百度云：InvokeId'],
    },
    {
      label: t('lamp.resources.smsTemplate.templateDescribe'),
      field: 'templateDescribe',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
