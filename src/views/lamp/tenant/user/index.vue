<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">{{ t('common.title.add') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.copy'),
              onClick: handleCopy.bind(null, record),
            },
            {
              label: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              label: t('common.title.delete'),
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { handleFetchParams } from '/@/utils/lamp/common';
  import { page, remove } from '/@/api/lamp/tenant/user';
  import { ActionEnum } from '/@/enums/commonEnum';
  import EditModal from './Edit.vue';
  import { columns, searchFormSchema } from './user.data';

  export default defineComponent({
    name: 'GlobalUserManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const { createMessage } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: t('lamp.tenant.user.table.title'),
        api: page,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema((value) => {
            reload({ searchInfo: { tenantCode: value } });
          }),
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 220,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCopy(record: Recordable) {
        const fieldsValue = getForm().getFieldsValue();
        openModal(true, {
          record,
          tenantCode: fieldsValue?.tenantCode,
          type: ActionEnum.COPY,
        });
      }

      function handleAdd() {
        const fieldsValue = getForm().getFieldsValue();
        openModal(true, {
          tenantCode: fieldsValue?.tenantCode,
          type: ActionEnum.ADD,
        });
      }

      function handleEdit(record: Recordable) {
        const fieldsValue = getForm().getFieldsValue();
        openModal(true, {
          record,
          tenantCode: fieldsValue?.tenantCode,
          type: ActionEnum.EDIT,
        });
      }

      function handleDelete(record: Recordable) {
        const fieldsValue = getForm().getFieldsValue();
        remove(fieldsValue?.tenantCode, [record.id]).then(() => {
          createMessage.success(t('common.tips.deleteSuccess'));
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleAdd,
        handleEdit,
        handleCopy,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
