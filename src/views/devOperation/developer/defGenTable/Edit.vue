<template>
  <PageWrapper :content="content" :title="title">
    <template #extra>
      <a-button v-if="activeKey === 'basic'" type="primary" @click="handleSubmit">保存</a-button>
    </template>

    <template #footer>
      <Tabs v-model:activeKey="activeKey" @change="changeTabs">
        <TabPane key="basic" tab="生成信息" />
        <TabPane key="field" tab="字段信息" />
      </Tabs>
    </template>

    <Loading
      :absolute="absolute"
      :background="background"
      :loading="loading"
      :theme="theme"
      :tip="tip"
    />

    <div class="overflow-hidden">
      <CollapseContainer ref="formCcRef" class="w-full bg-white rounded-md" title="生成信息">
        <BasicForm @register="registerBasicForm" />
      </CollapseContainer>
      <CollapseContainer ref="columnCcRef" class="w-full mt-5 bg-white rounded-md" title="字段信息">
        <DefGenTableColumn ref="columnRef" />
      </CollapseContainer>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { getValidateRules, RuleType } from '/@/api/lamp/common/formValidateService';
  import { Api, detail, update } from '/@/api/devOperation/developer/defGenTable';
  import { baseEditFormSchema, customFormSchemaRules } from './defGenTable.data';
  import { GenTypeEnum } from '/@/enums/biz/tenant';
  import DefGenTableColumn from './DefGenTableColumn2.vue';

  export default defineComponent({
    name: '修改代码配置',
    components: {
      BasicForm,
      PageWrapper,
      Loading,
      Tabs,
      TabPane: Tabs.TabPane,
      DefGenTableColumn,
      CollapseContainer,
    },
    setup(_) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { currentRoute } = useRouter();
      const formCcRef = ref<any>(null);
      const columnCcRef = ref<any>(null);
      const columnRef = ref<any>(null);
      const tableId = ref<string>('');

      const pageState = reactive({
        title: '修改字段配置',
        content: '',
        activeKey: 'basic',
      });
      const compState = reactive({
        absolute: false,
        loading: false,
        theme: 'dark',
        background: 'rgba(111,111,111,.7)',
        tip: '加载中...',
      });

      // 获取应用资源表单
      function getColumnRef() {
        return unref(columnRef);
      }

      function getFormCcRef() {
        return unref(formCcRef);
      }

      function getColumnCcRef() {
        return unref(columnCcRef);
      }

      function setLoading(loading: boolean) {
        compState.loading = loading;
      }

      const [registerBasicForm, { validate, getFieldsValue, setFieldsValue, updateSchema }] =
        useForm({
          name: 'basic',
          labelWidth: 140,
          schemas: baseEditFormSchema((data) => {
            updateSchema(data);
          }),
          showActionButtonGroup: false,
          baseColProps: { span: 24 },
          actionColOptions: {
            span: 23,
          },
        });

      onMounted(async () => {
        const routeParams = currentRoute.value?.params;
        const routeQuery = currentRoute.value?.query;
        tableId.value = routeParams.id as string;
        pageState.title = routeQuery.title as string;
        pageState.content = routeQuery.content as string;
        setLoading(true);
        try {
          await loadDetail();
        } catch (e) {
          console.error(e);
        }
        try {
          await getColumnRef().load(routeParams.id as string);
        } finally {
          setLoading(false);
        }
      });

      async function handleSubmit() {
        try {
          const params = await validate();

          await update(params);
          createMessage.success('成功');
        } finally {
        }
      }

      async function changeTabs(key: 'basic' | 'field') {
        if (key === 'field') {
          getFormCcRef().handleExpand(false);
          getColumnCcRef().handleExpand(true);
        } else {
          getFormCcRef().handleExpand(true);
          getColumnCcRef().handleExpand(false);
        }
      }

      async function loadDetail() {
        const record = await detail(unref(tableId));
        setFieldsValue(record);

        let validateApi = Api[VALIDATE_API[ActionEnum.EDIT]];
        const customRules = customFormSchemaRules(getFieldsValue);
        if (record.isDs) {
          customRules.push({
            field: 'dsValue',
            type: RuleType.append,
            rules: [{ required: true }],
          });
          updateSchema({
            field: 'isDs',
            colProps: {
              span: 12,
            },
          });
        } else {
          customRules.push({
            field: 'dsValue',
            type: RuleType.append,
            rules: [{ required: false }],
          });
          updateSchema({
            field: 'isDs',
            colProps: {
              span: 24,
            },
          });
        }
        if (GenTypeEnum.GEN === record.genType) {
          customRules.push({
            field: 'outputDir',
            type: RuleType.append,
            rules: [{ required: true }],
          });
          customRules.push({
            field: 'frontOutputDir',
            type: RuleType.append,
            rules: [{ required: true }],
          });
        } else {
          customRules.push({
            field: 'outputDir',
            type: RuleType.append,
            rules: [{ required: false }],
          });
          customRules.push({
            field: 'frontOutputDir',
            type: RuleType.append,
            rules: [{ required: false }],
          });
        }
        getValidateRules(validateApi, customRules).then(async (rules) => {
          rules && rules.length > 0 && (await updateSchema(rules));
        });
      }

      return {
        t,
        registerBasicForm,
        changeTabs,
        handleSubmit,
        columnRef,
        tableId,
        formCcRef,
        columnCcRef,
        ...toRefs(pageState),
        ...toRefs(compState),
      };
    },
  });
</script>
