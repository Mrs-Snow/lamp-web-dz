<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">{{ t('common.title.add') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('devOperation.tenant.defDatasourceConfig.testConnection'),
              onClick: handleConnection.bind(null, record),
            },
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
                title: t('common.tips.confirmDelete'),
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
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { useLoading } from '/@/components/Loading';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';

  import { page, remove, testConnect } from '/@/api/devOperation/tenant/datasourceConfig';
  import EditModal from './Edit.vue';
  import { columns, searchFormSchema } from './datasourceConfig.data';

  export default defineComponent({
    name: 'DatasourceConfigManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('devOperation.tenant.defDatasourceConfig.table.title'),
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
          width: 220,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e) {
        e.stopPropagation();
        openModal(true, {
          record,
          type: ActionEnum.COPY,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openModal(true, {
          type: ActionEnum.ADD,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          type: ActionEnum.EDIT,
        });
      }

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.loadingText'),
      });
      const isTestConnect = ref(false);
      function handleConnection(record: Recordable) {
        if (unref(isTestConnect)) {
          createMessage.warn('正在测试连接，请稍后!');
          return;
        }

        record.poolName = 'test';

        isTestConnect.value = true;
        openFullLoading();
        testConnect(record)
          .then((res) => {
            if (res) {
              createMessage.success('测试连接成功');
            } else {
              createMessage.error('测试连接失败,请检查配置是否正确!');
            }
          })
          .finally(() => {
            isTestConnect.value = false;
            closeFullLoading();
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

      return {
        registerTable,
        registerModal,
        handleAdd,
        handleEdit,
        handleCopy,
        handleConnection,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
