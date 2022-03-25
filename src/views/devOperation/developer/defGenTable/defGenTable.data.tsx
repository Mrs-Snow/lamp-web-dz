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
      helpMessage: [
        '生成的后端文件位于： [{输出路径}/]{全局配置.项目前缀}-{服务名}-{全局配置.服务后缀}/src/main/java/{父包名}/{模块名}[/{全局配置.PackageInfoConfig}]/{子包名}/',
        '[]: 表示可选项; {}: 表示占位符 ; 全局配置: 表示在后台yml或常量中配置',
        '全局配置.项目前缀: 后端yml配置： generator.projectPrefix',
        '全局配置.服务后缀: 后端代码常量： GenCodeConstant.XXX_SERVICE_SUFFIX',
        '全局配置.PackageInfoConfig: 后端yml配置: generator.packageInfoConfig.xxx',
      ],
    },
    {
      label: '服务名',
      field: 'serviceName',
      component: 'AutoComplete',
      componentProps: ({ formActionType }) => {
        return {
          allowClear: true,
          getPopupContainer: () => document.body,
          filterOption: (input: string, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          options: [
            { value: 'base' },
            { value: 'system' },
            { value: 'gateway' },
            { value: 'generator' },
            { value: 'oauth' },
          ],
          onChange: (value: string) => {
            if (value) {
              const { setFieldsValue, getFieldsValue } = formActionType;
              if (!getFieldsValue().moduleName) {
                setFieldsValue({
                  moduleName: value,
                });
              }
            }
          },
        };
      },
      helpMessage: [
        '1. 确保前端ServicePrefixEnum中的枚举值KEY 与 后端”服务名“和lamp-gateway-server.yml中“uri”保持一致',
        '2. 确保前端ServicePrefixEnum中的枚举值VALUE 与 后端lamp-gateway-server.yml中“predicates”配置一致',
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
      component: 'AutoComplete',
      componentProps: () => {
        return {
          allowClear: true,
          getPopupContainer: () => document.body,
          filterOption: (input: string, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          options: [
            { value: 'base' },
            { value: 'system' },
            { value: 'gateway' },
            { value: 'generator' },
            { value: 'oauth' },
          ],
        };
      },
      colProps: {
        span: 12,
      },
      helpMessage: [
        '建议跟{服务名一致}保持一致',
        '如："top.tangyh.lamp.base.dao.common" 中的 "base" ',
        '如："top.tangyh.lamp.file.dao" 中的 "file" ',
      ],
    },
    {
      label: '子包名',
      field: 'childPackageName',
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
      label: '实体父类',
      field: 'entitySuperClass',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.EntitySuperClassEnum),
      },
      colProps: {
        span: 12,
      },
      helpMessage: ['实体类需要继承谁？'],
    },
    {
      label: '父类',
      field: 'superClass',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.SuperClassEnum),
      },
      colProps: {
        span: 12,
      },
      helpMessage: ['非实体类需要继承谁？'],
    },
    {
      label: '@DS',
      field: 'isDs',
      component: 'RadioGroup',
      componentProps: {
        ...yesNoComponentProps(),
        onChange: (e) => {
          if (e.target.value) {
            updateSchemaFn([
              {
                field: 'dsValue',
                required: true,
              },
              {
                field: 'isDs',
                colProps: {
                  span: 12,
                },
              },
            ]);
          } else {
            updateSchemaFn([
              {
                field: 'dsValue',
                required: false,
              },
              {
                field: 'isDs',
                colProps: {
                  span: 24,
                },
              },
            ]);
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
      field: 'dsValue',
      colProps: {
        span: 12,
      },
      component: 'AutoComplete',
      componentProps: () => {
        return {
          allowClear: true,
          getPopupContainer: () => document.body,
          filterOption: (input: string, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          options: [
            { value: 'DsConstant.BASE_TENANT' },
            { value: 'DsConstant.DEFAULTS' },
            { value: 'DsConstant.EXTEND_TENANT' },
          ],
        };
      },
      required: false,
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
        onChange: (value: string) => {
          if (GenTypeEnum.GEN === value) {
            updateSchemaFn([
              {
                field: 'outputDir',
                required: true,
              },
              {
                field: 'frontOutputDir',
                required: true,
              },
            ]);
          } else {
            updateSchemaFn([
              {
                field: 'outputDir',
                required: false,
              },
              {
                field: 'frontOutputDir',
                required: false,
              },
            ]);
          }
        },
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
    // {
    //   label: '打开输出目录',
    //   field: 'open',
    //   component: 'RadioGroup',
    //   componentProps: {
    //     ...yesNoComponentProps(),
    //   },
    //   defaultValue: false,
    //   colProps: {
    //     span: 12,
    //   },
    //   ifShow: ({ values }) => {
    //     return values.genType === GenTypeEnum.GEN;
    //   },
    //   helpMessage: ['生成完毕后，是否自动打开目录'],
    // },
    {
      label: '后端生成路径',
      field: 'outputDir',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.genType === GenTypeEnum.GEN;
      },
      // required: ({ model }) => {
      //   return model.genType === GenTypeEnum.GEN;
      // },
    },
    {
      label: '前端生成路径',
      field: 'frontOutputDir',
      component: 'Input',
      ifShow: ({ values }) => {
        return values.genType === GenTypeEnum.GEN;
      },
      // required: ({ model }) => {
      //   return model.genType === GenTypeEnum.GEN;
      // },
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '前端信息',
    },
    {
      label: '前端应用名',
      field: 'plusApplicationName',
      component: 'AutoComplete',
      componentProps: () => {
        return {
          allowClear: true,
          getPopupContainer: () => document.body,
          filterOption: (input: string, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          options: [{ value: 'devOperation' }, { value: 'basic' }],
        };
      },
      colProps: {
        span: 12,
      },
      helpMessage: [
        '1. src/views/ 目录下的 basic 或 devOperation 或 其他 ',
        '2. src/api/ 目录下的 basic 或 devOperation 或 其他 ',
        '3. src/locales/lang/{语言}/ 目录下的 basic 或 devOperation 或 其他 ',
        '4. 其他 表示其他应用',
      ],
    },
    {
      label: '前端模块名',
      field: 'plusModuleName',
      component: 'Input',
      colProps: {
        span: 12,
      },
      helpMessage: [
        '1. src/api/{前端应用名} 目录下的文件夹名',
        '2. src/views/{前端应用名} 目录下的文件夹名',
        '3. src/locales/lang/{语言}/{前端应用名} 目录下的文件夹名',
        '如：src/views/devOperation/ 下的 application、developer 等目录',
        '如：src/api/devOperation/ 下的 application、developer 等目录',
      ],
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
      label: '显示详情按钮',
      field: 'viewShow',
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
      helpMessage: ['当前功能生成后，显示在左侧菜单的位置'],
      colProps: {
        span: 12,
      },
    },
    {
      label: '当前菜单名',
      field: 'menuName',
      component: 'Input',
      helpMessage: ['当前功能生成后，显示在左侧的菜单名'],
      colProps: {
        span: 12,
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (
  _getFieldsValue: () => Recordable,
): Partial<FormSchemaExt>[] => {
  return [];
};

export const columnColumns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.developer.defGenTableColumn.name'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.comment'),
      dataIndex: 'comment',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.swaggerComment'),
      dataIndex: 'swaggerComment',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.type'),
      dataIndex: 'type',
      // width: 180,
      editComponent: 'AutoComplete',
      editComponentProps: {
        allowClear: true,
        getPopupContainer: () => document.body,
        filterOption: (input: string, option) => {
          return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
        options: [
          { value: 'String' },
          { value: 'Long' },
          { value: 'Integer' },
          { value: 'Boolean' },
          { value: 'Double' },
          { value: 'BigDecimal' },
          { value: 'LocalDateTime' },
          { value: 'LocalDate' },
          { value: 'LocalTime' },
        ],
      },
    },
    {
      title: t('devOperation.developer.defGenTableColumn.javaType'),
      dataIndex: 'javaType',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.javaField'),
      dataIndex: 'javaField',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.tsType'),
      dataIndex: 'tsType',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.size'),
      dataIndex: 'size',
      width: 100,
      editRow: true,
      editComponent: 'InputNumber',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isPk'),
      dataIndex: 'isPk',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isRequired'),
      dataIndex: 'isRequired',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },

    {
      title: t('devOperation.developer.defGenTableColumn.isLogicDeleteField'),
      dataIndex: 'isLogicDeleteField',
      width: 80,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isVersionField'),
      dataIndex: 'isVersionField',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isIncrement'),
      dataIndex: 'isIncrement',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.fill'),
      dataIndex: 'fill',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isEdit'),
      dataIndex: 'isEdit',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isList'),
      dataIndex: 'isList',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.isQuery'),
      dataIndex: 'isQuery',
      width: 60,
      editRow: true,
      editComponent: 'Checkbox',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.width'),
      dataIndex: 'width',
      width: 100,
      editRow: true,
      editComponent: 'InputNumber',
    },
    {
      title: t('devOperation.developer.defGenTableColumn.queryType'),
      dataIndex: 'queryType',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.component'),
      dataIndex: 'component',
      // width: 180,
      editRow: true,
      editComponent: 'ApiSelect',
      editComponentProps: {
        ...enumComponentProps(EnumEnum.ComponentEnum),
      },
    },
    {
      title: t('devOperation.developer.defGenTableColumn.dictType'),
      dataIndex: 'dictType',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.echoStr'),
      dataIndex: 'echoStr',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.enumStr'),
      dataIndex: 'enumStr',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.editDefValue'),
      dataIndex: 'editDefValue',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.editHelpMessage'),
      dataIndex: 'editHelpMessage',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.indexHelpMessage'),
      dataIndex: 'indexHelpMessage',
      // width: 180,
      editRow: true,
    },
    {
      title: t('devOperation.developer.defGenTableColumn.sortValue'),
      dataIndex: 'sortValue',
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

export const searchColumnFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'name',
      label: t('devOperation.developer.defGenTableColumn.name'),
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'comment',
      label: t('devOperation.developer.defGenTableColumn.comment'),
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
