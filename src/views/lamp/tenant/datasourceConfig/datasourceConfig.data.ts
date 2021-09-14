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
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('lamp.tenant.datasourceConfig.name'),
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'username',
    label: t('lamp.tenant.datasourceConfig.url'),
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
  },
  {
    field: 'password',
    label: t('lamp.tenant.datasourceConfig.password'),
    component: 'Input',
  },
  {
    field: 'url',
    label: t('lamp.tenant.datasourceConfig.url'),
    component: 'Input',
  },
  {
    field: 'driverClassName',
    label: t('lamp.tenant.datasourceConfig.driverClassName'),
    component: 'Input',
  },
];
