<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
        <a-button type="primary" @click="handleUpload">{{ t('common.title.upload') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '转换模型',
              onClick: handleTrans.bind(null, record),
            },
            {
              label: record.suspendState === '2' ? '激活' : '挂起',
              onClick: handleStatus.bind(null, record),
            },
            {
              label: '流程图',
              onClick: handleDraw.bind(null, record),
            },
            {
              label: 'XML',
              onClick: handleXml.bind(null, record),
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
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { useLoading } from '/@/components/Loading';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { openWindow } from '/@/utils';
  import {
    page,
    remove,
    updateSuspendState,
    saveModelByPro,
  } from '/@/api/lamp/activiti/deployment';
  import { columns, searchFormSchema } from './deployment.data';
  import EditModal from './Upload.vue';

  export default defineComponent({
    name: 'DeploymentManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();

      // 表格1
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: '流程管理',
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
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 270,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });

      // 查看流程xml
      function handleXml(record: Recordable, e) {
        e?.stopPropagation();
        openWindow(
          `/api/activiti/static/goViewXml?pdid=${record.id}&resourceName=${record.resourceName}`
        );
      }

      // 查看流程图
      function handleDraw(record: Recordable, e) {
        e?.stopPropagation();
        openWindow(
          `/api/activiti/static/readResource?pdid=${record.id}&resourceName=${record.diagramResourceName}`
        );
      }

      // 转换为模型
      async function handleTrans(record: Recordable, e) {
        e?.stopPropagation();
        openFullLoading();
        try {
          await saveModelByPro(record.id);
          createMessage.success('转换成功');
          handleSuccess();
        } finally {
          closeFullLoading();
        }
      }

      // 修改化状态
      async function handleStatus(record: Recordable, e) {
        e?.stopPropagation();
        openFullLoading();
        try {
          const flag = await updateSuspendState(record.id, record.suspendState);
          if (flag) {
            createMessage.success(t('common.tips.editSuccess'));
            handleSuccess();
          } else {
            createMessage.success(t('common.tips.editFail'));
          }
        } finally {
          closeFullLoading();
        }
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
        if (record?.deploymentId) {
          batchDelete([record.deploymentId]);
        }
      }

      function handleUpload() {
        openDrawer(true);
      }
      // 点击批量删除
      function handleBatchDelete() {
        const selectedRows = getSelectRows();
        const ids = selectedRows.map((item) => item.deploymentId);
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

      return {
        t,
        registerTable,
        registerDrawer,
        handleUpload,
        handleTrans,
        handleDraw,
        handleStatus,
        handleXml,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
      };
    },
  });
</script>
