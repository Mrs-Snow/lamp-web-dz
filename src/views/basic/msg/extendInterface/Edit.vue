<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModel"
    :title="t(`common.title.${type}`)"
    :maskClosable="false"
    @ok="handleSubmit"
    :keyboard="true"
  >
    <BasicForm @register="registerForm">
      <template #script="{ model, field }">
        <CodeEditor :tabSize="4" v-model:value="model[field]" :mode="MODE.GROOVY" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { Api, save, update } from '/@/api/basic/msg/extendInterface';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './extendInterface.data';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';

  export default defineComponent({
    name: '编辑短信模板维护',
    components: { BasicModal, BasicForm, CodeEditor },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref<ActionEnum>(ActionEnum.ADD);
      const { createMessage } = useMessage();

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate, resetSchema }] =
        useForm({
          name: 'ExtendInterfaceEdit',
          labelWidth: 100,
          schemas: editFormSchema(type),
          showActionButtonGroup: false,
          disabled: (_) => {
            return unref(type) === ActionEnum.VIEW;
          },
          baseColProps: { span: 24 },
          actionColOptions: {
            span: 23,
          },
        });

      const [registerModel, { setModalProps: setProps, closeModal: close }] = useModalInner(
        async (data) => {
          setProps({ confirmLoading: false });
          await resetSchema(editFormSchema(type));
          await resetFields();
          type.value = data?.type || ActionEnum.ADD;

          if (unref(type) !== ActionEnum.ADD) {
            // 赋值
            const record = { ...data?.record };
            await setFieldsValue(record);
          }

          if (unref(type) !== ActionEnum.VIEW) {
            let validateApi = Api[VALIDATE_API[unref(type)]];
            await getValidateRules(validateApi, customFormSchemaRules(type)).then(async (rules) => {
              rules && rules.length > 0 && (await updateSchema(rules));
            });
          }
        },
      );

      async function handleSubmit() {
        try {
          const params = await validate();
          setProps({ confirmLoading: true });

          if (unref(type) !== ActionEnum.VIEW) {
            if (unref(type) === ActionEnum.EDIT) {
              await update(params);
            } else {
              params.id = null;
              await save(params);
            }
            createMessage.success(t(`common.tips.${type.value}Success`));
          }
          close();
          emit('success');
        } finally {
          setProps({ confirmLoading: false });
        }
      }

      return { type, t, registerModel, registerForm, handleSubmit, MODE };
    },
  });
</script>

<style lang="less" scoped>
  //.code {
  //  position: absolute;
  //  left: 0;
  //  right: 0;
  //  top: 0;
  //  bottom: 0;
  //}
</style>
<style lang="less">
  .CodeMirror {
    height: 100%;
  }
</style>
