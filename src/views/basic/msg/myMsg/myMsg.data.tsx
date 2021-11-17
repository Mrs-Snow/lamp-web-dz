import { h, Ref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { enumComponentProps } from '/@/utils/lamp/common';
import { stateComponentProps } from '/@/utils/lamp/common';
import { Tinymce } from '/@/components/Tinymce/index';
import { ActionEnum, EnumEnum, FileBizTypeEnum, FileBucketEnum } from '/@/enums/commonEnum';

const { t } = useI18n();
// 列表页字段
export const columns = (): BasicColumn[] => {
  return [
    {
      title: t('basic.msg.eMsg.msgType'),
      dataIndex: 'msgType.desc',
      width: 120,
    },
    {
      title: t('basic.msg.eMsg.title'),
      dataIndex: 'title',
      // width: 180,
    },
    {
      title: t('basic.msg.eMsg.author'),
      dataIndex: 'author',
      width: 120,
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
      label: t('basic.msg.eMsg.msgType'),
      field: 'msgType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.MsgType),
      },
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.eMsg.title'),
      field: 'title',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      label: t('basic.msg.eMsg.author'),
      field: 'author',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createdTime'),
      component: 'RangePicker',
      colProps: { span: 8 },
    },
  ];
};

// 编辑页字段
export const editFormSchema = (type: Ref<ActionEnum>, msgTypeChange: Fn): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('basic.msg.eMsg.title'),
      field: 'title',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.msg.eMsg.author'),
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: t('basic.msg.eMsg.msgType'),
      field: 'msgType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.MsgType),
        onChange: msgTypeChange,
      },
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
    },
    {
      label: '接收人员',
      field: 'receiveType',
      component: 'Input',
      colProps: {
        span: 12,
      },
      slot: 'receiveType',
    },
    {
      label: t('basic.msg.eMsg.content'),
      field: 'content',
      component: 'Input',
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          options: {
            readonly: [ActionEnum.VIEW].includes(type.value),
          },
          onChange: (value: string) => {
            model[field] = value;
          },
          uploadParams: {
            bizType: FileBizTypeEnum.EXTEND_MSG_CONTENT,
            bucket: FileBucketEnum.public,
          },
        });
      },
    },
    {
      label: t('basic.msg.eMsg.isSingleHandle'),
      field: 'isSingleHandle',
      component: 'RadioButtonGroup',
      dynamicDisabled: () => {
        return [ActionEnum.VIEW].includes(type.value);
      },
      componentProps: {
        ...stateComponentProps(),
      },
      defaultValue: true,
      ifShow: false,
    },
  ];
};
