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
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '发布',
              onClick: handlePublish.bind(null, record),
            },
            {
              label: '下载',
              onClick: handleDownload.bind(null, record),
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
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { useLoading } from '/@/components/Loading';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { openWindow } from '/@/utils';
  import { getTenant, getToken } from '/@/utils/auth';
  import { page, remove, publish } from '/@/api/lamp/activiti/model';
  import { columns, searchFormSchema } from './model.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    name: 'ModelManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();

      // 表格
      const [registerTable, { reload }] = useTable({
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
          width: 240,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });

      // 查看流程图
      function handleDownload(record: Recordable, e) {
        e.stopPropagation();
        var url = `/api/activiti/static/exportXMLByModelId?modelId=${record.id}`;
        openWindow(url);
      }

      // 修改化状态
      function handleEdit(record: Recordable, e) {
        e.stopPropagation();
        const tenant = getTenant();
        const token = getToken();
        let url = `/api/activiti/static/index?modelId=${record.id}&tenant=${tenant}&token=Bearer ${token}`;
        openWindow(url);
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(id: string) {
        await remove(id);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      // 点击单行删除
      function handleDelete(record: Recordable, e) {
        e.stopPropagation();
        if (record?.id) {
          batchDelete(record.id);
        }
      }

      function handleAdd() {
        openDrawer(true, {
          type: ActionEnum.ADD,
        });
      }
      async function handlePublish(record: Recordable, e) {
        e.stopPropagation();

        try {
          openFullLoading();
          await publish({ modelId: record.id });
          createMessage.success('发布成功');
        } finally {
          closeFullLoading();
        }
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleAdd,
        handleDownload,
        handlePublish,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
