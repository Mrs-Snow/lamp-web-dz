import { Ref, unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { tree } from '/@/api/basic/user/baseOrg';
import { query } from '/@/api/basic/user/basePosition';
import { dictComponentProps, stateComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { checkMobile } from '/@/api/devOperation/tenant/defUser';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.user.baseEmployee.realName'),
      dataIndex: 'realName',
      // width: 180,
    },
    {
      title: t('basic.user.baseEmployee.positionId'),
      dataIndex: 'echoMap.positionId',
      // width: 180,
    },
    {
      title: t('basic.user.baseEmployee.orgId'),
      dataIndex: 'orgNameList',
      slots: { customRender: 'orgIdList' },
    },
    {
      title: t('basic.user.baseEmployee.positionStatus'),
      dataIndex: 'echoMap.positionStatus',
      width: 100,
    },
    {
      title: t('basic.user.baseEmployee.state'),
      dataIndex: 'state',
      width: 50,
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
      label: t('basic.user.baseEmployee.realName'),
      field: 'realName',
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
      field: 'divider-selects1',
      component: 'Divider',
      label: '基础信息',
    },
    {
      label: t('basic.user.baseEmployee.realName'),
      field: 'realName',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('basic.user.baseEmployee.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '用户信息',
      show: () => {
        return [ActionEnum.ADD, ActionEnum.COPY].includes(type.value);
      },
    },
    {
      label: t('devOperation.tenant.defUser.mobile'),
      field: 'mobile',
      component: 'Input',
      colProps: {
        span: 12,
      },
      show: () => {
        return [ActionEnum.ADD, ActionEnum.COPY].includes(type.value);
      },
    },
    {
      label: t('devOperation.tenant.defUser.sex'),
      field: 'sex',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.GLOBAL_SEX),
      },
      defaultValue: 'M',
      colProps: {
        span: 12,
      },
      show: () => {
        return [ActionEnum.ADD, ActionEnum.COPY].includes(type.value);
      },
    },
    {
      label: t('devOperation.tenant.defUser.nation'),
      field: 'nation',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.NATION),
      },
      show: () => {
        return [ActionEnum.ADD, ActionEnum.COPY].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.education'),
      field: 'education',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EDUCATION),
      },
      show: () => {
        return [ActionEnum.ADD, ActionEnum.COPY].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '职位信息',
    },
    {
      label: t('basic.user.baseEmployee.orgId'),
      field: 'orgIdList',
      component: 'ApiTreeSelect',
      componentProps: {
        api: tree,
        labelField: 'name',
        valueField: 'id',
        allowClear: true,
        multiple: true,
      },
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('basic.user.baseEmployee.positionId'),
      field: 'positionId',
      component: 'ApiSelect',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('basic.user.baseEmployee.positionStatus'),
      field: 'positionStatus',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.POSITION_STATUS),
      },
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
  ];
};

// 用户信息字段
export const userEditFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      label: t('devOperation.tenant.defUser.username'),
      field: 'username',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.email'),
      field: 'email',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.mobile'),
      field: 'mobile',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.idCard'),
      field: 'idCard',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.wxOpenId'),
      field: 'wxOpenId',
      component: 'Input',
      dynamicDisabled: true,
      ifShow: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.ddOpenId'),
      field: 'ddOpenId',
      component: 'Input',
      dynamicDisabled: true,
      ifShow: () => {
        return [ActionEnum.VIEW, ActionEnum.EDIT].includes(type.value);
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '基础信息',
    },
    {
      label: t('devOperation.tenant.defUser.nickName'),
      field: 'nickName',
      component: 'Input',
    },
    {
      label: t('devOperation.tenant.defUser.sex'),
      field: 'sex',
      component: 'ApiRadioGroup',
      componentProps: {
        ...dictComponentProps(DictEnum.GLOBAL_SEX),
      },
      defaultValue: 'M',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.nation'),
      field: 'nation',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.NATION),
      },

      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.education'),
      field: 'education',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EDUCATION),
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.tenant.defUser.workDescribe'),
      field: 'workDescribe',
      component: 'InputTextArea',
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '额外信息',
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
    {
      label: t('devOperation.tenant.defUser.passwordErrorLastTime'),
      field: 'passwordErrorLastTime',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
    {
      label: t('devOperation.tenant.defUser.passwordErrorNum'),
      field: 'passwordErrorNum',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
    {
      label: t('devOperation.tenant.defUser.passwordExpireTime'),
      field: 'passwordExpireTime',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
    {
      label: t('devOperation.tenant.defUser.lastLoginTime'),
      field: 'lastLoginTime',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: true,
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
    {
      label: t('devOperation.tenant.defUser.locked'),
      field: 'locked',
      colProps: {
        span: 12,
      },
      component: 'RadioButtonGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      dynamicDisabled: true,
      ifShow: () => {
        return type.value === ActionEnum.VIEW;
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (type: Ref<ActionEnum>): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'mobile',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await checkMobile(value))) {
              return Promise.reject('手机号已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
