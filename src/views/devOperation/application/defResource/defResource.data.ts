import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { dictComponentProps, stateComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { ActionEnum, DictEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { ResourceOpenWithEnum, ResourceTypeEnum } from '/@/enums/biz/tenant';
import { check, checkName, checkPath } from '/@/api/devOperation/application/defResource';
import { isUrl } from '/@/utils/is';

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
      label: t('devOperation.application.defResource.applicationId'),
      field: 'applicationId',
      component: 'Input',
      defaultValue: '0',
      colProps: {
        span: 12,
      },
      show: false,
    },
    {
      label: t('devOperation.application.defResource.parentId'),
      field: 'parentId',
      component: 'Input',
      show: false,
      defaultValue: '0',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.application.defResource.parentId'),
      field: 'parentResourceType',
      component: 'Input',
      show: false,
    },
    {
      field: 'divider-selects1',
      component: 'Divider',
      label: '基础信息',
    },
    {
      label: t('devOperation.application.defResource.resourceType'),
      field: 'resourceType',
      component: 'ApiRadioGroup',
      defaultValue: ResourceTypeEnum.MENU,
      componentProps: {
        ...dictComponentProps(DictEnum.RESOURCE_TYPE, ResourceTypeEnum.API),
      },
      helpMessage: [
        '菜单：即左侧显示的菜单(肉眼可见的菜单)(包括N级菜单)',
        '视图：即需要配置在路由中，但需要隐藏的菜单, 如 资源维护',
        '功能：即页面上的非视图的按钮',
        '字段：即列表页或编辑页的字段',
      ],
      colProps: {
        span: 12,
      },
      dynamicRules: ({ model }) => {
        return [
          { required: true, message: '不能为空' },
          {
            trigger: ['change', 'blur'],
            validator: async (_, value) => {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (model?.parentResourceType === ResourceTypeEnum.VIEW) {
                if (value === ResourceTypeEnum.MENU) {
                  return Promise.reject('资源下不能添加菜单');
                }
              } else if (model?.parentResourceType === ResourceTypeEnum.FUNCTION) {
                if (value === ResourceTypeEnum.MENU) {
                  return Promise.reject('资源下不能添加菜单');
                } else if (value === ResourceTypeEnum.VIEW) {
                  return Promise.reject('资源下不能添加视图');
                }
              } else if (model?.parentResourceType === ResourceTypeEnum.FIELD) {
                return Promise.reject('字段下不能添加子资源');
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      label: t('devOperation.application.defResource.parentName'),
      field: 'parentName',
      component: 'Input',
      dynamicDisabled: true,
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.application.defResource.code'),
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
        return [ActionEnum.EDIT, ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('devOperation.application.defResource.name'),
      field: 'name',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicRules: ({ model }) => {
        return [
          { required: true, message: '请填写名称' },
          {
            trigger: ['change', 'blur'],
            async validator(_, value) {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (value) {
                if ([ResourceTypeEnum.VIEW, ResourceTypeEnum.MENU].includes(model.resourceType)) {
                  if (await checkName(value, model.applicationId, model?.id)) {
                    return Promise.reject(
                      t('devOperation.application.defResource.name') + '已经存在',
                    );
                  }
                }
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      label: t('devOperation.application.defResource.icon'),
      field: 'icon',
      component: 'IconPicker',
      componentProps: {
        copy: true,
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.application.defResource.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
      defaultValue: 1000,
      helpMessage: '升序，越小越靠前',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.application.defResource.state'),
      field: 'state',
      component: 'Switch',
      defaultValue: true,
      componentProps: {
        ...stateComponentProps(),
        'checked-children': t('lamp.common.enable'),
        'un-checked-children': t('lamp.common.disable'),
      },
      helpMessage: '禁用状态的资源不在可用',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('devOperation.application.defResource.isGeneral'),
      field: 'isGeneral',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        // size: 'default',
        ...yesNoComponentProps(),
        'checked-children': t('lamp.common.yes'),
        'un-checked-children': t('lamp.common.no'),
      },
      helpMessage: '公共资源无需分配权限即可访问',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '特性信息',
      helpMessage: ['每种类型拥有不同的字段'],
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.FIELD].includes(
          values.resourceType,
        );
      },
    },
    {
      label: t('devOperation.application.defResource.openWith'),
      field: 'openWith',
      component: 'ApiRadioGroup',
      defaultValue: ResourceOpenWithEnum.INNER_COMPONENT,
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.API].includes(
          values.resourceType,
        );
      },
      helpMessage: [
        '组件：在框架内打开组件页面',
        '内链：在框架内打开网页地址',
        '外链：新开窗口打开网页地址',
      ],
      componentProps: ({ formActionType }) => {
        return {
          ...dictComponentProps(DictEnum.RESOURCE_OPEN_WITH),
          onChange: (value: string) => {
            const { setFieldsValue, validateFields } = formActionType;
            switch (value) {
              case ResourceOpenWithEnum.INNER_CHAIN:
                break;
              case ResourceOpenWithEnum.OUTER_CHAIN:
                setFieldsValue({
                  component: 'IFRAME',
                });
                break;
              default:
                break;
            }
            // setFieldsValue({ openWith: value });
            validateFields(['path', 'component']);
          },
        };
      },
    },
    {
      label: t('devOperation.application.defResource.path'),
      field: 'path',
      component: 'Input',
      helpMessage: ['http开头表示外链跳转到指定网页', '相对地址会自动拼接父级路径'],
      itemProps: {
        extra: '地址栏#号后显示的地址，可以是相对或绝对地址',
      },
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.API].includes(
          values.resourceType,
        );
      },
      componentProps: ({ formActionType }) => {
        return {
          onChange: (e: ChangeEvent) => {
            const value = e.target.value;
            if (value) {
              if (isUrl(value)) {
                const { setFieldsValue } = formActionType;
                setFieldsValue({
                  component: 'IFRAME',
                  openWith: ResourceOpenWithEnum.OUTER_CHAIN,
                });
              }
            }
          },
        };
      },
      dynamicRules: ({ model }) => {
        return [
          { required: true, message: '不能为空' },
          {
            trigger: ['change', 'blur'],
            validator: async (_, value) => {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (value) {
                if (isUrl(value)) {
                  if (isUrl(model?.component)) {
                    return Promise.reject(
                      t('devOperation.application.defResource.path') +
                        '和' +
                        t('devOperation.application.defResource.component') +
                        '不能同时配置成连接',
                    );
                  }

                  if (![ResourceOpenWithEnum.OUTER_CHAIN].includes(model?.openWith)) {
                    return Promise.reject(
                      t('devOperation.application.defResource.path') +
                        `是网址时，${t(
                          'devOperation.application.defResource.openWith',
                        )}必选选择外链`,
                    );
                  }
                } else {
                  if (model.openWith === ResourceOpenWithEnum.OUTER_CHAIN) {
                    return Promise.reject(
                      `${t(
                        'devOperation.application.defResource.openWith',
                      )} 为外链时，只能填写网址`,
                    );
                  }
                  if (model?.parentId === '0' && !value.startsWith('/')) {
                    return Promise.reject(
                      '1级资源的' + t('devOperation.application.defResource.path') + '必须以/开头',
                    );
                  }
                  if (await checkPath(value, model.applicationId, model?.id)) {
                    return Promise.reject(
                      t('devOperation.application.defResource.path') + '已经存在',
                    );
                  }
                }
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      label: t('devOperation.application.defResource.component'),
      field: 'component',
      component: 'AutoComplete',
      itemProps: {
        extra: '前端页面代码在 src/views 目录下的相对地址.',
      },
      helpMessage: [
        '填写规则：',
        '目录(折叠菜单)：LAYOUT',
        '外链：IFRAME',
        '内链：配置http开头的网址',
        '页面：位于 src/views 目录下的相对路径',
      ],
      colProps: {
        span: 12,
      },
      componentProps: ({ formActionType }) => {
        return {
          allowClear: true,
          getPopupContainer: () => document.body,
          filterOption: (input: string, option) => {
            return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
          },
          options: [{ value: 'LAYOUT' }, { value: 'IFRAME' }],
          onChange: (value: string) => {
            if (value) {
              if (isUrl(value)) {
                const { setFieldsValue } = formActionType;
                setFieldsValue({
                  openWith: ResourceOpenWithEnum.INNER_CHAIN,
                });
              }
            }
          },
        };
      },
      dynamicDisabled: ({ values }) => {
        return (
          [ResourceOpenWithEnum.OUTER_CHAIN].includes(values.openWith) ||
          [ActionEnum.VIEW].includes(type.value)
        );
      },
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(values.resourceType);
      },
      dynamicRules: ({ model }) => {
        return [
          { required: true, message: '不能为空' },
          {
            trigger: ['change', 'blur'],
            async validator(_, value) {
              if (type.value === ActionEnum.VIEW) {
                return Promise.resolve();
              }
              if (value) {
                if (isUrl(value)) {
                  if (isUrl(model?.path)) {
                    return Promise.reject(
                      t('devOperation.application.defResource.path') +
                        '和' +
                        t('devOperation.application.defResource.component') +
                        '不能同时配置成连接',
                    );
                  }

                  if (model.openWith !== ResourceOpenWithEnum.INNER_CHAIN) {
                    return Promise.reject(
                      `配置为网址时，${t(
                        'devOperation.application.defResource.openWith',
                      )}必须设置为内链`,
                    );
                  }
                } else {
                  if (model.openWith === ResourceOpenWithEnum.INNER_CHAIN) {
                    return Promise.reject(
                      `${t(
                        'devOperation.application.defResource.openWith',
                      )} 为内链时，只能填写网址`,
                    );
                  }
                }
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
    {
      label: t('devOperation.application.defResource.redirect'),
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
      label: t('devOperation.application.defResource.subGroup'),
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
      label: t('devOperation.application.defResource.fieldIsSecret'),
      field: 'fieldIsSecret',
      component: 'Switch',
      defaultValue: false,
      componentProps: {
        // size: 'default',
        ...yesNoComponentProps(),
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
      label: t('devOperation.application.defResource.fieldIsEdit'),
      field: 'fieldIsEdit',
      component: 'Switch',
      defaultValue: true,
      componentProps: {
        // size: 'default',
        ...yesNoComponentProps(),
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
      label: t('devOperation.application.defResource.apiList'),
      field: 'resourceApiList',
      component: 'Input',
      slot: 'resourceApiList',
      ifShow: ({ values }) => {
        return [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.FUNCTION].includes(
          values.resourceType,
        );
      },
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '扩展信息',
    },
    {
      label: t('devOperation.application.defResource.metaJson'),
      field: 'metaJson',
      component: 'Input',
      slot: 'metaJson',
      helpMessage: ['在元数据中可以配置路由meta参数中的特殊参数'],
    },
    {
      label: t('devOperation.application.defResource.describe'),
      field: 'describe',
      component: 'InputTextArea',
      componentProps: {
        'auto-size': { minRows: 2, maxRows: 3 },
      },
    },
  ];
};

const CODE_REG = /^[a-zA-Z0-9_:,;*]*$/;

// 前端自定义表单验证规则
export const customFormSchemaRules = (type: Ref<ActionEnum>): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
          async validator(_, value) {
            if (type.value === ActionEnum.EDIT) {
              return Promise.resolve();
            }

            if (value) {
              if (!CODE_REG.test(value)) {
                return Promise.reject('编码只能包括: [英文大小写][数字][_][;][,][:][*]');
              }
              if (await check(value)) {
                return Promise.reject('编码已经存在');
              }
            }

            return Promise.resolve();
          },
        },
      ],
    },
  ];
};

// 元数据 表格
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

// 元数据 编辑表单
export const editMetaFormSchema = (): FormSchema[] => {
  return [
    {
      label: 'key',
      field: 'key',
      component: 'AutoComplete',
      required: true,
      helpMessage: ['新增key的选项后，同时也需要后端在RouterMeta实体类中新增字段'],
      componentProps: {
        allowClear: true,
        getPopupContainer: () => document.body,
        filterOption: (input: string, option) => {
          return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
        },
        options: [
          { value: 'title' },
          { value: 'ignoreKeepAlive' },
          { value: 'affix' },
          { value: 'transitionName' },
          { value: 'hideBreadcrumb' },
          { value: 'carryParam' },
          { value: 'hideChildrenInMenu' },
          { value: 'currentActiveMenu' },
          { value: 'hideTab' },
          { value: 'hideMenu' },
          { value: 'ignoreRoute' },
          { value: 'content' },
          { value: 'dot' },
          { value: 'type' },
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

// 资源接口 表格
export const resourceApiColumns: BasicColumn[] = [
  {
    title: 'resourceId',
    dataIndex: 'resourceId',
    ifShow: false,
  },
  // {
  //   title: t('devOperation.application.defResourceApi.springApplicationName'),
  //   dataIndex: 'springApplicationName',
  //   width: 150,
  // },
  // {
  //   title: t('devOperation.application.defResourceApi.controller'),
  //   dataIndex: 'controller',
  // },
  {
    title: t('devOperation.application.defResourceApi.name'),
    dataIndex: 'name',
  },
  {
    title: t('devOperation.application.defResourceApi.uri'),
    dataIndex: 'uri',
    slots: { customRender: 'uri' },
  },
];

// 资源接口 选择表单
export const selectResourceApiFormSchema = (
  handleServiceChange: Fn,
  handleControllerChange: Fn,
  handleUriChange: Fn,
  handleUriDeselect: Fn,
): FormSchema[] => {
  return [
    {
      label: t('devOperation.application.defResourceApi.springApplicationName'),
      field: 'service',
      component: 'Select',
      componentProps: () => {
        return {
          getPopupContainer: () => document.body,
          onChange: handleServiceChange,
          showSearch: true,
          options: [
            { value: 'base', label: '基础服务' },
            { value: 'oauth', label: '认证服务' },
            { value: 'system', label: '租户服务' },
            { value: 'gateway', label: '网关服务' },
          ],
        };
      },
    },
    {
      label: t('devOperation.application.defResourceApi.controller'),
      field: 'controller',
      component: 'Select',
      componentProps: {
        getPopupContainer: () => document.body,
        onChange: handleControllerChange,
        showSearch: true,
      },
    },
    {
      label: t('devOperation.application.defResourceApi.uri'),
      field: 'uri',
      component: 'Select',
      componentProps: {
        onChange: handleUriChange,
        onDeselect: handleUriDeselect,
        mode: 'multiple',
        'option-label-prop': 'label',
        getPopupContainer: () => document.body,
      },
    },
  ];
};

// 资源接口 编辑表单
export const editResourceApiFormSchema = (): FormSchema[] => {
  return [
    {
      label: t('devOperation.application.defResourceApi.springApplicationName'),
      field: 'springApplicationName',
      component: 'Select',
      componentProps: () => {
        return {
          getPopupContainer: () => document.body,
          options: [
            { value: 'lamp-base-server', label: '基础服务' },
            { value: 'lamp-oauth-server', label: '认证服务' },
            { value: 'lamp-system-server', label: '系统服务' },
            { value: 'lamp-gateway-server', label: '网关服务' },
          ],
        };
      },
      required: true,
    },
    {
      label: t('devOperation.application.defResourceApi.controller'),
      field: 'controller',
      component: 'Input',
      required: true,
    },
    {
      label: t('devOperation.application.defResourceApi.uri'),
      field: 'uri',
      component: 'Input',
      required: true,
    },
    {
      label: t('devOperation.application.defResourceApi.requestMethod'),
      field: 'requestMethod',
      component: 'Select',
      required: true,
      componentProps: () => {
        return {
          getPopupContainer: () => document.body,
          options: [
            { value: 'ALL', label: '所有' },
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
          ],
        };
      },
    },
    {
      label: t('devOperation.application.defResourceApi.name'),
      field: 'name',
      component: 'Input',
      required: true,
    },
  ];
};
