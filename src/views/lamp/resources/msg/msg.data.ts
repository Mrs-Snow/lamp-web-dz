import { h, unref } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';
import { Tinymce } from '/@/components/Tinymce/index';
import { ActionEnum, EnumEnum, FileBizTypeEnum, FileBucketEnum } from '/@/enums/commonEnum';
import { enumComponentProps } from '/@/utils/lamp/common';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.resources.msg.msgType'),
    dataIndex: 'msgType.desc',
    width: 120,
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
    title: t('lamp.common.createdTime'),
    dataIndex: 'createdTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: t('lamp.resources.msg.msgType'),
    field: 'msgType',
    component: 'ApiSelect',
    componentProps: {
      ...enumComponentProps(EnumEnum.MsgType),
    },
    colProps: { span: 5 },
  },
  {
    label: t('lamp.resources.msg.title'),
    field: 'title',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: t('lamp.resources.msg.author'),
    field: 'author',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createdTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

// 编辑页字段
export const editFormSchema = (type, msgTypeChange: Fn): FormSchema[] => {
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
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('lamp.resources.msg.author'),
      field: 'author',
      component: 'Input',
      colProps: {
        span: 12,
      },
      dynamicDisabled: () => {
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: t('lamp.resources.msg.msgType'),
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
        return unref(type) === ActionEnum.VIEW;
      },
    },
    {
      label: '接收类型',
      field: 'receiveType',
      component: 'Input',
      colProps: {
        span: 12,
      },
      slot: 'receiveType',
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
            bucket: FileBucketEnum.public,
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

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'title',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
    {
      field: 'msgType',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
  ];
};
