<template>
  <PageWrapper contentClass="flex" dense>
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
          <BasicTable @register="registerTable">
            <template #toolbar>
              <a-button
                color="error"
                preIcon="ant-design:delete-outlined"
                type="primary"
                @click="handleBatchDelete"
              >
                {{ t('common.title.delete') }}
              </a-button>
            </template>
            <template #action="{ record, column }">
              <TableAction :actions="createActions(record, column)" :stopButtonPropagation="true" />
            </template>
          </BasicTable>
        </TabPane>
        <template #rightExtra>
          <a-button v-if="activeKey === 'basic'" type="primary" @click="handleSubmit"
            >保存
          </a-button>
        </template>
      </Tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    ActionItem,
    BasicTable,
    EditRecordRow,
    TableAction,
    useTable,
  } from '/@/components/Table';
  import { Loading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { cloneDeep } from 'lodash-es';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { getValidateRules, RuleType } from '/@/api/lamp/common/formValidateService';
  import { Api, detail, update } from '/@/api/devOperation/developer/defGenTable';
  import {
    page,
    remove,
    syncField,
    update as updateColumn,
  } from '/@/api/devOperation/developer/defGenTableColumn';
  import {
    baseEditFormSchema,
    columnColumns,
    customFormSchemaRules,
    searchColumnFormSchema,
  } from './defGenTable.data';
  import { DefGenTableColumnUpdateVO } from '/@/api/devOperation/developer/model/defGenTableColumnModel';
  import { GenTypeEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: '修改代码配置',
    components: {
      BasicForm,
      PageWrapper,
      Loading,
      BasicTable,
      TableAction,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup(_) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { currentRoute } = useRouter();
      const currentEditKeyRef = ref('');
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

      const [registerTable, { reload }] = useTable({
        title: '字段',
        api: page,
        columns: columnColumns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchColumnFormSchema(),
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
        },
        searchInfo: {
          tableId: tableId,
        },
        immediate: false,
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        clickToRowSelect: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          columnWidth: 40,
        },
        actionColumn: {
          width: 200,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function createActions(record: EditRecordRow): ActionItem[] {
        if (!record.editable) {
          return [
            {
              tooltip: t('common.title.edit'),
              icon: 'ant-design:edit-outlined',
              disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
              onClick: handleEdit.bind(null, record),
            },
            {
              tooltip: t('common.title.delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              tooltip: '同步',
              icon: 'ant-design:cloud-sync-outlined',
              popConfirm: {
                title: '同步字段会重新读取数据库中字段信息，覆盖已修改的配置，确定同步该字段吗？',
                confirm: handleSync.bind(null, record),
              },
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record),
            },
          },
        ];
      }

      onMounted(async () => {
        const routeQuery = currentRoute.value?.params;
        tableId.value = routeQuery.id as string;
        try {
          setLoading(true);
          await load(routeQuery.id as string);
          // changeTabs('field');
        } finally {
          setLoading(false);
        }
      });

      async function load(id: string) {
        if (id) {
          reload();
        } else {
          createMessage.warn('该表不存在');
        }
      }

      async function handleSubmit() {
        try {
          const params = await validate();

          await update(params);
          createMessage.success('成功');
        } finally {
        }
      }

      async function changeTabs(key: 'basic' | 'field') {
        if (!cache[key]) {
          try {
            setLoading(true);
            if (key === 'field') {
              reload();
            } else {
              const record = await detail(tableId.value);
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

      async function handleSync(record: EditRecordRow, e: Event) {
        e?.stopPropagation();
        await syncField(record.tableId, record.id);
        createMessage.success('同步成功');
        reload();
      }

      async function handleDelete(record: EditRecordRow, e: Event) {
        e?.stopPropagation();
        await remove(record.id);
        createMessage.success(t('common.tips.deleteSuccess'));
        reload();
      }

      async function handleSave(record: EditRecordRow, e: Event) {
        e?.stopPropagation();
        // 校验
        createMessage.loading({ content: '正在保存...', duration: 0, key: 'saving' });

        const valid = await record.onValid?.();
        if (valid) {
          const data = cloneDeep(record.editValueRefs) as unknown as DefGenTableColumnUpdateVO;
          console.log(data);
          const params = { ...unref(record), ...data };
          console.log(params);

          await updateColumn(params);

          // 保存之后提交编辑状态
          const pass = await record.onEdit?.(false, true);
          if (pass) {
            currentEditKeyRef.value = '';
          }
          createMessage.success({ content: '数据已保存', key: 'saving' });
        } else {
          createMessage.error({ content: '请填写正确的数据', key: 'saving' });
        }
      }

      async function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = '';
        record.onEdit?.(false, false);
      }

      async function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key;
        record.onEdit?.(true);
      }

      async function handleBatchDelete() {}

      return {
        t,
        registerBasicForm,
        registerTable,
        changeTabs,
        handleSubmit,
        handleBatchDelete,
        handleDelete,
        handleEdit,
        handleSync,
        createActions,
        activeKey,
        ...toRefs(compState),
      };
    },
  });
</script>
