<template>
  <PageWrapper dense contentClass="flex">
    <div class="m-4 p-4 overflow-hidden bg-white">
      <Tabs>
        <TabPane tab="生成信息" key="basic">
          <BasicForm @register="registerBasicForm" />
        </TabPane>
        <TabPane tab="配置信息" key="config"> field </TabPane>
      </Tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { detail, update } from '/@/api/devOperation/developer/defGenTable';
  import { baseEditFormSchema } from './defGenTable.data';

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
      const { currentRoute } = useRouter();

      const [registerBasicForm, { validate, setFieldsValue, updateSchema }] = useForm({
        labelWidth: 140,
        schemas: baseEditFormSchema((data) => {
          updateSchema(data);
        }),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      onMounted(async () => {
        const routeQuery = currentRoute.value?.params;

        await load(routeQuery.id as string);
      });

      async function load(id: string) {
        const record = await detail(id);
        setFieldsValue(record);
      }

      async function handleSubmit() {
        try {
          const params = await validate();

          console.log(params);

          // await update(params);
          createMessage.success('成功');
        } finally {
        }
      }

      return { t, registerBasicForm, handleSubmit };
    },
  });
</script>
