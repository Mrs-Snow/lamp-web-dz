<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    :defaultFullscreen="true"
    title="绑定角色"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" color="error" @click="handleBatchChoice">批量绑定</a-button>
          <a-button type="primary" @click="handleBatchCancel">批量取消</a-button>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '绑定',
                onClick: handleBindRole.bind(null, record),
                ifShow: () => {
                  return !isEmpty(formData.employeeId) && !formData.bindRoleIds.includes(record.id);
                },
              },
              {
                label: '取消绑定',
                onClick: handleUnBindRole.bind(null, record),
                ifShow: () => {
                  return !isEmpty(formData.employeeId) && formData.bindRoleIds.includes(record.id);
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
  import { pageMyRole } from '/@/api/basic/system/baseRole';
  import { findEmployeeRoleByEmployeeId, saveEmployeeRole } from '/@/api/basic/user/baseEmployee';
  import { orgRoleColumns, orgRoleSearchFormSchema } from '../baseOrg.data';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { isEmpty } from '/@/utils/is';

  export default defineComponent({
    name: 'OrgRoleIndex',
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
        employeeId: '',
        bindRoleIds: [] as string[],
      });

      // 表格
      const [registerTable, { getSelectRowKeys }] = useTable({
        title: '角色列表',
        api: pageMyRole,
        columns: orgRoleColumns(),
        formConfig: {
          labelWidth: 70,
          schemas: orgRoleSearchFormSchema(),
          baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 6 },
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
        showIndexColumn: true,
        useSearchForm: true,
        showTableSetting: true,
        pagination: {
          pageSize: 10,
        },
        searchInfo: {
          employeeId: toRef(formData, 'employeeId'),
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
        formData.employeeId = data?.id;
        if (formData.employeeId) {
          formData.bindRoleIds = await findEmployeeRoleByEmployeeId(formData.employeeId);
        } else {
          createMessage.warn('请选择角色');
        }
      });

      function handleSuccess() {}

      async function bindRole(flag: boolean, roleIdList: string[]) {
        try {
          openWrapLoading();
          formData.bindRoleIds = await saveEmployeeRole({
            flag,
            roleIdList,
            employeeId: formData.employeeId,
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

      function handleBindRole(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindRole(true, [record.id]);
        }
      }
      function handleUnBindRole(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          bindRole(false, [record.id]);
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
          content: '确认要批量绑定选中的角色吗?',
          onOk: async () => {
            await bindRole(false, ids);
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
          content: '确认要批量解绑选中的角色吗?',
          onOk: async () => {
            await bindRole(true, ids);
          },
        });
      }

      return {
        formData,
        t,
        wrapEl,
        isEmpty,
        registerModal,
        registerTable,
        handleBindRole,
        handleUnBindRole,
        handleSubmit,
        handleBatchCancel,
        handleBatchChoice,
      };
    },
  });
</script>
