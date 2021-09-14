<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleImport">{{ t('common.title.import') }}</a-button>
        <a-button type="primary" @click="handleExport">{{ t('common.title.export') }}</a-button>
        <a-button type="primary" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
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
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #avatar="{ record }">
        <ThumbUrl
          :fileId="record.echoMap[FileBizTypeEnum.BASE_USER_AVATAR]?.[0]?.id"
          :fileType="record.echoMap[FileBizTypeEnum.BASE_USER_AVATAR]?.[0]?.fileType?.code"
          :originalFileName="
            record.echoMap[FileBizTypeEnum.BASE_USER_AVATAR]?.[0]?.originalFileName
          "
        />
      </template>
    </BasicTable>
    <EditModal @register="registerDrawer" @success="handleSuccess" />
    <PreviewExcelModel
      width="70%"
      @register="exportRegister"
      @success="handleExportSuccess"
      :exportApi="exportFile"
      :previewApi="exportPreview"
    />
    <ImpExcelModel
      @register="importRegister"
      @success="handleImportSuccess"
      :api="importFile"
      :templateHref="templateUrl.user"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { FileBizTypeEnum } from '/@/enums/commonEnum';
  import { ImpExcelModel, PreviewExcelModel } from '/@/components/Poi';
  import { handleSearchInfoByCreateTime, handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum, DictEnum, EnumEnum } from '/@/enums/commonEnum';
  import { templateUrl } from '/@/settings/templateSetting';
  import { page, remove, importFile, exportFile, exportPreview } from '/@/api/lamp/org/user';
  import { findEnumList, findDictList } from '/@/api/lamp/common/general';
  import { columns, searchFormSchema } from './user.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    name: 'UserManagement',
    components: {
      BasicTable,
      PageWrapper,
      EditModal,
      TableAction,
      ImpExcelModel,
      PreviewExcelModel,
      ThumbUrl,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();

      // 表格
      const [registerTable, { reload, getSelectRowKeys, getForm, setColumns }] = useTable({
        title: t('lamp.org.user.table.title'),
        api: page,
        columns: columns(),
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
          width: 160,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      onMounted(async () => {
        const enumMap = await findEnumList(EnumEnum.Sex);
        const dictMap = await findDictList([
          DictEnum.NATION,
          DictEnum.POSITION_STATUS,
          DictEnum.EDUCATION,
        ]);

        setColumns(columns(enumMap, dictMap));
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.COPY,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openDrawer(true, {
          type: ActionEnum.ADD,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
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

      // 导入弹窗
      const [importRegister, importModal] = useModal();
      // 导出弹窗
      const [exportRegister, exportModel] = useModal();
      // 导入成功
      function handleImportSuccess(_data) {
        reload();
      }

      // 导出成功
      function handleExportSuccess() {
        reload();
      }

      // 点击导出按钮
      function handleExport() {
        const form = getForm();
        let params = { ...form.getFieldsValue() };
        params = handleSearchInfoByCreateTime(params);
        params.extra = {
          ...{
            fileName: t('lamp.org.user.table.title'),
          },
          ...params?.extra,
        };
        params.size = 20000;

        exportModel.openModal(true, {
          params,
        });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleAdd,
        handleCopy,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        importRegister,
        handleImport: importModal.openModal,
        handleImportSuccess,
        importFile,
        exportRegister,
        handleExport,
        handleExportSuccess,
        exportFile,
        exportPreview,
        templateUrl,
        FileBizTypeEnum,
      };
    },
  });
</script>
