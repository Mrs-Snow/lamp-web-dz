import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { dictComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { DictEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { uploadApi } from '/@/api/sys/upload';
import { RoleEnum } from '/@/enums/roleEnum';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('devOperation.application.defApplication.appKey'),
      dataIndex: 'appKey',
      // width: 180,
    },
    {
      title: t('devOperation.application.defApplication.name'),
      dataIndex: 'name',
      // width: 180,
    },
    {
      title: t('devOperation.application.defApplication.version'),
      dataIndex: 'version',
      // width: 180,
    },
    {
      title: t('devOperation.application.defApplication.type'),
      dataIndex: 'echoMap.type',
      // width: 180,
    },
    {
      title: t('devOperation.application.defApplication.isVisible'),
      dataIndex: 'isVisible',
      auth: RoleEnum.APPLICATION_IS_VISIBLE,
      // width: 180,
    },
    {
      title: t('devOperation.application.defApplication.sortValue'),
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

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      label: t('devOperation.application.defApplication.appKey'),
      field: 'appKey',
      component: 'Input',
      colProps: { span: 5 },
    },
    {
      label: t('devOperation.application.defApplication.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 5 },
    },
    {
      label: t('devOperation.application.defApplication.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.APPLICATION_TYPE),
      },
      colProps: { span: 5 },
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
export const editFormSchema = (_): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('devOperation.application.defApplication.logo'),
      field: 'appendixIcon',
      component: 'CropperAvatar',
      componentProps: {
        uploadApi: uploadApi,
        uploadParams: { bizType: FileBizTypeEnum.DEF_APPLICATION_LOGO },
      },
    },
    {
      label: t('devOperation.application.defApplication.name'),
      field: 'name',
      component: 'Input',
    },
    {
      label: t('devOperation.application.defApplication.version'),
      field: 'version',
      component: 'Input',
    },
    {
      label: t('devOperation.application.defApplication.type'),
      field: 'type',
      component: 'ApiSelect',
      componentProps: {
        ...dictComponentProps(DictEnum.APPLICATION_TYPE),
      },
    },
    {
      label: t('devOperation.application.defApplication.introduce'),
      field: 'introduce',
      component: 'Input',
    },
    {
      label: t('devOperation.application.defApplication.remark'),
      field: 'remark',
      component: 'InputTextArea',
    },
    {
      label: t('devOperation.application.defApplication.url'),
      field: 'url',
      component: 'Input',
    },
    {
      label: t('devOperation.application.defApplication.isVisible'),
      field: 'isVisible',
      component: 'RadioButtonGroup',
      componentProps: {
        ...yesNoComponentProps(),
      },
      defaultValue: true,
    },
    {
      label: t('devOperation.application.defApplication.sortValue'),
      field: 'sortValue',
      component: 'InputNumber',
    },
  ];
};

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [];
};
