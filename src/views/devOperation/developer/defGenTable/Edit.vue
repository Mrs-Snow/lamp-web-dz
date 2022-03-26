<template>
  <div class="m-4 p-4 overflow-hidden bg-white">
    <Loading
      :absolute="absolute"
      :background="background"
      :loading="loading"
      :theme="theme"
      :tip="tip"
    />
    <Tabs v-model:activeKey="activeKey" @change="changeTabs">
      <TabPane key="basic" tab="生成信息">
        <BasicForm @register="registerBasicForm" />
      </TabPane>
      <TabPane key="field" tab="配置信息">
        <DefGenTableColumn ref="columnRef" />
      </TabPane>
      <template #rightExtra>
        <a-button v-if="activeKey === 'basic'" type="primary" @click="handleSubmit">保存</a-button>
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { getValidateRules, RuleType } from '/@/api/lamp/common/formValidateService';
  import { Api, detail, update } from '/@/api/devOperation/developer/defGenTable';
  import { baseEditFormSchema, customFormSchemaRules } from './defGenTable.data';
  import { GenTypeEnum } from '/@/enums/biz/tenant';
  import DefGenTableColumn from './DefGenTableColumn.vue';

  export default defineComponent({
    name: '修改代码配置',
    components: {
      BasicForm,
      Loading,
      Tabs,
      TabPane: Tabs.TabPane,
      DefGenTableColumn,
    },
    setup(_) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { currentRoute } = useRouter();
      const columnRef = ref<any>(null);
      const tableId = ref<string>('');
      const activeKey = ref<string>('field');
      const cache = {
        field: false,
        basic: false,
      };
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

      function setLoading(loading: boolean) {
        compState.loading = loading;
      }

      const [registerBasicForm, { validate, getFieldsValue, setFieldsValue, updateSchema }] =
        useForm({
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
        tableId.value = routeQuery.id as string;
        try {
          setLoading(true);
          console.log('onMounted', tableId.value);
          await getColumnRef().load(routeQuery.id as string);
          // changeTabs('field');
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
        // if (true) {
        if (!cache[key]) {
          try {
            setLoading(true);
            if (key === 'field') {
              await getColumnRef().load(unref(tableId));
            } else {
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
          } finally {
            cache[key] = true;
            setLoading(false);
          }
        }
      }

      return {
        t,
        registerBasicForm,
        changeTabs,
        handleSubmit,
        activeKey,
        columnRef,
        tableId,
        ...toRefs(compState),
      };
    },
  });
</script>
