import { useI18n } from '/@/hooks/web/useI18n';
import { BasicColumn, FormSchema } from '/@/components/Table';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('lamp.tenant.datasourceConfig.name'),
    dataIndex: 'name',
    width: 120,
  },
  {
    title: t('lamp.tenant.datasourceConfig.username'),
    dataIndex: 'username',
    width: 120,
  },
  {
    title: t('lamp.tenant.datasourceConfig.password'),
    dataIndex: 'password',
    width: 120,
    format: (_) => {
      return '***';
    },
  },
  {
    title: t('lamp.tenant.datasourceConfig.driverClassName'),
    dataIndex: 'driverClassName',
    width: 120,
  },
  {
    title: t('lamp.tenant.datasourceConfig.url'),
    dataIndex: 'url',
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
    field: 'name',
    label: t('lamp.tenant.datasourceConfig.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'username',
    label: t('lamp.tenant.datasourceConfig.username'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'url',
    label: t('lamp.tenant.datasourceConfig.url'),
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

export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'name',
    label: t('lamp.tenant.datasourceConfig.name'),
    component: 'Input',
  },
  {
    field: 'username',
    label: t('lamp.tenant.datasourceConfig.username'),
    component: 'Input',
    defaultValue: 'root',
  },
  {
    field: 'password',
    label: t('lamp.tenant.datasourceConfig.password'),
    component: 'InputPassword',
  },
  {
    field: 'url',
    label: t('lamp.tenant.datasourceConfig.url'),
    component: 'Input',
    defaultValue:
      'jdbc:mysql://127.0.0.1:3306/lamp_base_1111?serverTimezone=CTT&characterEncoding=utf8&useUnicode=true&useSSL=false&autoReconnect=true&zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&nullCatalogMeansCurrent=true',
  },
  {
    field: 'driverClassName',
    label: t('lamp.tenant.datasourceConfig.driverClassName'),
    component: 'Select',
    defaultValue: 'mysql6',
    componentProps: {
      options: [
        {
          label: 'mysql6',
          value: 'com.mysql.cj.jdbc.Driver',
          key: 'mysql6',
        },
        {
          label: 'mysql5',
          value: 'com.mysql.jdbc.Driver',
          key: 'mysql5',
        },
      ],
    },
  },
];
