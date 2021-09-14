import { h } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { Tinymce } from '/@/components/Tinymce/index';
import { EnumEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { enumComponentProps } from '/@/utils/lamp/common';
import { Tag } from 'ant-design-vue';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.resources.msg.msgType'),
    dataIndex: 'msgType.desc',
    width: 100,
  },
  {
    title: t('lamp.resources.msg.title'),
    dataIndex: 'title',
    // width: 180,
  },
  {
    title: t('lamp.resources.msg.author'),
    dataIndex: 'author',
    width: 120,
  },
  {
    title: t('lamp.resources.msg.isRead'),
    dataIndex: 'isRead',
    width: 100,
    customRender: ({ record }) => {
      const isRead = !!record.isRead;
      const color = isRead ? 'green' : 'red';
      const text = isRead ? t('lamp.common.read') : t('lamp.common.unread');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('lamp.resources.msg.readTime'),
    dataIndex: 'readTime',
    width: 180,
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema = (msgTypeChange: Fn): FormSchema[] => {
  return [
    {
      label: t('lamp.resources.msg.msgType'),
      field: 'msgType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.MsgType),
        onChange: msgTypeChange,
      },
      defaultValue: 'TO_DO',
      colProps: { span: 6 },
    },
    {
      label: t('lamp.resources.msg.isRead'),
      field: 'isRead',
      component: 'Select',
      componentProps: {
        options: [
          {
            label: t('lamp.common.read'),
            value: 'true',
            key: '1',
          },
          {
            label: t('lamp.common.unread'),
            value: 'false',
            key: '0',
          },
        ],
      },
      colProps: { span: 6 },
    },
    {
      label: t('lamp.resources.msg.title'),
      field: 'title',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: t('lamp.resources.msg.author'),
      field: 'author',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'createTimeRange',
      label: t('lamp.common.createTime'),
      component: 'RangePicker',
      colProps: { span: 6 },
    },
  ];
};

// 编辑页字段
export const editFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      show: false,
    },
    {
      label: t('lamp.resources.msg.title'),
      field: 'title',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.resources.msg.author'),
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.resources.msg.msgType'),
      field: 'msgType',
      component: 'ApiSelect',
      componentProps: {
        ...enumComponentProps(EnumEnum.MsgType),
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: t('lamp.resources.msg.content'),
      field: 'content',
      component: 'Input',
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          uploadParams: {
            bizType: FileBizTypeEnum.EXTEND_MSG_CONTENT,
          },
        });
      },
    },
    {
      label: t('lamp.resources.msg.isSingleHandle'),
      field: 'isSingleHandle',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: t('lamp.common.yes'), value: true },
          { label: t('lamp.common.no'), value: false },
        ],
      },
      defaultValue: true,
      ifShow: false,
    },
  ];
};
