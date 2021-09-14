<template>
  <PageWrapper class="high-form" title="发送消息" contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
    <template #rightFooter>
      <a-button type="primary" @click="handleBack" class="ml-4"> 返回 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { get } from '/@/api/lamp/resources/msg';

  import { editFormSchema } from './msg.data';

  export default defineComponent({
    name: 'NoticeView',
    components: {
      BasicForm,
      PageWrapper,
    },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const { replace, currentRoute } = useRouter();
      const { closeCurrent } = useTabs();

      const [registerForm, { setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      onMounted(() => {
        const { params, query } = currentRoute.value;
        const id = params.id;
        load({ type: query?.type, id });
      });

      const load = async (data) => {
        await resetFields();

        const record = await get(data?.id);
        record.msgType = record?.msgType?.code;
        record.id = undefined;
        await setFieldsValue({ ...record });
      };

      async function handleBack() {
        await closeCurrent();
        replace({
          name: '通知公告',
        });
      }

      return { t, registerForm, handleBack };
    },
  });
</script>
