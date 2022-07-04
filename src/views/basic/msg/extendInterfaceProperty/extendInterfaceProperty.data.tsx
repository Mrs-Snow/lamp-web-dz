import { Ref } from 'vue';
import { dateUtil } from '/@/utils/dateUtil';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.extendInterfaceProperty.interfaceId'),
      dataIndex: 'interfaceId',
    },
    {
      title: t('basic.msg.extendInterfaceProperty.name'),
      dataIndex: 'name',
    },
    {
      title: t('basic.msg.extendInterfaceProperty.key'),
      dataIndex: 'key',
    },
    {
      title: t('basic.msg.extendInterfaceProperty.value'),
      dataIndex: 'value',
    },
    {
      title: t('basic.msg.extendInterfaceProperty.sortValue'),
      dataIndex: 'sortValue',
    },
    {
      title: t('basic.msg.extendInterfaceProperty.remarks'),
      dataIndex: 'remarks',
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
      label: t('basic.msg.extendInterfaceProperty.interfaceId'),
      field: 'interfaceId',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterfaceProperty.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterfaceProperty.key'),
      field: 'key',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterfaceProperty.value'),
      field: 'value',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterfaceProperty.sortValue'),
      field: 'sortValue',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('basic.msg.extendInterfaceProperty.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
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
      label: t('basic.msg.extendInterfaceProperty.interfaceId'),
      field: 'interfaceId',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterfaceProperty.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterfaceProperty.key'),
      field: 'key',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterfaceProperty.value'),
      field: 'value',
      component: 'Input',
    },
    {
      label: t('basic.msg.extendInterfaceProperty.sortValue'),
      field: 'sortValue',
      component: 'Input',
      defaultValue: '0',
    },
    {
      label: t('basic.msg.extendInterfaceProperty.remarks'),
      field: 'remarks',
      component: 'InputTextArea',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
