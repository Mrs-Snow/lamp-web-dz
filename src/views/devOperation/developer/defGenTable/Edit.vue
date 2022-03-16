<template>
  <PageWrapper dense contentClass="flex">
    <div class="m-4 p-4 overflow-hidden bg-white">
      <Tabs>
        <TabPane tab="基本信息" key="basic">
          <BasicForm @register="registerBasicForm" />
        </TabPane>
        <TabPane tab="配置信息" key="config">
          <BasicForm @register="registerConfigForm" />
        </TabPane>
      </Tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { Tabs } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { baseEditFormSchema, globalEditFormSchema } from './defGenTable.data';

  export default defineComponent({
    name: 'DefGenTableEdit',
    components: {
      BasicForm,
      PageWrapper,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup(_) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const [registerBasicForm, { validate }] = useForm({
        labelWidth: 100,
        schemas: baseEditFormSchema(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      const [registerConfigForm, { validate: validateConfig }] = useForm({
        labelWidth: 100,
        schemas: globalEditFormSchema(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          const params2 = await validateConfig();

          console.log(params);
          console.log(params2);
          createMessage.success('成功');
        } finally {
        }
      }

      return { t, registerBasicForm, registerConfigForm, handleSubmit };
    },
  });
</script>
