import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { ActionEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/lamp/system/resource';

const { t } = useI18n();

// 资源表格
export const resourceColumns: BasicColumn[] = [
  {
    title: t('lamp.system.resource.code'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('lamp.system.resource.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];
// 资源搜索
export const resourceSearchFormSchema: FormSchema[] = [
  {
    label: t('lamp.system.resource.code'),
    field: 'code',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: t('lamp.system.resource.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 12 },
  },
];

export const resourceCustomFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await check(value))) {
              return Promise.reject('资源编码已经存在，不允许重复！');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
// 资源编辑表单
export const resourceEditFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuId',
    label: '所属菜单',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuName',
    label: '所属菜单',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: t('lamp.system.resource.code'),
    field: 'code',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values?.id;
    },
    helpMessage: [
      '参考shiro的权限配置方式，使用:',
      ' ; 作为权限编码分隔符',
      ' : 作为功能层级分隔符',
      ' , 作为多个功能点的分隔符',
      ' * 作为任意通配符',
      '并且： 建议以view、add、edit、delete、export、import、download、upload等关键词结尾',
      '如：authority:menu:add 只有菜单新增权限',
      '如：tenant:tenant:initConnect;tenant:datasourceConfig:view 租户初始化和数据源查询权限',
      '如：authority:resource:* 资源模块任意权限',
      '如：msg:sms:add,edit 短信功能的新增和修改权限',
    ],
  },
  {
    label: t('lamp.system.resource.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('lamp.system.resource.describe'),
    field: 'describe',
    component: 'InputTextArea',
    componentProps: {
      'auto-size': { minRows: 2, maxRows: 3 },
    },
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
    field: 'parentId',
    label: t('lamp.system.menu.parentId'),
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'label',
        key: 'id',
        value: 'id',
      },
      treeNodeFilterProp: 'title',
      getPopupContainer: () => document.body,
    },
    dynamicDisabled: ({ values }) => {
      return !!values?.id;
    },
  },
  {
    label: t('lamp.system.menu.label'),
    field: 'label',
    component: 'Input',
  },
  {
    label: t('lamp.system.menu.path'),
    field: 'path',
    component: 'Input',
    helpMessage: '浏览器地址栏 # 号后的路径',
  },
  {
    label: t('lamp.system.menu.component'),
    field: 'component',
    component: 'Input',
    helpMessage: '前端项目src/views后的页面路径',
  },

  {
    label: t('lamp.system.menu.icon'),
    field: 'icon',
    component: 'IconPicker',
  },
  {
    label: t('lamp.system.menu.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.enable'), value: true },
        { label: t('lamp.common.disable'), value: false },
      ],
    },
    defaultValue: true,
  },
  {
    label: t('lamp.system.menu.isGeneral'),
    field: 'isGeneral',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.yes'), value: true },
        { label: t('lamp.common.no'), value: false },
      ],
    },
    helpMessage: '无需分配给角色，大家都拥有的菜单',
    defaultValue: false,
    colProps: {
      span: 12,
    },
  },
  {
    label: t('lamp.system.menu.sortValue'),
    field: 'sortValue',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
  },
  {
    label: t('lamp.system.menu.group'),
    field: 'group',
    component: 'Input',
    helpMessage: '一个应用中有多组不同的菜单时使用',
  },
  {
    label: t('lamp.system.menu.describe'),
    field: 'describe',
    component: 'InputTextArea',
    componentProps: {
      'auto-size': { minRows: 2, maxRows: 3 },
    },
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
