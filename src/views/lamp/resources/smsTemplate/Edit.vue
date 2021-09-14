<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="30%"
    :maskClosable="false"
    :title="t(`common.title.${type}`)"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { Api, save, update } from '/@/api/lamp/resources/smsTemplate';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './smsTemplate.data';

  export default defineComponent({
    name: 'SmsTemplateEdit',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 120,
        schemas: editFormSchema(type),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        type.value = data?.type;

        let validateApi = Api.Save;
        const record = { ...data?.record };
        record.providerType = data?.record?.providerType?.code;
        if (unref(type) === ActionEnum.EDIT) {
          validateApi = Api.Update;
        } else {
          record.id = undefined;
        }

        await setFieldsValue({ ...record });

        getValidateRules(validateApi, customFormSchemaRules(type)).then(async (rules) => {
          rules && rules.length > 0 && (await updateSchema(rules));
        });
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });

          if (unref(type) === ActionEnum.EDIT) {
            await update(params);
          } else {
            await save(params);
          }
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
