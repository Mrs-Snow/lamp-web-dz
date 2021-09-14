import { unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { RuleType, FormSchemaExt } from '/@/api/lamp/common/formValidateService';

import { ActionEnum, EnumEnum } from '/@/enums/commonEnum';
import { query } from '/@/api/lamp/tenant/tenant';
import { check } from '/@/api/lamp/tenant/user';
import { enumComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('lamp.tenant.user.name'),
    dataIndex: 'name',
  },
  {
    title: t('lamp.tenant.user.account'),
    dataIndex: 'account',
  },
  {
    title: t('lamp.tenant.user.sex'),
    dataIndex: 'sex.desc',
    width: 50,
  },
  {
    title: t('lamp.tenant.user.mobile'),
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: t('lamp.tenant.user.email'),
    dataIndex: 'email',
    width: 120,
  },
  {
    title: t('lamp.tenant.user.readonly'),
    dataIndex: 'readonly',
    width: 50,
    format: (text: string) => {
      return text ? '是' : '否';
    },
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema = (tenantCodeChange: Fn): FormSchema[] => {
  return [
    {
      field: 'tenantCode',
      label: t('lamp.tenant.user.tenantCode'),
      component: 'ApiSelect',
      colProps: { span: 5 },
      componentProps: {
        api: query,
        params: { status: 'NORMAL' },
        labelField: 'name',
        valueField: 'code',
        allowClear: false,
        onChange: tenantCodeChange,
      },
      defaultValue: '0000',
    },
    {
      field: 'name',
      label: t('lamp.tenant.user.name'),
      component: 'Input',
      colProps: { span: 5 },
    },
    {
      field: 'account',
      label: t('lamp.tenant.user.account'),
      component: 'Input',
      colProps: { span: 5 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createTime'),
      component: 'RangePicker',
      colProps: { span: 6 },
    },
  ];
};

export const editFormSchema = (type: any, tenantCodeChange: Fn): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      field: 'tenantCode',
      label: t('lamp.tenant.user.tenantCode'),
      component: 'ApiSelect',
      componentProps: {
        api: query,
        params: { status: 'NORMAL' },
        labelField: 'name',
        valueField: 'code',
        allowClear: false,
        onChange: tenantCodeChange,
      },
      dynamicDisabled: (_) => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      field: 'name',
      label: t('lamp.tenant.user.name'),
      component: 'Input',
    },
    {
      field: 'account',
      label: t('lamp.tenant.user.account'),
      component: 'Input',
      dynamicDisabled: (_) => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      field: 'password',
      label: t('lamp.tenant.user.password'),
      component: 'InputPassword',
      ifShow: (_) => {
        return unref(type) !== ActionEnum.EDIT;
      },
    },
    {
      field: 'confirmPassword',
      label: t('lamp.tenant.user.confirmPassword'),
      component: 'InputPassword',
      ifShow: (_) => {
        return unref(type) !== ActionEnum.EDIT;
      },
    },
    {
      field: 'sex',
      label: t('lamp.tenant.user.sex'),
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.Sex),
      },
    },
    {
      field: 'mobile',
      label: t('lamp.tenant.user.mobile'),
      component: 'Input',
    },
    {
      field: 'email',
      label: t('lamp.tenant.user.email'),
      component: 'Input',
    },
  ];
};

export const customFormSchemaRules = (
  type: any,
  getFieldsValue: () => Recordable
): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'account',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (
              value &&
              getFieldsValue()?.tenantCode &&
              (await check(getFieldsValue()?.tenantCode, value))
            ) {
              return Promise.reject('账号已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      field: 'password',
      rules: [
        {
          trigger: 'blur',
          validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (
              value &&
              getFieldsValue()?.confirmPassword &&
              value !== getFieldsValue()?.confirmPassword
            ) {
              return Promise.reject('2次密码不一致');
            }
            return Promise.resolve();
          },
        },
      ],
      type: RuleType.append,
    },
    {
      field: 'confirmPassword',
      rules: [
        {
          trigger: 'blur',
          validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && getFieldsValue()?.password && value !== getFieldsValue()?.password) {
              return Promise.reject('2次密码不一致');
            }
            return Promise.resolve();
          },
        },
      ],
      type: RuleType.append,
    },
  ];
};
