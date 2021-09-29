import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { query as queryApplication } from '/@/api/lamp/application/defApplication';
import { query as queryTenant } from '/@/api/lamp/tenant/tenant';
import { TenantStatusEnum } from '/@/enums/biz/tenant';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('lamp.application.defTenantApplicationRel.tenantId'),
      dataIndex: 'echoMap.tenantId',
      // width: 180,
    },
    {
      title: t('lamp.application.defTenantApplicationRel.applicationId'),
      dataIndex: 'echoMap.applicationId',
      // width: 180,
    },
    {
      title: t('lamp.application.defTenantApplicationRel.expirationTime'),
      dataIndex: 'expirationTime',
      width: 180,
      sorter: true,
    },
    {
      title: t('lamp.application.defTenantApplicationRel.expired'),
      dataIndex: 'expired',
      width: 80,
      slots: { customRender: 'expired' },
    },
    {
      title: t('lamp.application.defTenantApplicationRel.authorizationTime'),
      dataIndex: 'createdTime',
      sorter: true,
      width: 180,
    },
  ];
};

export const getTenantColumns = (): BasicColumn[] => {
  return [
    {
      title: t('lamp.tenant.tenant.code'),
      dataIndex: 'code',
      // width: 180,
    },
    {
      title: t('lamp.tenant.tenant.name'),
      dataIndex: 'name',
      // width: 180,
    },
  ];
};

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'tenantId',
      label: t('lamp.application.defTenantApplicationRel.tenantId'),
      component: 'ApiSelect',
      componentProps: {
        api: queryTenant,
        labelField: 'name',
        valueField: 'id',
        params: {
          status: TenantStatusEnum.NORMAL,
        },
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
      },
      colProps: { span: 6 },
    },
    {
      field: 'applicationId',
      label: t('lamp.application.defTenantApplicationRel.applicationId'),
      component: 'ApiSelect',
      componentProps: {
        api: queryApplication,
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
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
export const editFormSchema = (_): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.application.defTenantApplicationRel.tenantId'),
      field: 'tenantId',
      component: 'ApiSelect',
      dynamicDisabled: true,
      componentProps: {
        api: queryTenant,
        labelField: 'name',
        valueField: 'id',
        params: {
          status: TenantStatusEnum.NORMAL,
        },
      },
    },
    {
      label: t('lamp.application.defTenantApplicationRel.applicationId'),
      field: 'applicationId',
      component: 'ApiSelect',
      dynamicDisabled: true,
      componentProps: { api: queryApplication, labelField: 'name', valueField: 'id' },
    },
    {
      label: t('lamp.application.defTenantApplicationRel.expirationTime'),
      field: 'expirationTime',
      component: 'DatePicker',

      componentProps: {
        style: { width: '100%' },
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
