import { FormSchema } from '/@/components/Table'
import { FormSchemaExt } from '/@/api/lamp/common/formValidateService'

// 编辑页字段
export const editFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'templateCode',
      label: '模板标识',
      component: 'Input',
      show: false
    },
    {
      field: 'content',
      label: 'content',
      component: 'Input',
      show: false
    },
    {
      label: '标题',
      field: 'title',
      component: 'Input',
      dynamicReadonly: true,
      colProps: { span: 12 }
    },
    {
      label: '模版名称',
      field: 'name',
      component: 'Input',
      dynamicReadonly: true,
      colProps: { span: 12 }
    },
    {
      label: '业务id',
      field: 'bizId',
      component: 'Input',
      colProps: { span: 12 }
    },
    {
      label: '业务类型',
      field: 'bizType',
      component: 'Input',
      colProps: { span: 12 }
    },
    {
      label: '发布人姓名',
      field: 'author',
      component: 'Input'
    },
    {
      label: '参数',
      field: 'paramList',
      component: 'Input',
      slot: 'paramList',
      required: true,
      defaultValue: []
    },
    {
      label: '接收人',
      field: 'recipientList',
      component: 'Input',
      slot: 'recipientList',
      defaultValue: []
    }
  ]
}

// 前端自定义表单验证规则
export const customFormSchemaRules = (getFieldsValue: () => Recordable): Partial<FormSchemaExt>[] => {
  return [
    // {
    //   field: 'paramList',
    //   type: RuleType.append,
    //   rules: [
    //     {
    //       trigger: ['change', 'blur'],
    //       async validator(_, value) {
    //         if (value === undefined) {
    //           return Promise.reject('不能为空')
    //         }
    //         const raw = toRaw(value)
    //         if (isArray(raw)) {
    //           if (raw.length > 0) {
    //             return Promise.resolve()
    //           } else {
    //             return Promise.reject('不能为空')
    //           }
    //         }
    //         if (value) {
    //           return Promise.resolve()
    //         }
    //         return Promise.reject('不能为空')
    //       }
    //     }
    //   ]
    // }
  ]
}
