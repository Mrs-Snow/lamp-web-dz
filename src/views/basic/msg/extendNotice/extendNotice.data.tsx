import { Ref } from 'vue';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { dateUtil } from '/@/utils/dateUtil';
import {
  dictAllComponentProps,
  dictComponentProps,
  yesNoComponentProps,
} from '/@/utils/lamp/common';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendNotice.remindMode'),
      dataIndex: ['echoMap', 'remindMode'],
      key: 'remindMode',
      width: 120,
    },
    {
      title: t('basic.msg.extendNotice.isRead'),
      dataIndex: 'isRead',
      width: 100,
      format: (text) => {
        return text ? t('lamp.common.yes') : t('lamp.common.no');
      },
    },
    {
      title: t('basic.msg.extendNotice.title'),
      dataIndex: 'title',
    },
    {
      title: t('basic.msg.extendNotice.author'),
      dataIndex: 'author',
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
      label: t('basic.msg.extendNotice.title'),
      field: 'title',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendNotice.author'),
      field: 'author',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendNotice.remindMode'),
      field: 'remindMode',
      component: 'ApiSelect',
      componentProps: {
        ...dictAllComponentProps(DictEnum.EchoDictType_Base_NOTICE_REMIND_MODE),
      },
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.extendNotice.isRead'),
      field: 'isRead',
      component: 'RadioButtonGroup',
      componentProps: {
        ...yesNoComponentProps(true),
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
      label: t('basic.msg.extendNotice.bizId'),
      field: 'bizId',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.bizType'),
      field: 'bizType',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.recipientId'),
      field: 'recipientId',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.remindMode'),
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
      label: t('basic.msg.extendNotice.title'),
      field: 'title',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.content'),
      field: 'content',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.author'),
      field: 'author',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.url'),
      field: 'url',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendNotice.target'),
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
      label: t('basic.msg.extendNotice.autoRead'),
      field: 'autoRead',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
    },
    {
      label: t('basic.msg.extendNotice.handleTime'),
      field: 'handleTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('basic.msg.extendNotice.readTime'),
      field: 'readTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('basic.msg.extendNotice.isRead'),
      field: 'isRead',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        ...yesNoComponentProps(),
      },
    },
    {
      label: t('basic.msg.extendNotice.isHandle'),
      field: 'isHandle',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        ...yesNoComponentProps(),
      },
    },
    {
      label: t('basic.msg.extendNotice.createdOrgId'),
      field: 'createdOrgId',
      component: 'Input',
      defaultValue: '0',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
