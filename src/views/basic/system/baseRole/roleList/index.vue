<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" color="error" @click="handleBatchDelete">{{
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
              label: '绑定',
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
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: t('basic.system.baseRole.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 50,
          schemas: searchFormSchema(),
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
          onChange: (_, selectedRows: Recordable[]) => {
            emit('select', selectedRows[0]);
          },
        },
        // afterFetch: (list: Recordable[]) => {
        //   if (list && list.length > 0) {
        //     emit('select', list[0]);
        //   }
        //   return list;
        // },
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

      return {
        t,
        registerTable,
        registerModal,
        registerRoleEmployeeModal,
        handleAdd,
        handleEdit,
        handleSuccess,
        handleBatchDelete,
        handleBindUser,
      };
    },
  });
</script>
