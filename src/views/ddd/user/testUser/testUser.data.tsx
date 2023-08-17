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
      title: t('ddd.user.testUser.username'),
      dataIndex: 'username',
    },
    {
      title: t('ddd.user.testUser.nickName'),
      dataIndex: 'nickName',
    },
    {
      title: t('ddd.user.testUser.email'),
      dataIndex: 'email',
    },
    {
      title: t('ddd.user.testUser.mobile'),
      dataIndex: 'mobile',
    },
    {
      title: t('ddd.user.testUser.idCard'),
      dataIndex: 'idCard',
    },
    {
      title: t('ddd.user.testUser.wxOpenId'),
      dataIndex: 'wxOpenId',
    },
    {
      title: t('ddd.user.testUser.ddOpenId'),
      dataIndex: 'ddOpenId',
    },
    {
      title: t('ddd.user.testUser.readonly'),
      dataIndex: 'readonly',
    },
    {
      title: t('ddd.user.testUser.nation'),
      dataIndex: ['echoMap', 'nation'],
      key: 'nation',
    },
    {
      title: t('ddd.user.testUser.education'),
      dataIndex: ['echoMap', 'education'],
      key: 'education',
    },
    {
      title: t('ddd.user.testUser.sex'),
      dataIndex: ['echoMap', 'sex'],
      key: 'sex',
    },
    {
      title: t('ddd.user.testUser.state'),
      dataIndex: 'state',
    },
    {
      title: t('ddd.user.testUser.workDescribe'),
      dataIndex: 'workDescribe',
    },
    {
      title: t('ddd.user.testUser.passwordErrorLastTime'),
      dataIndex: 'passwordErrorLastTime',
    },
    {
      title: t('ddd.user.testUser.passwordErrorNum'),
      dataIndex: 'passwordErrorNum',
    },
    {
      title: t('ddd.user.testUser.passwordExpireTime'),
      dataIndex: 'passwordExpireTime',
    },
    {
      title: t('ddd.user.testUser.password'),
      dataIndex: 'password',
    },
    {
      title: t('ddd.user.testUser.salt'),
      dataIndex: 'salt',
    },
    {
      title: t('ddd.user.testUser.lastLoginTime'),
      dataIndex: 'lastLoginTime',
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
      label: t('ddd.user.testUser.username'),
      field: 'username',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.nickName'),
      field: 'nickName',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.email'),
      field: 'email',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.mobile'),
      field: 'mobile',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.idCard'),
      field: 'idCard',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.wxOpenId'),
      field: 'wxOpenId',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.ddOpenId'),
      field: 'ddOpenId',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.readonly'),
      field: 'readonly',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.nation'),
      field: 'nation',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_NATION = 'NATION';
        // 'NATION' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_NATION),
        ...dictComponentProps('NATION'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.education'),
      field: 'education',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_EDUCATION = 'EDUCATION';
        // 'EDUCATION' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_EDUCATION),
        ...dictComponentProps('EDUCATION'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.sex'),
      field: 'sex',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_SEX = 'SEX';
        // 'SEX' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_SEX),
        ...dictComponentProps('SEX'),
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.state'),
      field: 'state',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.workDescribe'),
      field: 'workDescribe',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.passwordErrorLastTime'),
      field: 'passwordErrorLastTime',
      component: 'InputPassword',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.passwordErrorNum'),
      field: 'passwordErrorNum',
      component: 'InputPassword',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.passwordExpireTime'),
      field: 'passwordExpireTime',
      component: 'InputPassword',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.password'),
      field: 'password',
      component: 'InputPassword',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.salt'),
      field: 'salt',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('ddd.user.testUser.lastLoginTime'),
      field: 'lastLoginTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
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
      label: t('ddd.user.testUser.username'),
      field: 'username',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.nickName'),
      field: 'nickName',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.email'),
      field: 'email',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.mobile'),
      field: 'mobile',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.idCard'),
      field: 'idCard',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.wxOpenId'),
      field: 'wxOpenId',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.ddOpenId'),
      field: 'ddOpenId',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.readonly'),
      field: 'readonly',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        ...yesNoComponentProps(),
      },
    },
    {
      label: t('ddd.user.testUser.nation'),
      field: 'nation',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_NATION = 'NATION';
        // 'NATION' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_NATION),
        ...dictComponentProps('NATION'),
      },
    },
    {
      label: t('ddd.user.testUser.education'),
      field: 'education',
      component: 'ApiRadioGroup',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_EDUCATION = 'EDUCATION';
        // 'EDUCATION' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_EDUCATION),
        ...dictComponentProps('EDUCATION'),
      },
    },
    {
      label: t('ddd.user.testUser.sex'),
      field: 'sex',
      component: 'ApiRadioGroup',
      defaultValue: '1',
      componentProps: {
        // 建议将魔法数参数移动到 DictEnum 中，并添加为: EchoDictType_Global_SEX = 'SEX';
        // 'SEX' 需要与 后端DictType类中的参数 以及 def_dict表中的key字段 保持一致，否则无法回显！
        // ...dictComponentProps(DictEnum.EchoDictType_Global_SEX),
        ...dictComponentProps('SEX'),
      },
    },
    {
      label: t('ddd.user.testUser.state'),
      field: 'state',
      component: 'RadioGroup',
      defaultValue: true,
      componentProps: {
        ...yesNoComponentProps(),
      },
    },
    {
      label: t('ddd.user.testUser.workDescribe'),
      field: 'workDescribe',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.passwordErrorLastTime'),
      field: 'passwordErrorLastTime',
      component: 'InputPassword',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('ddd.user.testUser.passwordErrorNum'),
      field: 'passwordErrorNum',
      component: 'InputPassword',
      defaultValue: '0',
    },
    {
      label: t('ddd.user.testUser.passwordExpireTime'),
      field: 'passwordExpireTime',
      component: 'InputPassword',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      label: t('ddd.user.testUser.password'),
      field: 'password',
      component: 'InputPassword',
    },
    {
      label: t('ddd.user.testUser.salt'),
      field: 'salt',
      component: 'Input',
    },
    {
      label: t('ddd.user.testUser.lastLoginTime'),
      field: 'lastLoginTime',
      component: 'DatePicker',
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: dateUtil('00:00:00', 'HH:mm:ss') },
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
