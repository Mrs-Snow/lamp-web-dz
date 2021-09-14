import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, EnumEnum } from '/@/enums/commonEnum';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/lamp/system/role';
import { enumComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns = (enumMap?: object): BasicColumn[] => {
  return [
    {
      title: t('lamp.system.role.code'),
      dataIndex: 'code',
      width: 180,
    },
    {
      title: t('lamp.system.role.name'),
      dataIndex: 'name',
      width: 180,
    },
    {
      title: t('lamp.system.role.describe'),
      dataIndex: 'describe',
      // width: 180,
    },
    {
      title: t('lamp.system.role.state'),
      dataIndex: 'state',
      width: 80,
      format: (text: string) => {
        return text ? t('lamp.common.enable') : t('lamp.common.disable');
      },
      filters: [
        { text: t('lamp.common.enable'), value: 'true' },
        { text: t('lamp.common.disable'), value: 'false' },
      ],
    },
    {
      title: t('lamp.system.role.readonly'),
      dataIndex: 'readonly',
      width: 110,
      format: (text: string) => {
        return text ? t('lamp.common.yes') : t('lamp.common.no');
      },
      filters: [
        { text: t('lamp.common.yes'), value: 'true' },
        { text: t('lamp.common.no'), value: 'false' },
      ],
    },
    {
      title: t('lamp.system.role.dsType'),
      dataIndex: 'dsType.desc',
      width: 150,
      filters: enumMap?.['DataScopeType'],
    },
    {
      title: t('lamp.common.createTime'),
      dataIndex: 'createTime',
      sorter: true,
      width: 180,
    },
  ];
};

export const searchFormSchema: FormSchema[] = [
  {
    label: t('lamp.system.role.code'),
    field: 'code',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('lamp.system.role.name'),
    field: 'name',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
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
    label: t('lamp.system.role.code'),
    field: 'code',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values?.id;
    },
  },
  {
    label: t('lamp.system.role.name'),
    field: 'name',
    component: 'Input',
  },
  {
    label: t('lamp.system.role.describe'),
    field: 'describe',
    component: 'Input',
  },
  {
    label: t('lamp.system.role.state'),
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
    label: t('lamp.system.role.dsType'),
    field: 'dsType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.DataScopeType),
    },
    defaultValue: 'SELF',
    helpMessage: [
      '配置数据权限后，在Mapper的方法参数中加入DataScope参数，即可实现单表数据权限控制',
      '系统会自动拦截并拼接sql，实现数据权限控制',
      '后端代码参考：UserMapper、DataScopeInnerInterceptor',
      '全部： 该角色能查看所有人的数据',
      '本级： 该角色只能查看本部门的数据',
      '本级及子级： 该角色能查看本部门以及子部门的数据',
      '自定义： 该角色能查看指定部门的数据',
      '个人： 该角色只能查看自己的数据',
    ],
  },
  {
    label: ' ',
    field: 'orgList',
    slot: 'orgList',
    component: 'Input',
    show: ({ values }) => {
      return values?.dsType === 'CUSTOMIZE';
    },
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
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
              return Promise.reject('角色编码已经存在，不允许重复！');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};

export const roleUserFormSchema: FormSchema[] = [
  {
    field: 'roleId',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: '用户',
    field: 'userIdList',
    slot: 'userIdList',
    component: 'Transfer',
  },
];
