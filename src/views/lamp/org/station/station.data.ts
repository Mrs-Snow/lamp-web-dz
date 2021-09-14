import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { tree } from '/@/api/lamp/org/org';
const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.org.station.name'),
    dataIndex: 'name',
    // width: 180,
  },
  {
    title: t('lamp.org.station.orgId'),
    dataIndex: 'echoMap.orgId.label',
    width: 180,
  },
  {
    title: t('lamp.org.station.state'),
    dataIndex: 'state',
    width: 50,
    format: (text: string) => {
      return text ? '启用' : '禁用';
    },
  },
  {
    title: t('lamp.org.station.describe'),
    dataIndex: 'describe',
    // width: 180,
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
    label: t('lamp.org.station.name'),
    field: 'name',
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

// 编辑页字段
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: t('lamp.org.station.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('lamp.org.station.orgId'),
    field: 'orgId',
    component: 'ApiTreeSelect',
    componentProps: {
      api: tree,
      labelField: 'label',
      valueField: 'id',
      allowClear: true,
    },
  },
  {
    label: t('lamp.org.station.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.yes'), value: true },
        { label: t('lamp.common.no'), value: false },
      ],
    },
    defaultValue: true,
  },
  {
    label: t('lamp.org.station.describe'),
    field: 'describe',
    component: 'Input',
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
