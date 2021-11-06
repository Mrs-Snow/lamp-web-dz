<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="30%"
    :maskClosable="false"
    title="链接数据源"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template
        v-for="servicePrefix in state.serviceMap"
        :key="servicePrefix"
        #[servicePrefix]="{ model }"
      >
        <Tag :color="state[servicePrefix] ? 'success' : 'error'">
          {{ state[servicePrefix] ? '已链接' : '未链接' }}
        </Tag>
        <a-button
          type="link"
          v-if="!state[servicePrefix]"
          @click="linkDataSource(servicePrefix, model)"
          :loading="state.loading[servicePrefix]"
          >立即链接</a-button
        >
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { checkDs, initConnect, findOnlineServicePrefix } from '/@/api/devOperation/tenant/tenant';
  import { linkFormSchema } from './tenant.data';

  export default defineComponent({
    name: 'TenantLinkDataSource',
    components: { BasicDrawer, BasicForm, Tag },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const state = reactive<Recordable>({
        serviceMap: {},
        loading: {},
      });

      const [registerForm, { setFieldsValue, resetFields, resetSchema, appendSchemaByField }] =
        useForm({
          labelWidth: 150,
          schemas: linkFormSchema(),
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        });

      const [registerDrawer, { setDrawerProps, closeDrawer, changeLoading }] = useDrawerInner(
        async (data) => {
          try {
            changeLoading(true);
            await resetSchema(linkFormSchema());
            await resetFields();
            const record = { ...data.record };
            await setFieldsValue({
              ...record,
            });
            const serviceMap = await findOnlineServicePrefix();
            state.serviceMap = serviceMap;
            for (const serviceName in serviceMap) {
              const servicePrefix = serviceMap[serviceName];

              state[servicePrefix] = await checkDs(servicePrefix, record.id);
              appendSchemaByField(
                {
                  field: `${serviceName}`,
                  component: 'Input',
                  label: `${serviceName}`,
                  slot: `${servicePrefix}`,
                },
                '',
              );
            }
          } finally {
            changeLoading(false);
          }
        },
      );

      async function linkDataSource(servicePrefix: string, tenant: Recordable) {
        console.log(servicePrefix, tenant);
        try {
          state.loading[servicePrefix] = true;
          state[servicePrefix] = await initConnect(servicePrefix, tenant.id);
          createMessage.success('链接成功');
        } finally {
          state.loading[servicePrefix] = false;
        }
      }

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { state, registerDrawer, registerForm, handleSubmit, linkDataSource };
    },
  });
</script>
