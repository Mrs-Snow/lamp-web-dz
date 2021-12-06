<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="30%"
    :maskClosable="false"
    title="初始化租户数据库表结构和初始数据"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TenantConnectTypeEnum } from '/@/enums/biz/tenant';

  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, initData } from '/@/api/devOperation/tenant/tenant';
  import { initDataFormSchema, customInitDataFormSchemaRules } from './tenant.data';

  export default defineComponent({
    name: 'TenantInitData',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const onChange = (e: ChangeEvent) => {
        let required = false;
        if (e.target?.value === TenantConnectTypeEnum.CUSTOM) {
          required = true;
        } else {
          clearValidate();
        }
        updateSchema(customInitDataFormSchemaRules(required));
      };

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate, clearValidate }] =
        useForm({
          labelWidth: 120,
          schemas: initDataFormSchema(onChange),
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        });

      const [registerDrawer, { setDrawerProps, closeDrawer, changeLoading }] = useDrawerInner(
        async (data) => {
          changeLoading(true);
          try {
            await resetFields();
            setDrawerProps({ confirmLoading: false });

            const record = { ...data.record };

            record.connectType = record?.connectType?.code || TenantConnectTypeEnum.SYSTEM;
            await setFieldsValue({
              ...record,
            });

            await getValidateRules(Api.InitData).then(async (rules) => {
              rules && rules.length > 0 && (await updateSchema(rules));
            });
          } finally {
            changeLoading(false);
          }
        },
      );

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });
          let flag = await initData(params);
          if (flag) {
            createMessage.success('初始化数据库、表结构、默认数据成功，请尽快初始化各个服务的链接');
            closeDrawer();
            emit('success');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
