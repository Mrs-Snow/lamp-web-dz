import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { dictComponentProps } from '/@/utils/lamp/common';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { ResourceTypeEnum } from '/@/enums/biz/tenant';
import { check, checkPath } from '/@/api/lamp/application/defResource';

const { t } = useI18n();

// 编辑页字段
export const editFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.application.defResource.applicationId'),
      field: 'applicationId',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.application.defResource.resourceType'),
      field: 'resourceType',
      component: 'ApiRadioGroup',
      // component: 'ApiSelect',
      defaultValue: ResourceTypeEnum.MENU,
      componentProps: {
        ...dictComponentProps(DictEnum.RESOURCE_TYPE, ResourceTypeEnum.API),
      },
      helpMessage: [
        '菜单即左侧显示的菜单',
        '视图即隐藏的菜单(需要配置在路由中)和页面上点击后需要通过路由打开的页面',
        '功能即页面上的非视图的按钮',
        '字段即列表页或编辑页的字段',
        '接口即后台的访问接口',
      ],
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.parentName'),
      field: 'parentName',
      component: 'Input',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.code'),
      field: 'code',
      component: 'Input',
      helpMessage: [
        '编码规则：按层级结构编码，使用:作为分隔符',
        '并且，建议以view、add、edit、delete、export、import、download、upload等关键词结尾',
        '如：authority:menu:add 只有菜单新增权限',
        '如：tenant:tenant:initConnect;tenant:datasourceConfig:view 租户初始化和数据源查询权限',
        '如：authority:resource:* 资源模块任意权限',
        '如：msg:sms:add,edit 短信功能的新增和修改权限',
      ],
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return type.value === ActionEnum.EDIT;
      },
    },
    {
      label: t('lamp.application.defResource.label'),
      field: 'label',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.icon'),
      field: 'icon',
      component: 'IconPicker',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
      defaultValue: 1000,
      helpMessage: '升序，越小越靠前',
      componentProps: {
        size: 'large',
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.state'),
      field: 'state',
      component: 'Switch',
      defaultValue: true,
      componentProps: {
        size: 'default',
        options: [
          { label: t('lamp.common.enable'), value: true },
          { label: t('lamp.common.disable'), value: false },
        ],
        'checked-children': t('lamp.common.enable'),
        'un-checked-children': t('lamp.common.disable'),
      },
      helpMessage: '禁用状态的资源不在可用',
      colProps: {
        span: 12,
      },
    },

    {
      label: t('lamp.application.defResource.isGeneral'),
      field: 'isGeneral',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        size: 'default',
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
        'checked-children': t('lamp.common.yes'),
        'un-checked-children': t('lamp.common.no'),
      },
      helpMessage: '公共资源无需分配权限即可访问',
      colProps: {
        span: 12,
      },
    },

    {
      label: t('lamp.application.defResource.path'),
      field: 'path',
      component: 'Input',
      helpMessage: [
        'http开头表示外链',
        'is_frame_src=true时，表示在框架类打开',
        '资源类型=接口时，表示后端接口请求地址.',
      ],
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.API].includes(
          values.resourceType,
        );
      },
    },
    {
      label: t('lamp.application.defResource.component'),
      field: 'component',
      component: 'Input',
      helpMessage: ['前端页面代码在src/views目录下的相对地址.'],
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(values.resourceType);
      },
    },
    {
      label: t('lamp.application.defResource.redirect'),
      field: 'redirect',
      component: 'Input',
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(values.resourceType);
      },
    },
    {
      label: t('lamp.application.defResource.subGroup'),
      field: 'subGroup',
      component: 'Input',
      helpMessage: ['用于区分不同位置的一组资源'],
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(values.resourceType);
      },
    },

    {
      label: t('lamp.application.defResource.fieldIsSecret'),
      field: 'fieldIsSecret',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        size: 'default',
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
        'checked-children': t('lamp.common.yes'),
        'un-checked-children': t('lamp.common.no'),
      },
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.FIELD;
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.fieldIsEdit'),
      field: 'fieldIsEdit',
      component: 'Switch',
      defaultValue: true,
      componentProps: {
        size: 'default',
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
        'checked-children': t('lamp.common.yes'),
        'un-checked-children': t('lamp.common.no'),
      },
      ifShow: ({ values }) => {
        return values.resourceType === ResourceTypeEnum.FIELD;
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.application.defResource.apiList'),
      field: 'apiList',
      component: 'Input',
      slot: 'apiList',
    },
    {
      label: t('lamp.application.defResource.metaJson'),
      field: 'metaJson',
      component: 'Input',
      slot: 'metaJson',
    },
    {
      label: t('lamp.application.defResource.describe'),
      field: 'describe',
      component: 'InputTextArea',
      componentProps: {
        'auto-size': { minRows: 2, maxRows: 3 },
      },
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (
  type: Ref<ActionEnum>,
  getFieldsValue: () => Recordable,
): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (type.value === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await check(value))) {
              return Promise.reject('编码已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      field: 'path',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          required: true,
          async validator(_, value) {
            if (value && (await checkPath(value, getFieldsValue()?.id))) {
              return Promise.reject(t('lamp.application.defResource.path') + '已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      field: 'component',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          required: true,
        },
      ],
    },
  ];
};

export const metaJsonColumns: BasicColumn[] = [
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: 'value',
    dataIndex: 'value',
    format: (text: string | number | boolean) => {
      if (text === true) {
        return 'true';
      } else if (text === false) {
        return 'false';
      } else {
        return text;
      }
    },
  },
];
export const editMetaFormSchema = (): FormSchema[] => {
  return [
    {
      label: 'key',
      field: 'key',
      component: 'AutoComplete',
      required: true,
      componentProps: {
        allowClear: true,
        filterOption: (input: string, option) => {
          return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
        options: [
          { value: 'title' },
          { value: 'ignoreKeepAlive' },
          { value: 'affix' },
          { value: 'frameSrc' },
          { value: 'transitionName' },
          { value: 'hideBreadcrumb' },
          { value: 'carryParam' },
          { value: 'hideChildrenInMenu' },
          { value: 'currentActiveMenu' },
          { value: 'hideTab' },
          { value: 'hideMenu' },
          { value: 'ignoreRoute' },
        ],
      },
    },
    {
      label: 'value',
      field: 'value',
      component: 'Input',
      required: true,
    },
  ];
};
