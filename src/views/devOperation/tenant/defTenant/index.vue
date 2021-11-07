<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd">{{
          t('common.title.add')
        }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:database-outlined',
              tooltip: '初始化数据',
              onClick: handleInitData.bind(null, record),
              ifShow: () => {
                return true;
              },
            },
            {
              icon: 'ant-design:cloud-upload-outlined',
              tooltip: '连数据源',
              onClick: handleLinkDataSource.bind(null, record),
            },
            {
              tooltip: t('common.title.edit'),
              icon: 'clarity:note-edit-line',
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
          ]"
          :stopButtonPropagation="true"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerDrawer" @success="handleSuccess" />
    <InitDataModal @register="registerInitDrawer" @success="handleInitSuccess" />
    <LinkDataSourceModal @register="registerLinkDrawer" @success="handleSuccess" />
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
  import { page, remove } from '/@/api/devOperation/tenant/tenant';
  import { columns, searchFormSchema } from './tenant.data';
  import EditModal from './Edit.vue';
  import InitDataModal from './InitData.vue';
  import LinkDataSourceModal from './LinkDataSource.vue';

  export default defineComponent({
    name: 'TenantManagement',
    components: {
      BasicTable,
      PageWrapper,
      EditModal,
      TableAction,
      InitDataModal,
      LinkDataSourceModal,
    },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerLinkDrawer, { openDrawer: openLinkDrawer }] = useDrawer();
      const [registerInitDrawer, { openDrawer: openInitDrawer }] = useDrawer();

      const { createMessage } = useMessage();

      const [registerTable, { reload }] = useTable({
        title: t('devOperation.tenant.defTenant.table.title'),
        api: page,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
        },
        clickToRowSelect: false,
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

      function handleInitData(record: Recordable) {
        openInitDrawer(true, { record });
      }
      function handleLinkDataSource(record: Recordable) {
        openLinkDrawer(true, { record });
      }

      function handleAdd() {
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
        TenantStatusEnum,
        t,
        registerTable,
        registerDrawer,
        registerInitDrawer,
        registerLinkDrawer,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleInitSuccess,
        handleInitData,
        handleLinkDataSource,
      };
    },
  });
</script>
