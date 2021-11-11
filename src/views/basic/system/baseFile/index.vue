<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable
      @register="registerTable"
      titleHelpMessage="“调试上传”按钮：用于开发人员测试上传接口是否支持所有的参数。 “上传”按钮：用于演示如何直接上传附件"
    >
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:delete-outlined" @click="handleBatchDelete">
          {{ t('common.title.delete') }}
        </a-button>
        <a-button
          type="primary"
          preIcon="ant-design:download-outlined"
          @click="handleBatchDownload"
        >
          {{ t('common.title.download') }}
        </a-button>
        <a-button type="primary" preIcon="ant-design:upload-outlined" @click="handleUpload">
          调试上传
        </a-button>
        <BasicUpload
          :maxSize="20"
          :maxNumber="10"
          :uploadParams="{ bizType: FileBizTypeEnum.BASE_FILE }"
          :api="uploadToTenant"
          :showPreviewButton="false"
          @change="handleChange"
        />
      </template>
      <template #path="{ record }">
        <ThumbUrl
          :fileId="record.id"
          :fileType="record.fileType?.code"
          :originalFileName="record.originalFileName"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: t('common.title.download'),
              icon: 'ant-design:download-outlined',
              onClick: handleDownload.bind(null, record),
            },
            {
              tooltip: t('common.title.delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :stopButtonPropagation="true"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { handleFetchParams, downloadFile } from '/@/utils/lamp/common';
  import { FileBizTypeEnum } from '/@/enums/commonEnum';
  import { useModal } from '/@/components/Modal';
  import EditModal from './Edit.vue';

  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { page, remove, download } from '/@/api/basic/system/baseFile';
  import { uploadToTenant } from '/@/api/lamp/file/upload';
  import { columns, searchFormSchema } from './baseFile.data';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseFileManagement',
    components: { BasicTable, BasicUpload, PageWrapper, TableAction, ThumbUrl, EditModal },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const [registerModal, { openModal }] = useModal();

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: t('basic.system.baseFile.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          columnWidth: 40,
        },
        actionColumn: {
          width: 100,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      // 弹出编辑页面
      function handleDownload(record: Recordable, e) {
        e.stopPropagation();
        if (record?.id) {
          batchDownload([record.id]);
        }
      }
      function handleBatchDownload() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '确定要批量下载吗？',
          onOk: async () => {
            await batchDownload(ids);
          },
        });
      }

      async function batchDownload(ids: string[]) {
        const response = await download(ids);
        downloadFile(response);
        createMessage.success(t('common.tips.downloadSuccess'));
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

      function handleUpload() {
        openModal(true, {});
      }

      return {
        t,
        registerTable,
        handleDownload,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        handleBatchDownload,
        uploadToTenant,
        handleChange: (list: string[]) => {
          createMessage.info(`已上传${list.length}个文件`);
          handleSuccess();
        },
        FileBizTypeEnum,
        handleUpload,
        registerModal,
      };
    },
  });
</script>
