<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          color="error"
          preIcon="ant-design:delete-outlined"
          @click="handleBatchDelete"
          v-hasAnyPermission="[RoleEnum.MSG_MY_MSG_DELETE]"
        >
          {{ t('common.title.delete') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: t('common.title.view'),
              icon: 'ant-design:search-outlined',
              onClick: handleView.bind(null, record),
              auth: RoleEnum.MSG_MY_MSG_VIEW,
            },
            {
              tooltip: t('common.title.delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: RoleEnum.MSG_MY_MSG_DELETE,
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :stopButtonPropagation="true"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { pageMyMsg, deleteMyMsg } from '/@/api/basic/msg/eMsg';
  import { columns, searchFormSchema } from './myMsg.data';
  import { RouteEnum } from '/@/enums/biz/tenant';
  import { RoleEnum } from '/@/enums/roleEnum';
  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'EMsgManagement',
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const { replace } = useRouter();

      // 表格
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: t('basic.msg.eMsg.table.title'),
        api: pageMyMsg,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          columnWidth: 40,
        },
        actionColumn: {
          width: 100,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出查看页面
      function handleView(record: Recordable, e: Event) {
        e.stopPropagation();
        replace({
          name: RouteEnum.BASIC_MY_MSG_VIEW,
          params: { type: ActionEnum.VIEW, id: record.id },
        });
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(ids: any[]) {
        await deleteMyMsg(ids);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      // 点击单行删除
      function handleDelete(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.receiveId) {
          batchDelete([record.receiveId]);
        }
      }

      // 点击批量删除
      function handleBatchDelete() {
        const rows = getSelectRows();
        if (!rows || rows.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        const ids = rows.map((item) => item.receiveId);
        createConfirm({
          iconType: 'warning',
          content: t('common.tips.confirmDelete'),
          onOk: async () => {
            try {
              await batchDelete(ids);
            } catch (e) {}
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
        RoleEnum,
      };
    },
  });
</script>
