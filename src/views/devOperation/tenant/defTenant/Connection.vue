<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="30%"
    :maskClosable="false"
    title="初始化数据和数据源"
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
  import { useGlobSetting } from '/@/hooks/setting';
  import { MultiTenantTypeEnum, TenantConnectTypeEnum } from '/@/enums/biz/tenant';

  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, initConnect } from '/@/api/devOperation/tenant/tenant';
  import { query } from '/@/api/devOperation/tenant/datasourceConfig';
  import {
    connectionFormSchema,
    getUpdateOptions,
    customConnectionFormSchemaRules,
  } from './tenant.data';

  export default defineComponent({
    name: 'TenantConnection',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const globSetting = useGlobSetting();

      const onChange = (e: ChangeEvent) => {
        let required = false;
        if (e.target?.value === TenantConnectTypeEnum.REMOTE) {
          required = true;
        } else {
          clearValidate();
        }
        updateSchema(customConnectionFormSchemaRules(required));
      };

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate, clearValidate }] =
        useForm({
          labelWidth: 120,
          schemas: connectionFormSchema(onChange),
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        });

      async function loadUpdateOptions() {
        if (
          globSetting.multiTenantType === MultiTenantTypeEnum.DATASOURCE ||
          globSetting.multiTenantType === MultiTenantTypeEnum.DATASOURCE_COLUMN
        ) {
          const configList = await query();
          const optionList = configList.map((item) => {
            return {
              value: item.id,
              label: `[${item.name}](${item.username})(${item.driverClassName})`,
            };
          });

          const updateOptions = getUpdateOptions(optionList);
          updateSchema(updateOptions);
        }
      }

      const [registerDrawer, { setDrawerProps, closeDrawer, changeLoading }] = useDrawerInner(
        async (data) => {
          changeLoading(true);
          await resetFields();
          setDrawerProps({ confirmLoading: false });

          await loadUpdateOptions();

          const record = { ...data.record };
          record.tenant = record?.code;

          record.connectType = record?.connectType?.code || TenantConnectTypeEnum.LOCAL;
          await setFieldsValue({
            ...record,
          });

          const formSchemaRules = await getValidateRules(Api.InitConnect);
          updateSchema(formSchemaRules);

          changeLoading(false);
        },
      );

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });
          let flag = await initConnect(params);
          if (flag) {
            createMessage.success('初始化成功');
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
