<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t(`common.title.${type}`)"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, save, update } from '/@/api/lamp/tenant/user';
  import { editFormSchema, customFormSchemaRules } from './user.data';

  export default defineComponent({
    name: 'GlobalUserEdit',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();

      const [
        registerForm,
        { setFieldsValue, resetFields, updateSchema, validate, getFieldsValue, validateFields },
      ] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(type, (value) => {
          if (value) {
            validateFields(['account']);
          }
        }),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        type.value = data?.type;

        let validateApi = Api.Save;
        if (unref(type) !== ActionEnum.ADD) {
          const record = { ...data.record };
          record.sex = record?.sex?.code;
          record.tenantCode = data?.tenantCode;
          await setFieldsValue({
            ...record,
          });
          validateApi = Api.Update;
        }
        if (unref(type) === ActionEnum.COPY) {
          validateApi = Api.Save;
        }

        getValidateRules(validateApi, customFormSchemaRules(type, getFieldsValue)).then((rules) => {
          updateSchema(rules);
        });
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setModalProps({ confirmLoading: true });

          if (unref(type) === ActionEnum.EDIT) {
            await update(params);
          } else {
            params.id = null;
            await save(params);
          }

          createMessage.success(t(`common.tips.${type.value}Success`));
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { t, type, registerModal, registerForm, handleSubmit };
    },
  });
</script>
