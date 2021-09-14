<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
        <a-button type="primary" @click="handleAdd">{{ t('common.title.add') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              label: t('common.title.copy'),
              onClick: handleCopy.bind(null, record),
            },
            {
              label: t('common.title.delete'),
              color: 'error',
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page, remove } from '/@/api/lamp/system/dictionaryItem';
  import { columns, searchFormSchema } from './dictionary.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    name: 'DictionaryManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { currentRoute } = useRouter();
      const dictType = ref<string>('');
      const dictLabel = ref<string>('');

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: () => {
          return `【${dictLabel.value}】的字典列表`;
        },
        api: page,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
        searchInfo: {
          type: dictType,
        },
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 160,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      onMounted(() => {
        const { params, query } = currentRoute.value;
        dictType.value = params?.type as string;
        dictLabel.value = query?.label as string;
        reload();
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.COPY,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        const record = {
          type: dictType,
          label: dictLabel,
        };
        openDrawer(true, {
          type: ActionEnum.ADD,
          record,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.EDIT,
        });
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(ids: any[]) {
        await remove(ids);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      // 点击单行删除
      function handleDelete(record: Recordable, e) {
        e.stopPropagation();
        if (record?.id) {
          batchDelete([record.id]);
        }
      }

      // 点击批量删除
      function handleBatchDelete() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: t('common.tips.confirmDelete'),
          onOk: async () => {
            await batchDelete(ids);
          },
        });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleAdd,
        handleCopy,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
      };
    },
  });
</script>
