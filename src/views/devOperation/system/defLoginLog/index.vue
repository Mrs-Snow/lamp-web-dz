<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          color="error"
          preIcon="ant-design:delete-outlined"
          @click="handleBatchDelete"
          v-hasAnyPermission="[RoleEnum.SYSTEM_LOGIN_LOG_DELETE]"
        >
          {{ t('common.title.delete') }}
        </a-button>
        <Dropdown
          placement="bottomCenter"
          :trigger="['click']"
          :dropMenuList="clearList"
          @menu-event="handleClearEvent"
          overlayClassName="app-locale-picker-overlay"
        >
          <a-button type="primary" v-hasAnyPermission="[RoleEnum.SYSTEM_LOGIN_LOG_DELETE]">
            清理日志
          </a-button>
        </Dropdown>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: t('common.title.view'),
              icon: 'ant-design:search-outlined',
              onClick: handleView.bind(null, record),
              auth: RoleEnum.SYSTEM_LOGIN_LOG_VIEW,
            },
            {
              tooltip: t('common.title.delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: RoleEnum.SYSTEM_LOGIN_LOG_DELETE,
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
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Dropdown, DropMenu } from '/@/components/Dropdown';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { page, remove, clear } from '/@/api/devOperation/system/defLoginLog';
  import { columns, searchFormSchema, clearList } from './defLoginLog.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'DefLoginLogManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction, Dropdown },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: t('devOperation.system.defLoginLog.table.title'),
        api: page,
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

      function handleClearEvent(menu: DropMenu) {
        createConfirm({
          iconType: 'warning',
          content: '确认要清理数据吗？',
          onOk: async () => {
            await clear(menu.event);
            reload();
          },
        });
      }

      // 弹出查看页面
      function handleView(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.VIEW,
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
      function handleDelete(record: Recordable, e: Event) {
        e?.stopPropagation();
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
            try {
              await batchDelete(ids);
            } catch (e) {}
          },
        });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleClearEvent,
        handleView,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        clearList,
        RoleEnum,
      };
    },
  });
</script>
