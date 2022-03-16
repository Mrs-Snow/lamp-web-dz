import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { enumComponentProps, stateComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { EnumEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { query } from '/@/api/devOperation/tenant/datasourceConfig';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.developer.defGenTable.tableName'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.tableComment'),
      dataIndex: 'comment',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.className'),
      dataIndex: 'entityName',
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
      field: 'name',
      label: t('devOperation.developer.defGenTable.tableName'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'comment',
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
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTable.tableComment'),
      dataIndex: 'comment',
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
      field: 'name',
      label: t('devOperation.developer.defGenTable.tableName'),
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'comment',
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
export const baseEditFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: '表名',
      field: 'name',
      component: 'Input',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: '表注释',
      field: 'comment',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '实体名称',
      field: 'entityName',
      component: 'Input',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: '作者',
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '数据源名',
      field: 'dsName',
      component: 'Input',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
    },
  ];
};

export const globalEditFormSchema = (): FormSchema[] => {
  return [
    {
      label: '生成方式',
      field: 'genType',
      component: 'Select',
      componentProps: {
        options: [
          { label: '单表', value: 'SIMPLE' },
          { label: '树结构', value: 'TREE' },
          { label: '主从结构', value: 'MAIN_SUB' },
        ],
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '弹窗方式',
      field: 'popupType',
      component: 'Select',
      componentProps: {
        options: [
          { label: '弹窗', value: 'MODAL' },
          { label: '抽屉', value: 'DRAWER' },
        ],
      },
      colProps: {
        span: 12,
      },
      defaultValue: 'MODAL',
    },
    {
      label: '打开输出目录',
      field: 'open',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      defaultValue: false,
      colProps: {
        span: 12,
      },
    },
    {
      label: '输出路径',
      field: 'outputDir',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: 'swagger模式',
      field: 'swagger',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      defaultValue: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: '时间类型',
      field: 'dateType',
      component: 'Select',
      componentProps: {
        options: [
          { label: 'java.time', value: 'TIME_PACK' },
          { label: 'java.util', value: 'ONLY_DATE' },
          { label: 'java.sql', value: 'SQL_PACK' },
        ],
      },
      defaultValue: 'TIME_PACK',
      colProps: {
        span: 12,
      },
    },
    {
      label: '生成模板',
      field: 'tplType',
      component: 'Select',
      componentProps: {
        ...enumComponentProps(EnumEnum.TplEnum),
      },
      defaultValue: 'SIMPLE',
      colProps: {
        span: 12,
      },
    },
    {
      label: '指定父包名',
      field: 'parentPackage',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '指定模块名称',
      field: 'moduleName',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '子模块名称',
      field: 'childModuleName',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '上级菜单',
      field: 'parentId',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
  ];
};

export const editFormSchema2 = (): FormSchema[] => {
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
