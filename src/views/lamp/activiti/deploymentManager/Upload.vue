<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="40%"
    :maskClosable="false"
    title="上传"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #file="{ model, field }">
        <a-input v-model:value="model[field]" placeholder="这里应该改成上传组件。" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { upload } from '/@/api/lamp/activiti/deployment';
  import { customFormSchemaRules, editFormSchema } from './deployment.data';

  export default defineComponent({
    name: 'DeploymentUpload',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        type.value = data?.type;

        const record = { ...data?.record };
        if (unref(type) === ActionEnum.EDIT) {
        } else {
          record.id = undefined;
        }

        await setFieldsValue({ ...record });

        await updateSchema(customFormSchemaRules(type));
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });

          await upload(params);

          createMessage.success(t(`common.tips.${type.value}Success`));
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { t, registerDrawer, registerForm, type, handleSubmit };
    },
  });
</script>
