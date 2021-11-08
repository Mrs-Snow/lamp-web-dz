<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    title="绑定员工"
    :defaultFullscreen="true"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
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
                onClick: handleUnBindUser.bind(null, record),
                ifShow: () => {
                  return formData.roleId && formData.bindEmployeeIds.includes(record.id);
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRef } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useLoading } from '/@/components/Loading';
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
      const { createMessage, createConfirm } = useMessage();
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: '加载中...',
          absolute: true,
        },
      });

      const formData = reactive({
        roleId: '',
        bindEmployeeIds: [] as string[],
      });

      // 表格
      const [registerTable, { getSelectRowKeys }] = useTable({
        title: t('basic.user.baseEmployee.table.title'),
        api: page,
        columns: roleEmployeeColumns(),
        formConfig: {
          labelWidth: 70,
          schemas: roleEmployeeSearchFormSchema(),
          autoSubmitOnEnter: true,
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
        pagination: {
          pageSize: 10,
        },
        searchInfo: {
          roleId: toRef(formData, 'roleId'),
        },
        canResize: false,
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
        if (formData.roleId) {
          formData.bindEmployeeIds = await findEmployeeIdByRoleId(formData.roleId);
        } else {
          createMessage.warn('请选择角色');
        }
      });

      function handleSuccess() {}

      async function bindUser(flag: boolean, employeeIdList: string[]) {
        try {
          openWrapLoading();
          formData.bindEmployeeIds = await saveRoleEmployee({
            flag,
            employeeIdList,
            roleId: formData.roleId,
          });
          createMessage.success('操作成功');
          handleSuccess();
        } finally {
          closeWrapLoading();
        }
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function handleBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindUser(true, [record.id]);
        }
      }
      function handleUnBindUser(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindUser(false, [record.id]);
        }
      }

      function handleBatchCancel() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确认要批量绑定选中的员工吗?',
          onOk: async () => {
            await bindUser(false, ids);
          },
        });
      }

      function handleBatchChoice() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确认要批量解绑选中的员工吗?',
          onOk: async () => {
            await bindUser(true, ids);
          },
        });
      }

      return {
        formData,
        t,
        wrapEl,
        registerModal,
        registerTable,
        handleBindUser,
        handleUnBindUser,
        handleSubmit,
        handleBatchCancel,
        handleBatchChoice,
      };
    },
  });
</script>
