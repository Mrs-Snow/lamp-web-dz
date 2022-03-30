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
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { editFormSchema } from './baseOperationLog.data';

  export default defineComponent({
    name: 'BaseOperationLogEdit',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref<ActionEnum>(ActionEnum.VIEW);
      const [registerForm, { setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(type),
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
        actionColOptions: {
          span: 23,
        },
        disabled: true,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });

        await resetFields();
        type.value = data?.type || ActionEnum.ADD;

        // 赋值
        const record = { ...data?.record };
        await setFieldsValue(record);
      });

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { type, t, registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
