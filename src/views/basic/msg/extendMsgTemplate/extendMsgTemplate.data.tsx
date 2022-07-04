import { Ref } from 'vue';
import { DictEnum } from '/@/enums/commonEnum';
import { dateUtil } from '/@/utils/dateUtil';
import { dictComponentProps } from '/@/utils/lamp/common';
import { yesNoComponentProps } from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendMsgTemplate.type'),
      dataIndex: ['echoMap', 'type'],
      key: 'type',
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
      title: t('basic.msg.extendMsgTemplate.content'),
      dataIndex: 'content',
    },
    {
      title: t('basic.msg.extendMsgTemplate.script'),
      dataIndex: 'script',
    },
    {
      title: t('basic.msg.extendMsgTemplate.param'),
      dataIndex: 'param',
    },
    {
      title: t('basic.msg.extendMsgTemplate.remarks'),
      dataIndex: 'remarks',
    },
    {
      title: t('basic.msg.extendMsgTemplate.target'),
      dataIndex: ['echoMap', 'target'],
      key: 'target',
    },
    {
      title: t('basic.msg.extendMsgTemplate.autoRead'),
      dataIndex: 'autoRead',
    },
    {
      title: t('basic.msg.extendMsgTemplate.remindMode'),
      dataIndex: ['echoMap', 'remindMode'],
      key: 'remindMode',
    },
    {
      title: t('basic.msg.extendMsgTemplate.url'),
      dataIndex: 'url',
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
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_System_MSG_TYPE = 'MSG_TYPE';
        // 'MSG_TYPE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_System_MSG_TYPE),
        ...dictComponentProps('MSG_TYPE'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.code'),
      field: 'code',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.title'),
      field: 'title',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.content'),
      field: 'content',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.script'),
      field: 'script',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.param'),
      field: 'param',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.target'),
      field: 'target',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_NOTICE_TARGET = 'NOTICE_TARGET';
        // 'NOTICE_TARGET' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_TARGET),
        ...dictComponentProps('NOTICE_TARGET'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.autoRead'),
      field: 'autoRead',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.remindMode'),
      field: 'remindMode',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_NOTICE_REMIND_MODE = 'NOTICE_REMIND_MODE';
        // 'NOTICE_REMIND_MODE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_REMIND_MODE),
        ...dictComponentProps('NOTICE_REMIND_MODE'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendMsgTemplate.url'),
      field: 'url',
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
      label: t('basic.msg.extendMsgTemplate.type'),
      field: 'type',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_System_MSG_TYPE = 'MSG_TYPE';
        // 'MSG_TYPE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_System_MSG_TYPE),
        ...dictComponentProps('MSG_TYPE'),
      },
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
    {
      label: t('basic.msg.extendMsgTemplate.param'),
      field: 'param',
      component: 'Input',
    },
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
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_NOTICE_TARGET = 'NOTICE_TARGET';
        // 'NOTICE_TARGET' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_TARGET),
        ...dictComponentProps('NOTICE_TARGET'),
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
    },
    {
      label: t('basic.msg.extendMsgTemplate.remindMode'),
      field: 'remindMode',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Base_NOTICE_REMIND_MODE = 'NOTICE_REMIND_MODE';
        // 'NOTICE_REMIND_MODE' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Base_NOTICE_REMIND_MODE),
        ...dictComponentProps('NOTICE_REMIND_MODE'),
      },
    },
    {
      label: t('basic.msg.extendMsgTemplate.url'),
      field: 'url',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
