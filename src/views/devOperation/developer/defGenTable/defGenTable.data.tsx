import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { stateComponentProps } from '/@/utils/lamp/common';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { query } from '/@/api/devOperation/tenant/datasourceConfig';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.developer.defGenTable.tableName'),
      dataIndex: 'tableName',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.tableComment'),
      dataIndex: 'tableComment',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.className'),
      dataIndex: 'className',
      // width: 180,
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
      field: 'tableName',
      label: t('devOperation.developer.defGenTable.tableName'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'tableComment',
      label: t('devOperation.developer.defGenTable.tableComment'),
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
};

// 列表页字段
export const importColumns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.developer.defGenTable.tableName'),
      dataIndex: 'tableName',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.tableComment'),
      dataIndex: 'tableComment',
      // width: 180,
    },
  ];
};

export const importSearchFormSchema = (dsNameChange: Fn, setFieldsValue): FormSchema[] => {
  return [
    {
      field: 'dsName',
      label: '数据源',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        afterFetch: (options) => {
          if (options && options.length > 0) {
            setFieldsValue({ dsName: options[0]?.name });
            dsNameChange(options[0]?.name);
          }
        },
        labelField: 'name',
        valueField: 'name',
        showSearch: true,
        allowClear: false,
        onChange: dsNameChange,
        filterOption: (input: string, option: any) => {
          return option.label.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
      },
      colProps: { span: 6 },
    },
    {
      field: 'tableName',
      label: t('devOperation.developer.defGenTable.tableName'),
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'tableComment',
      label: t('devOperation.developer.defGenTable.tableComment'),
      component: 'Input',
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
export const editFormSchema = (_: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('devOperation.developer.defGenTable.tableName'),
      field: 'tableName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.tableComment'),
      field: 'tableComment',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.subTableName'),
      field: 'subTableName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.subTableFkName'),
      field: 'subTableFkName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.className'),
      field: 'className',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.tplCategory'),
      field: 'tplCategory',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.packageName'),
      field: 'packageName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.moduleName'),
      field: 'moduleName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.businessName'),
      field: 'businessName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.functionName'),
      field: 'functionName',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.functionAuthor'),
      field: 'functionAuthor',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.genType'),
      field: 'genType',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.genPath'),
      field: 'genPath',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.addAuth'),
      field: 'addAuth',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.editAuth'),
      field: 'editAuth',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.deleteAuth'),
      field: 'deleteAuth',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.copyAuth'),
      field: 'copyAuth',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.addShow'),
      field: 'addShow',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.developer.defGenTable.editShow'),
      field: 'editShow',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.developer.defGenTable.deleteShow'),
      field: 'deleteShow',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.developer.defGenTable.copyShow'),
      field: 'copyShow',
      component: 'RadioButtonGroup',
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.developer.defGenTable.options'),
      field: 'options',
      component: 'Input',
    },
    {
      label: t('devOperation.developer.defGenTable.remark'),
      field: 'remark',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
