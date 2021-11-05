import { Ref, unref } from 'vue';
import moment, { Moment } from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useGlobSetting } from '/@/hooks/setting';
import { ActionEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { MultiTenantTypeEnum, TenantConnectTypeEnum } from '/@/enums/biz/tenant';

import { uploadApi } from '/@/api/lamp/file/upload';
import { RuleType, FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/devOperation/tenant/tenant';

const { t } = useI18n();
const globSetting = useGlobSetting();

export const columns: BasicColumn[] = [
  {
    title: t('devOperation.tenant.defTenant.code'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('devOperation.tenant.defTenant.name'),
    dataIndex: 'name',
  },
  {
    title: t('devOperation.tenant.defTenant.registerType'),
    dataIndex: 'registerType.desc',
    width: 120,
  },
  {
    title: t('devOperation.tenant.defTenant.connectType'),
    dataIndex: 'connectType.desc',
    width: 120,
  },
  {
    title: t('devOperation.tenant.defTenant.status'),
    dataIndex: 'echoMap.status',
    width: 120,
  },
  {
    title: t('devOperation.tenant.defTenant.expirationTime'),
    dataIndex: 'expirationTime',
    width: 180,
  },
  {
    title: t('lamp.common.createdTime'),
    dataIndex: 'createdTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: t('devOperation.tenant.defTenant.code'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'name',
    label: t('devOperation.tenant.defTenant.name'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createdTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

export const editFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'divider-selects1',
      component: 'Divider',
      label: '基础信息',
    },
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'code',
      label: t('devOperation.tenant.defTenant.code'),
      component: 'Input',
      dynamicDisabled: (_) => {
        return unref(type) !== ActionEnum.ADD;
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'name',
      label: t('devOperation.tenant.defTenant.name'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'abbreviation',
      label: t('devOperation.tenant.defTenant.abbreviation'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'expirationTime',
      label: t('devOperation.tenant.defTenant.expirationTime'),
      component: 'DatePicker',
      colProps: {
        span: 12,
      },
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
      label: t('devOperation.tenant.defTenant.logo'),
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        uploadParams: {
          bizType: FileBizTypeEnum.DEF_TENANT_LOGO,
        },
        multiple: false,
        maxNumber: 1,
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '联系人信息',
    },
    {
      field: 'contactPerson',
      label: t('devOperation.tenant.defTenant.contactPerson'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'contactPhone',
      label: t('devOperation.tenant.defTenant.contactPhone'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'contactEmail',
      label: t('devOperation.tenant.defTenant.contactEmail'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '地区信息',
    },
    {
      field: 'provinceId',
      label: t('devOperation.tenant.defTenant.provinceId'),
      component: 'Input',
    },
    {
      field: 'address',
      label: t('devOperation.tenant.defTenant.address'),
      component: 'Input',
    },
    {
      field: 'divider-selects4',
      component: 'Divider',
      label: '其他信息',
    },
    {
      field: 'creditCode',
      label: t('devOperation.tenant.defTenant.creditCode'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'duty',
      label: t('devOperation.tenant.defTenant.duty'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'describe',
      label: t('devOperation.tenant.defTenant.describe'),
      component: 'InputTextArea',
    },
  ];
};

export const customFormSchemaRules = (type: Ref<ActionEnum>): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
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
          trigger: ['change', 'blur'],
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
          trigger: ['change', 'blur'],
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
          trigger: ['change', 'blur'],
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
          trigger: ['change', 'blur'],
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
          trigger: ['change', 'blur'],
        },
      ],
      type: RuleType.cover,
    },
  ];
};

export const initDataFormSchema = (onChange: Fn): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'name',
      label: t('devOperation.tenant.defTenant.name'),
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'connectType',
      label: t('devOperation.tenant.defTenant.connectType'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '本地',
            value: TenantConnectTypeEnum.SYSTEM,
          },
          {
            label: '远程',
            value: TenantConnectTypeEnum.CUSTOM,
            disabled: ![
              MultiTenantTypeEnum.DATASOURCE,
              MultiTenantTypeEnum.DATASOURCE_COLUMN,
            ].includes(globSetting.multiTenantType as MultiTenantTypeEnum),
          },
        ],
        onChange,
      },
      defaultValue: TenantConnectTypeEnum.SYSTEM,
    },
    {
      field: 'baseDatasourceId',
      label: '基础库',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.SYSTEM;
      },
    },
    {
      field: 'extendDatasourceId',
      label: '扩展库',
      component: 'Select',
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.SYSTEM;
      },
    },
  ];
};

export const getUpdateOptions = (selectList: any[]) => {
  return [
    {
      field: 'baseDatasourceId',
      componentProps: {
        options: selectList,
      },
    },
    {
      field: 'extendDatasourceId',
      componentProps: {
        options: selectList,
      },
    },
  ];
};
