import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.system.online.account'),
    dataIndex: 'account',
    width: 120,
  },
  {
    title: t('lamp.system.online.name'),
    dataIndex: 'name',
    width: 120,
  },
  {
    title: t('lamp.system.online.token'),
    dataIndex: 'token',
  },
  {
    title: t('lamp.system.online.clientId'),
    dataIndex: 'clientId',
    width: 180,
  },
  {
    title: t('lamp.system.online.location'),
    dataIndex: 'location',
    width: 180,
  },
  {
    title: t('lamp.system.online.loginIp'),
    dataIndex: 'loginIp',
    width: 120,
  },
  {
    title: t('lamp.system.online.loginTime'),
    dataIndex: 'loginTime',
    sorter: true,
    width: 180,
  },
  {
    title: t('lamp.system.online.expireTime'),
    dataIndex: 'expireTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 5 },
  },
];
