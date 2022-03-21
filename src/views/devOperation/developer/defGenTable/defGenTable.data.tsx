import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { enumComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { EnumEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { query } from '/@/api/devOperation/tenant/datasourceConfig';
import { GenTypeEnum, PopupTypeEnum, TplEnum } from '/@/enums/biz/tenant';

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
      title: '作者',
      dataIndex: 'author',
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
      colProps: { span: 6 },
    },
    {
      field: 'comment',
      label: t('devOperation.developer.defGenTable.tableComment'),
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'author',
      label: '作者',
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

export const importSearchFormSchema = (dsChange: Fn, setFieldsValue): FormSchema[] => {
  return [
    {
      field: 'dsId',
      label: '数据源',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        afterFetch: (options) => {
          if (options && options.length > 0) {
            setFieldsValue({ dsId: options[0]?.id });
            dsChange(options[0]?.id);
          }
        },
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        allowClear: false,
        onChange: dsChange,
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
export const baseEditFormSchema = (updateSchemaFn: Fn): FormSchema[] => {
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
      label: '数据源名',
      field: 'dsId',
      component: 'ApiSelect',
      dynamicDisabled: true,
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        allowClear: false,
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '实体名称',
      field: 'entityName',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: ['修改实体名称后，会影响Controller、Service、Manager、Mapper、VO的名称'],
    },
    {
      label: '作者',
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: ['体现在代码注释中的 @author'],
    },
    {
      label: '表注释',
      field: 'comment',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: ['体现在代码注释中'],
    },
    {
      label: 'swagger注释',
      field: 'swaggerComment',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: ['体现在swagger文档'],
    },
    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '生成信息',
    },
    {
      label: '服务名',
      field: 'serviceName',
      component: 'Input',
      helpMessage: [
        '如： lamp-base、lamp-base-api、lamp-base-biz、lamp-base-controller、lamp-base-server 中的 base',
        '如： lamp-system-server 中的 system',
      ],
      colProps: {
        span: 12,
      },
    },
    {
      label: '父包名',
      field: 'parent',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: [
        '生成业务代码的基础包包名',
        '如："top.tangyh.lamp.base.dao.common" 中的 "top.tangyh.lamp" ',
      ],
    },
    {
      label: '模块名',
      field: 'moduleName',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: [
        '如："top.tangyh.lamp.base.dao.common" 中的 "base" ',
        '如："top.tangyh.lamp.file.dao" 中的 "file" ',
      ],
    },
    {
      label: '子模块名称',
      field: 'childModuleName',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: [
        '如："top.tangyh.lamp.base.dao.common" 中的 "common" ',
        '如："top.tangyh.lamp.base.dao.system" 中的 "system" ',
      ],
    },
    {
      label: '@DS',
      field: 'isDs',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
        onChange: (e) => {
          if (e.target.value) {
            updateSchemaFn({
              field: 'isDs',
              colProps: {
                span: 12,
              },
            });
          } else {
            updateSchemaFn({
              field: 'isDs',
              colProps: {
                span: 24,
              },
            });
          }
        },
      },
      defaultValue: false,
      colProps: {
        span: 24,
      },
    },
    {
      label: '数据源',
      field: 'dsName',
      component: 'Input',
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return values.isDs;
      },
    },
    {
      label: '@TenantLine',
      field: 'isTenantLine',
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
      label: 'lombok',
      field: 'isLombok',
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
      label: '链式模型',
      field: 'isChain',
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
      label: '生成字段常量',
      field: 'isColumnConstant',
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
      label: '生成方式',
      field: 'genType',
      component: 'ApiRadioGroup',
      componentProps: {
        ...enumComponentProps(EnumEnum.GenTypeEnum),
      },
      colProps: {
        span: 12,
      },
      defaultValue: GenTypeEnum.GEN,
      helpMessage: [
        '生成代码的方式',
        '直接生成时，一定要确保lamp-generator服务在本地启动，否则无法生成到开发者的开发电脑',
      ],
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
      ifShow: ({ values }) => {
        return values.genType === GenTypeEnum.GEN;
      },
      helpMessage: ['生成完毕后，是否自动打开目录'],
    },
    {
      label: '输出路径',
      field: 'outputDir',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.genType === GenTypeEnum.GEN;
      },
    },

    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '前端信息',
    },
    {
      label: '弹窗方式',
      field: 'popupType',
      component: 'ApiRadioGroup',
      componentProps: {
        ...enumComponentProps(EnumEnum.PopupTypeEnum),
      },
      colProps: {
        span: 12,
      },
      defaultValue: PopupTypeEnum.MODAL,
      helpMessage: ['前端代码index.vue页面点击新增或编辑时，弹窗的打开方式'],
    },
    {
      label: '生成模板',
      field: 'tplType',
      component: 'ApiRadioGroup',
      componentProps: {
        ...enumComponentProps(EnumEnum.TplEnum),
      },
      defaultValue: TplEnum.SIMPLE,
      colProps: {
        span: 12,
      },
      helpMessage: ['前端代码生成何种操作风格的页面'],
    },
    {
      label: '新增按钮权限',
      field: 'addAuth',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '编辑按钮权限',
      field: 'editAuth',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '删除按钮权限',
      field: 'deleteAuth',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '复制按钮权限',
      field: 'copyAuth',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: '显示新增按钮',
      field: 'addShow',
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
      label: '显示编辑按钮',
      field: 'editShow',
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
      label: '显示删除按钮',
      field: 'deleteShow',
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
      label: '显示复制按钮',
      field: 'copyShow',
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
      label: '上级菜单',
      field: 'parentId',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
  ];
};

export const globalEditFormSchema = (): FormSchema[] => {
  return [];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
