import { Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { stateComponentProps } from '/@/utils/lamp/common';
import { ActionEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { tree } from '/@/api/basic/user/baseOrg';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.system.baseRole.name'),
      dataIndex: 'name',
      // width: 180,
    },
  ];
};

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'name',
      label: t('basic.system.baseRole.name'),
      component: 'Input',
      colProps: { span: 12 },
    },
  ];
};

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
      label: t('basic.system.baseRole.code'),
      field: 'code',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.name'),
      field: 'name',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.remarks'),
      field: 'remarks',
      component: 'Input',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.system.baseRole.state'),
      field: 'state',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};

// 角色-员工列表字段
export const roleEmployeeColumns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.tenant.defUser.username'),
      dataIndex: 'defUser.username',
      // width: 180,
    },
    {
      title: t('devOperation.tenant.defUser.mobile'),
      dataIndex: 'defUser.mobile',
      // width: 180,
    },
    {
      title: t('basic.user.baseEmployee.realName'),
      dataIndex: 'realName',
      // width: 180,
    },
  ];
};
// 角色-员工搜索字段
export const roleEmployeeSearchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'username',
      label: t('devOperation.tenant.defUser.username'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'mobile',
      label: t('devOperation.tenant.defUser.mobile'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'realName',
      label: t('basic.user.baseEmployee.realName'),
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'orgIdList',
      label: '所在部门',
      component: 'ApiTreeSelect',
      componentProps: {
        api: tree,
        labelField: 'name',
        valueField: 'id',
        allowClear: true,
        multiple: true,
      },
      colProps: { span: 8 },
    },
    {
      field: 'scope',
      label: '范围',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '全部', value: '-1' },
          { label: '已绑定', value: '1' },
          { label: '未绑定', value: '2' },
        ],
      },
      defaultValue: '-1',
      colProps: { span: 8 },
    },
  ];
};
