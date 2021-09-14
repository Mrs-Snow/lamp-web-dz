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
              label: '绑定用户',
              onClick: handleRoleUser.bind(null, record),
            },
            {
              label: '绑定资源',
              onClick: handleRoleResource.bind(null, record),
            },
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
    <RoleUserModal @register="registerModal" @success="handleSaveRoleUserSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum, EnumEnum } from '/@/enums/commonEnum';
  import { findEnumList } from '/@/api/lamp/common/general';
  import { page, remove } from '/@/api/lamp/system/role';
  import { columns, searchFormSchema } from './role.data';
  import EditModal from './Edit.vue';
  import RoleUserModal from './user/RoleUser.vue';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, PageWrapper, EditModal, RoleUserModal, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const { replace } = useRouter();

      // 表格
      const [registerTable, { reload, getSelectRowKeys, setColumns }] = useTable({
        title: t('lamp.system.role.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
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
          width: 320,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      onMounted(async () => {
        const enumMap = await findEnumList(EnumEnum.DataScopeType);

        setColumns(columns(enumMap));
      });

      // 角色资源绑定
      function handleRoleResource(record: Recordable, e) {
        e.stopPropagation();
        replace({
          name: 'roleResource',
          params: { roleId: record.id },
        });
      }
      // 角色用户绑定
      function handleRoleUser(record: Recordable, e) {
        e.stopPropagation();
        openModal(true, {
          record,
        });
      }
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
        openDrawer(true, {
          type: ActionEnum.ADD,
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

      function handleSaveRoleUserSuccess() {
        reload();
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
        handleRoleResource,
        handleRoleUser,
        handleSaveRoleUserSuccess,
        registerModal,
      };
    },
  });
</script>
