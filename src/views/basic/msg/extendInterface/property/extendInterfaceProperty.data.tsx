import { useI18n } from '/@/hooks/web/useI18n';
import { VxeGridPropTypes } from 'vxe-table';
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const formItems = (): any[] => {
  return [
    {
      title: t('basic.msg.extendInterfaceProperty.name'),
      field: 'name',
      itemRender: { name: '$input', props: { placeholder: '请输入' } },
    },
    {
      title: t('basic.msg.extendInterfaceProperty.key'),
      field: 'key',
      itemRender: { name: '$input', props: { placeholder: '请输入' } },
    },
    {
      title: t('basic.msg.extendInterfaceProperty.value'),
      field: 'value',
      itemRender: { name: '$input', props: { placeholder: '请输入' } },
    },
    {
      span: 24,
      align: 'center',
      collapseNode: true,
      itemRender: {
        name: '$buttons',
        children: [
          {
            props: {
              type: 'submit',
              content: t('common.queryText'),
              status: 'primary',
            },
          },
          { props: { type: 'reset', content: t('common.resetText') } },
        ],
      },
    },
  ];
};

export const columns = (): VxeGridPropTypes.Columns => {
  return [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', field: 'seq', width: 40, fixed: 'left' },
    {
      field: 'name',
      title: t('basic.msg.extendInterfaceProperty.name'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      field: 'key',
      title: t('basic.msg.extendInterfaceProperty.key'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      field: 'value',
      title: t('basic.msg.extendInterfaceProperty.value'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      field: 'remarks',
      title: t('basic.msg.extendInterfaceProperty.remarks'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      title: t('common.column.action'),
      width: 160,
      fixed: 'right',
      slots: { default: 'operate' },
    },
  ];
};

export const customFormSchemaRules = (): Partial<FormSchemaExt>[] => {
  return [];
};
