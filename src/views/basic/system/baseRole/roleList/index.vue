<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <BasicTable
      @register="registerTable"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @row-db-click="handleRowDbClick"
      @fetch-success="onFetchSuccess"
    >
      <template #toolbar>
        <a-button
          type="primary"
          color="error"
          @click="handleBatchDelete"
          preIcon="ant-design:delete-outlined"
          v-hasAnyPermission="[RoleEnum.ROLE_DELETE]"
          >{{ t('common.title.delete') }}</a-button
        >
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          v-hasAnyPermission="[RoleEnum.ROLE_ADD]"
          @click="handleAdd"
          >{{ t('common.title.add') }}</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: t('common.title.edit'),
              icon: 'ant-design:edit-outlined',
              auth: RoleEnum.ROLE_EDIT,
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '绑定员工',
              auth: RoleEnum.ROLE_BING_USER,
              onClick: handleBindUser.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerModal" @success="handleSuccess" />
    <RoleEmployeeModal @register="registerRoleEmployeeModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page, remove } from '/@/api/basic/system/baseRole';
  import { columns, searchFormSchema } from '../baseRole.data';
  import EditModal from './Edit.vue';
  import RoleEmployeeModal from '../roleEmployee/index.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseRoleManagement',
    components: { BasicTable, EditModal, TableAction, RoleEmployeeModal },
    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerModal, { openModal }] = useModal();
      const [registerRoleEmployeeModal, { openModal: openRoleEmployeeMadal }] = useModal();

      // 表格
      const [registerTable, { reload, getSelectRowKeys, setSelectedRowKeys, getSelectRows }] =
        useTable({
          title: t('basic.system.baseRole.table.title'),
          api: page,
          columns: columns(),
          formConfig: {
            labelWidth: 50,
            schemas: searchFormSchema(),
            autoSubmitOnEnter: true,
            showResetButton: false,
            resetButtonOptions: {
              preIcon: 'ant-design:rest-outlined',
            },
            submitButtonOptions: {
              preIcon: 'ant-design:search-outlined',
            },
            alwaysShowLines: 1,
          },
          beforeFetch: handleFetchParams,
          showIndexColumn: false,
          useSearchForm: true,
          showTableSetting: false,
          bordered: true,
          rowKey: 'id',
          rowSelection: {
            type: 'radio',
            columnWidth: 40,
          },
          actionColumn: {
            width: 120,
            title: t('common.column.action'),
            dataIndex: 'action',
            slots: { customRender: 'action' },
          },
        });

      // 绑定用户
      function handleBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        openRoleEmployeeMadal(true, {
          ...record,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openModal(true, {
          type: ActionEnum.ADD,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e: Event) {
        e?.stopPropagation();
        openModal(true, {
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

      // 选择事件
      function emitChange() {
        const selectedKeys = getSelectRows();
        emit('select', selectedKeys.length > 0 ? selectedKeys[0] : {});
      }

      // 勾选事件触发
      function handleSelectionChange() {
        emitChange();
      }

      // 单击行回调
      function handleRowClick(record: Recordable) {
        setSelectedRowKeys([record.id]);
        emitChange();
      }

      // 双击行回调
      function handleRowDbClick(record: Recordable) {
        setSelectedRowKeys([record.id]);
        const rows = getSelectRows();
        openModal(true, {
          record: rows[0],
          type: ActionEnum.EDIT,
        });
      }

      async function onFetchSuccess(result: Recordable) {
        // 请求之后对返回值进行处理
        if (result && result.items && result.items.length > 0) {
          setSelectedRowKeys([result.items[0].id]);
          emitChange();
        }
      }

      return {
        t,
        RoleEnum,
        registerTable,
        registerModal,
        registerRoleEmployeeModal,
        handleAdd,
        handleEdit,
        handleSuccess,
        handleBatchDelete,
        handleBindUser,
        handleSelectionChange,
        handleRowClick,
        handleRowDbClick,
        onFetchSuccess,
      };
    },
  });
</script>
