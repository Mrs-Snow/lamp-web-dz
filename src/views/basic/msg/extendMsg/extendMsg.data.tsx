import { Ref } from 'vue';
import { DictEnum } from '/@/enums/commonEnum';
import { EnumEnum } from '/@/enums/commonEnum';
import { dateUtil } from '/@/utils/dateUtil';
import { dictComponentProps } from '/@/utils/lamp/common';
import { enumComponentProps } from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendMsg.templateId'),
      dataIndex: 'templateId',
    },
    {
      title: t('basic.msg.extendMsg.type'),
      dataIndex: ['echoMap', 'type'],
      key: 'type',
    },
    {
      title: t('basic.msg.extendMsg.status'),
      dataIndex: ['echoMap', 'status'],
      key: 'status',
    },
    {
      title: t('basic.msg.extendMsg.channel'),
      dataIndex: ['echoMap', 'channel'],
      key: 'channel',
    },
    {
      title: t('basic.msg.extendMsg.param'),
      dataIndex: 'param',
    },
    {
      title: t('basic.msg.extendMsg.title'),
      dataIndex: 'title',
    },
    {
      title: t('basic.msg.extendMsg.content'),
      dataIndex: 'content',
    },
    {
      title: t('basic.msg.extendMsg.sendTime'),
      dataIndex: 'sendTime',
    },
    {
      title: t('basic.msg.extendMsg.bizId'),
      dataIndex: 'bizId',
    },
    {
      title: t('basic.msg.extendMsg.bizType'),
      dataIndex: 'bizType',
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
      label: t('basic.msg.extendMsg.templateId'),
      field: 'templateId',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.type'),
      field: 'type',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_MSG_TEMPLATE_TYPE = 'MSG_TEMPLATE_TYPE';
        // 'MSG_TEMPLATE_TYPE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
        ...dictComponentProps('MSG_TEMPLATE_TYPE'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.status'),
      field: 'status',
      component: 'ApiRadioGroup',
      componentProps: {
        // 生成的 EnumEnum 常量不存在时，请自行在 EnumEnum 中添加: TaskStatus = 'TaskStatus',
        // 请确保后端方法：OauthGeneralController#findEnumListByType 能扫描到后端的枚举类： TaskStatus，否则无法回显！
        // ...enumComponentProps(EnumEnum.TaskStatus),
        ...enumComponentProps('TaskStatus'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.channel'),
      field: 'channel',
      component: 'ApiRadioGroup',
      componentProps: {
        // 生成的 EnumEnum 常量不存在时，请自行在 EnumEnum 中添加: SourceType = 'SourceType',
        // 请确保后端方法：OauthGeneralController#findEnumListByType 能扫描到后端的枚举类： SourceType，否则无法回显！
        // ...enumComponentProps(EnumEnum.SourceType),
        ...enumComponentProps('SourceType'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.param'),
      field: 'param',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.title'),
      field: 'title',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.content'),
      field: 'content',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.sendTime'),
      field: 'sendTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.bizId'),
      field: 'bizId',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsg.bizType'),
      field: 'bizType',
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
export const editFormSchema = (_type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('basic.msg.extendMsg.templateId'),
      field: 'templateId',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsg.type'),
      field: 'type',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_MSG_TEMPLATE_TYPE = 'MSG_TEMPLATE_TYPE';
        // 'MSG_TEMPLATE_TYPE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_MSG_TEMPLATE_TYPE),
        ...dictComponentProps('MSG_TEMPLATE_TYPE'),
      },
    },
    {
      label: t('basic.msg.extendMsg.status'),
      field: 'status',
      component: 'ApiRadioGroup',
      componentProps: {
        // 生成的 EnumEnum 常量不存在时，请自行在 EnumEnum 中添加: TaskStatus = 'TaskStatus',
        // 请确保后端方法：OauthGeneralController#findEnumListByType 能扫描到后端的枚举类： TaskStatus，否则无法回显！
        // ...enumComponentProps(EnumEnum.TaskStatus),
        ...enumComponentProps('TaskStatus'),
      },
    },
    {
      label: t('basic.msg.extendMsg.channel'),
      field: 'channel',
      component: 'ApiRadioGroup',
      componentProps: {
        // 生成的 EnumEnum 常量不存在时，请自行在 EnumEnum 中添加: SourceType = 'SourceType',
        // 请确保后端方法：OauthGeneralController#findEnumListByType 能扫描到后端的枚举类： SourceType，否则无法回显！
        // ...enumComponentProps(EnumEnum.SourceType),
        ...enumComponentProps('SourceType'),
      },
    },
    {
      label: t('basic.msg.extendMsg.param'),
      field: 'param',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsg.title'),
      field: 'title',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsg.content'),
      field: 'content',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsg.sendTime'),
      field: 'sendTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('basic.msg.extendMsg.bizId'),
      field: 'bizId',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendMsg.bizType'),
      field: 'bizType',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
