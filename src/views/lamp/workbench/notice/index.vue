<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleMark"> 标记为已读 </a-button>
        <a-button type="primary" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.view'),
              onClick: handleView.bind(null, record),
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
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';

  import { handleFetchParams } from '/@/utils/lamp/common';
  import { pageMyMsg, remove, mark } from '/@/api/lamp/resources/msg';
  import { columns, searchFormSchema } from './msg.data';

  export default defineComponent({
    name: 'MsgManagement',
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const { replace, currentRoute } = useRouter();

      // 表格
      const [registerTable, { reload, getSelectRowKeys, getForm }] = useTable({
        title: t('lamp.workbench.notice.table.title'),
        api: pageMyMsg,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema((value) => {
            reload({ searchInfo: { msgType: value } });
          }),
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
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
        const { query } = currentRoute.value;
        const msgType = query?.msgType;
        if (msgType) {
          const form = getForm();
          form.setFieldsValue({ msgType: msgType });
        }
      });

      // 弹出页面
      function handleView(record: Recordable, e) {
        e.stopPropagation();
        replace({
          name: 'noticeView',
          params: { id: record.id },
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

      function handleMark() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确定要将这' + ids.length + '条数据标记为已读状态吗？',
          onOk: async () => {
            await mark(ids);
            createMessage.success('标记成功');
            handleSuccess();
          },
        });
      }

      return {
        t,
        registerTable,
        handleView,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        handleMark,
      };
    },
  });
</script>
