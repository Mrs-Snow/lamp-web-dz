<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    title="绑定员工"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" color="error" @click="handleBatchChoice">批量选择</a-button>
        <a-button type="primary" @click="handleBatchCancel">批量取消</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '绑定',
              onClick: handleBindUser.bind(null, record),
              ifShow: () => {
                return formData.roleId && !formData.bindEmployeeIds.includes(record.id);
              },
            },
            {
              label: '取消绑定',
              onClick: handleBindUser.bind(null, record),
              ifShow: () => {
                return formData.roleId && formData.bindEmployeeIds.includes(record.id);
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRef } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { page } from '/@/api/basic/user/baseEmployee';
  import { findEmployeeIdByRoleId, saveRoleEmployee } from '/@/api/basic/system/baseRole';
  import { roleEmployeeColumns, roleEmployeeSearchFormSchema } from '../baseRole.data';
  import { handleFetchParams } from '/@/utils/lamp/common';

  export default defineComponent({
    name: 'RoleEmployeeIndex',
    components: { BasicModal, BasicTable, TableAction },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();

      const roleId = ref<string>('');
      const formData = reactive({
        roleId: '',
        bindEmployeeIds: [] as string[],
      });
      const { createMessage } = useMessage();

      // 表格
      const [registerTable, { getSelectRowKeys }] = useTable({
        title: t('basic.user.baseEmployee.table.title'),
        api: page,
        columns: roleEmployeeColumns(),
        formConfig: {
          labelWidth: 70,
          schemas: roleEmployeeSearchFormSchema(),
        },
        beforeFetch: handleFetchParams,
        showIndexColumn: false,
        useSearchForm: true,
        showTableSetting: false,
        pagination: {
          pageSize: 10,
        },
        searchInfo: {
          roleId: toRef(formData, 'roleId'),
        },
        bordered: true,
        clickToRowSelect: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 120,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });

        // 赋值
        formData.roleId = data?.id;
        roleId.value = data?.id;
        if (formData.roleId) {
          formData.bindEmployeeIds = await findEmployeeIdByRoleId(formData.roleId);
        } else {
          createMessage.warn('请选择角色');
        }
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });

          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      async function handleBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        console.log(record);
      }

      async function handleBatchCancel() {
        try {
          setModalProps({ confirmLoading: true });

          const ids = getSelectRowKeys();

          await saveRoleEmployee({ flag: false, roleId: formData.roleId, employeeIdList: ids });

          createMessage.success('操作成功');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      async function handleBatchChoice() {
        try {
          setModalProps({ confirmLoading: true });

          const ids = getSelectRowKeys();

          await saveRoleEmployee({ flag: true, roleId: formData.roleId, employeeIdList: ids });

          createMessage.success('操作成功');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        formData,
        t,
        registerModal,
        registerTable,
        handleBindUser,
        handleSubmit,
        handleBatchCancel,
        handleBatchChoice,
      };
    },
  });
</script>
