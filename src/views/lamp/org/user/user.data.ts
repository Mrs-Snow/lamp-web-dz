import { unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { ActionEnum, DictEnum, EnumEnum } from '/@/enums/commonEnum';
import { enumComponentProps, dictComponentProps } from '/@/utils/lamp/common';
import { tree } from '/@/api/lamp/org/org';
import { query } from '/@/api/lamp/org/station';
import { check } from '/@/api/lamp/org/user';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns = (enumMap?: object, dictMap?: object): BasicColumn[] => {
  return [
    {
      title: t('lamp.org.user.avatar'),
      dataIndex: 'avatar',
      // width: 180,
      slots: { customRender: 'avatar' },
    },
    {
      title: t('lamp.org.user.account'),
      dataIndex: 'account',
    },
    {
      title: t('lamp.org.user.name'),
      dataIndex: 'name',
    },
    {
      title: t('lamp.org.user.orgId'),
      dataIndex: 'echoMap.orgId.label',
    },
    {
      title: t('lamp.org.user.stationId'),
      dataIndex: 'echoMap.stationId',
    },
    {
      title: t('lamp.org.user.email'),
      dataIndex: 'email',
      width: 200,
    },
    {
      title: t('lamp.org.user.mobile'),
      dataIndex: 'mobile',
      width: 120,
    },
    {
      title: t('lamp.org.user.sex'),
      dataIndex: 'sex.desc',
      width: 70,
      filters: enumMap?.['Sex'],
    },
    {
      title: t('lamp.org.user.state'),
      dataIndex: 'state',
      width: 50,
      format: (text) => {
        return text ? t('lamp.common.enable') : t('lamp.common.disable');
      },
    },
    {
      title: t('lamp.org.user.nation'),
      dataIndex: 'echoMap.nation',
      width: 70,
      filters: dictMap?.['NATION'],
    },
    {
      title: t('lamp.org.user.education'),
      dataIndex: 'echoMap.education',
      width: 70,
      filters: dictMap?.['EDUCATION'],
    },
    {
      title: t('lamp.org.user.positionStatus'),
      dataIndex: 'echoMap.positionStatus',
      width: 100,
      filters: dictMap?.['POSITION_STATUS'],
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
    label: t('lamp.org.user.account'),
    field: 'account',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('lamp.org.user.name'),
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
export const editFormSchema = (type): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.org.user.account'),
      field: 'account',
      component: 'Input',
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.EDIT;
      },
    },
    {
      label: t('lamp.org.user.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('lamp.org.user.orgId'),
      field: 'orgId',
      component: 'ApiTreeSelect',
      componentProps: {
        api: tree,
        labelField: 'label',
        valueField: 'id',
        allowClear: true,
      },
    },
    {
      label: t('lamp.org.user.stationId'),
      field: 'stationId',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
    },
    {
      label: t('lamp.org.user.email'),
      field: 'email',
      component: 'Input',
    },
    {
      label: t('lamp.org.user.mobile'),
      field: 'mobile',
      component: 'Input',
    },
    {
      label: t('lamp.org.user.sex'),
      field: 'sex',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.Sex),
      },
    },
    {
      label: t('lamp.org.user.state'),
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
    // {
    //   label: t('lamp.org.user.avatar'),  // 头像一般只有自己会改吧？
    //   field: 'avatar',
    //   component: 'Input',
    // },
    {
      label: t('lamp.org.user.nation'),
      field: 'nation',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.NATION),
      },
    },
    {
      label: t('lamp.org.user.education'),
      field: 'education',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.EDUCATION),
      },
    },
    {
      label: t('lamp.org.user.positionStatus'),
      field: 'positionStatus',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.POSITION_STATUS),
      },
    },
    {
      label: t('lamp.org.user.workDescribe'),
      field: 'workDescribe',
      component: 'Input',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (type): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'account',
      type: RuleType.append,
      rules: [
        {
          trigger: 'blur',
          async validator(_, value) {
            if (unref(type) === ActionEnum.EDIT) {
              return Promise.resolve();
            }
            if (value && (await check(value))) {
              return Promise.reject('账号已经存在');
            }
            return Promise.resolve();
          },
        },
      ],
    },
  ];
};
