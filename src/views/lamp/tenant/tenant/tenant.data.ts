import { unref } from 'vue';
import moment, { Moment } from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useGlobSetting } from '/@/hooks/setting';
import { ActionEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { MultiTenantTypeEnum, TenantConnectTypeEnum } from '/@/enums/biz/tenant';

import { uploadApi } from '/@/api/lamp/file/upload';
import { RuleType, FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/lamp/tenant/tenant';

const { t } = useI18n();
const globSetting = useGlobSetting();

export const columns: BasicColumn[] = [
  {
    title: t('lamp.tenant.tenant.code'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('lamp.tenant.tenant.name'),
    dataIndex: 'name',
  },
  {
    title: t('lamp.tenant.tenant.type'),
    dataIndex: 'type.desc',
    width: 120,
  },
  {
    title: t('lamp.tenant.tenant.connectType'),
    dataIndex: 'connectType.desc',
    width: 120,
  },
  {
    title: t('lamp.tenant.tenant.status'),
    dataIndex: 'status.desc',
    width: 120,
  },
  {
    title: t('lamp.tenant.tenant.expirationTime'),
    dataIndex: 'expirationTime',
    width: 180,
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
    field: 'code',
    label: t('lamp.tenant.tenant.code'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'name',
    label: t('lamp.tenant.tenant.name'),
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

export const editFormSchema = (type): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'code',
      label: t('lamp.tenant.tenant.code'),
      component: 'Input',
      dynamicDisabled: (_) => {
        return unref(type) !== ActionEnum.ADD;
      },
    },
    {
      field: 'name',
      label: t('lamp.tenant.tenant.name'),
      component: 'Input',
    },
    {
      field: 'duty',
      label: t('lamp.tenant.tenant.duty'),
      component: 'Input',
      show: true,
    },
    {
      field: 'expirationTime',
      label: t('lamp.tenant.tenant.expirationTime'),
      component: 'DatePicker',
      show: true,
      componentProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        disabledDate: (current: Moment) => {
          return current && current < moment().endOf('day');
        },
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
      },
    },
    {
      field: 'logos',
      label: t('lamp.tenant.tenant.logo'),
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        uploadParams: {
          bizType: FileBizTypeEnum.DEF_TENANT_LOGO,
        },
        multiple: false,
        maxNumber: 1,
      },
    },
    {
      field: 'describe',
      label: t('lamp.tenant.tenant.describe'),
      component: 'Input',
    },
  ];
};

export const customFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) !== ActionEnum.ADD) {
              return Promise.resolve();
            }
            if (value) {
              const res = await check(value);
              if (res) {
                return Promise.reject('企业编码已经存在');
              } else {
                return Promise.resolve();
              }
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
    },
    {
      field: 'logos',
      rules: [
        {
          validator(_, value) {
            if (value) {
              if (value.length > 1) {
                return Promise.reject('只能上传一个文件');
              } else {
                return Promise.resolve();
              }
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
      type: RuleType.cover,
    },
  ];
};

export const customConnectionFormSchemaRules = (required: boolean): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'authorityDatasource',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: 'blur',
        },
      ],
      type: RuleType.cover,
    },
    {
      field: 'fileDatasource',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: 'blur',
        },
      ],
      type: RuleType.cover,
    },
    {
      field: 'msgDatasource',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: 'blur',
        },
      ],
      type: RuleType.cover,
    },
    {
      field: 'oauthDatasource',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: 'blur',
        },
      ],
      type: RuleType.cover,
    },
    {
      field: 'gateDatasource',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: 'blur',
        },
      ],
      type: RuleType.cover,
    },
  ];
};

export const connectionFormSchema = (onChange): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'tenant',
      label: t('lamp.tenant.tenant.code'),
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'connectType',
      label: t('lamp.tenant.tenant.connectType'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '本地',
            value: TenantConnectTypeEnum.LOCAL,
          },
          {
            label: '远程',
            value: TenantConnectTypeEnum.REMOTE,
            disabled: globSetting.multiTenantType !== MultiTenantTypeEnum.DATASOURCE,
          },
        ],
        onChange,
      },
      defaultValue: TenantConnectTypeEnum.LOCAL,
    },
    {
      field: 'authorityDatasource',
      label: '权限服务连接源',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.LOCAL;
      },
    },
    {
      field: 'fileDatasource',
      label: '文件服务连接源',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.LOCAL;
      },
    },
    {
      field: 'msgDatasource',
      label: '消息服务连接源',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.LOCAL;
      },
    },
    {
      field: 'oauthDatasource',
      label: '认证服务连接源',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.LOCAL;
      },
    },
    {
      field: 'gateDatasource',
      label: '网关服务连接源',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.LOCAL;
      },
    },
  ];
};

export const getUpdateOptions = (selectList) => {
  return [
    {
      field: 'authorityDatasource',
      componentProps: {
        options: selectList,
      },
    },
    {
      field: 'fileDatasource',
      componentProps: {
        options: selectList,
      },
    },
    {
      field: 'msgDatasource',
      componentProps: {
        options: selectList,
      },
    },
    {
      field: 'oauthDatasource',
      componentProps: {
        options: selectList,
      },
    },
    {
      field: 'gateDatasource',
      componentProps: {
        options: selectList,
      },
    },
  ];
};
