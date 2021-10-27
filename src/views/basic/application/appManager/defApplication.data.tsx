import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { dictComponentProps, yesNoComponentProps } from '/@/utils/lamp/common';
import { DictEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { uploadApi } from '/@/api/sys/upload';
import { Tag } from 'ant-design-vue';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
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
      title: '有效期',
      dataIndex: 'expirationTime',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      customRender: ({ record }) => {
        // //0-过期 1-有效
        return (
          <Tag color={record.state === '1' ? 'success' : 'error'}>
            {record.state === '1' ? '有效' : '过期'}
          </Tag>
        );
      },
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
      label: t('devOperation.application.defApplication.name'),
      field: 'name',
      component: 'Input',
      colProps: { span: 5 },
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
