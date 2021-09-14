<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">{{ t('common.title.add') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '初始化',
              onClick: handleInit.bind(null, record),
              ifShow: () => {
                return record?.status?.code === TenantStatusEnum.WAIT_INIT;
              },
            },
            {
              label: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
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
    <ConnectionModal @register="registerInitDrawer" @success="handleInitSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { TenantStatusEnum } from '/@/enums/biz/tenant';
  import { page, remove } from '/@/api/lamp/tenant/tenant';
  import { columns, searchFormSchema } from './tenant.data';
  import EditModal from './Edit.vue';
  import ConnectionModal from './Connection.vue';

  export default defineComponent({
    name: 'TenantManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction, ConnectionModal },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const drawer = useDrawer();
      const registerInitDrawer = drawer[0];
      const openInitDrawer = drawer[1].openDrawer;

      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('lamp.tenant.tenant.table.title'),
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
        actionColumn: {
          width: 160,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleInit(record: Recordable) {
        openInitDrawer(true, {
          record,
        });
      }
      function handleCreate() {
        openDrawer(true, {
          type: ActionEnum.ADD,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          type: ActionEnum.EDIT,
        });
      }

      function handleDelete(record: Recordable) {
        remove([record.id]).then(() => {
          createMessage.success(t('common.tips.deleteSuccess'));
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }
      function handleInitSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleInit,
        registerInitDrawer,
        handleInitSuccess,
        TenantStatusEnum,
        t,
      };
    },
  });
</script>
