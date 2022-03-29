<template>
  <PageWrapper class="high-form" title="发送消息" contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
    <template #rightFooter>
      <a-button v-if="type !== ActionEnum.VIEW" type="primary" @click="handleSubmit" class="ml-4">
        立即发送
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter } from 'vue-router';
  import { RouteEnum } from '/@/enums/biz/tenant';
  import { ActionEnum, MsgTypeEnum } from '/@/enums/commonEnum';
  import { get } from '/@/api/basic/msg/eMsg';
  import { editFormSchema } from './myMsg.data';

  export default defineComponent({
    name: 'EMsgEdit',
    components: {
      BasicForm,
      PageWrapper,
    },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { replace, currentRoute } = useRouter();
      const { closeCurrent } = useTabs();

      const formState = reactive({
        receiveType: 'user',
        employeeIdList: [] as string[],
        roleCodeList: [] as string[],
        employeeList: [] as any[],
        roleList: [] as any[],
      });

      const [registerForm, { setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(type, msgTypeChange),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      function msgTypeChange(value) {
        if ([MsgTypeEnum.NOTIFY, MsgTypeEnum.NOTICE].includes(value)) {
          formState.employeeIdList = [];
          formState.roleCodeList = [];
        }
      }

      onMounted(() => {
        const { params } = currentRoute.value;
        const id = params.id;
        load({ type: params?.type, id });
      });

      const load = async (data: Recordable) => {
        await resetFields();
        type.value = data?.type;

        const record = await get(data?.id);
        await setFieldsValue({ ...record });
      };

      async function handleSubmit() {
        try {
          await closeCurrent();
          replace({ name: RouteEnum.BASIC_MSG });
        } finally {
        }
      }

      return { t, registerForm, type, handleSubmit, formState, ActionEnum, MsgTypeEnum };
    },
  });
</script>
