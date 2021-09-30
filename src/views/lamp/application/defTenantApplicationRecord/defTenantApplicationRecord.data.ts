import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { query as queryApplication } from '/@/api/lamp/application/defApplication';
import { query as queryTenant } from '/@/api/lamp/tenant/tenant';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { TenantStatusEnum } from '/@/enums/biz/tenant';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('lamp.application.defTenantApplicationRecord.tenantName'),
      dataIndex: 'tenantName',
      // width: 180,
    },
    {
      title: t('lamp.application.defTenantApplicationRecord.applicationName'),
      dataIndex: 'applicationName',
      // width: 180,
    },
    {
      title: t('lamp.application.defTenantApplicationRecord.operateByName'),
      dataIndex: 'operateByName',
      // width: 180,
    },
    {
      title: t('lamp.application.defTenantApplicationRecord.grantType'),
      dataIndex: 'echoMap.grantType',
      width: 100,
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
      field: 'tenantId',
      label: t('lamp.application.defTenantApplicationRel.tenantId'),
      component: 'ApiSelect',
      componentProps: ({ tableAction }) => {
        return {
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
          onChange: (value) => {
            const { reload } = tableAction;
            reload({ searchInfo: { tenantId: value } });
          },
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'applicationId',
      label: t('lamp.application.defTenantApplicationRel.applicationId'),
      component: 'ApiSelect',
      componentProps: ({ tableAction }) => {
        return {
          api: queryApplication,
          labelField: 'name',
          valueField: 'id',
          showSearch: true,
          filterOption: (input: string, option: any) => {
            return option.label.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          onChange: (value) => {
            const { reload } = tableAction;
            reload({ searchInfo: { applicationId: value } });
          },
        };
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
      label: t('lamp.application.defTenantApplicationRecord.tenantId'),
      field: 'tenantId',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.application.defTenantApplicationRecord.applicationId'),
      field: 'applicationId',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.application.defTenantApplicationRecord.applicationName'),
      field: 'applicationName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.application.defTenantApplicationRecord.tenantName'),
      field: 'tenantName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.application.defTenantApplicationRecord.operateByName'),
      field: 'operateByName',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      label: t('lamp.application.defTenantApplicationRecord.grantType'),
      field: 'grantType',
      component: 'Input',
      dynamicDisabled: true,
    },

    {
      label: '分配的资源',
      field: 'resourceIdList',
      slot: 'resourceIdList',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
