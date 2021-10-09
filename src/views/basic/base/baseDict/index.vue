<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleImport">{{ t('common.title.import') }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '字典项',
              onClick: handleViewItem.bind(null, record),
            },
            {
              label: t('common.title.view'),
              onClick: handleView.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerDrawer" @success="handleSuccess" />
    <ImportDictModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { RouteEnum } from '/@/enums/biz/tenant';
  import { page } from '/@/api/basic/base/baseDict';
  import { columns, searchFormSchema } from './baseDict.data';
  import EditModal from './Edit.vue';
  import ImportDictModal from './def/index.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseDictManagement',
    components: { BasicTable, PageWrapper, EditModal, TableAction, ImportDictModal },
    setup() {
      const { t } = useI18n();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const { replace } = useRouter();

      // 表格
      const [registerTable, { reload }] = useTable({
        title: t('basic.base.baseDict.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
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
          width: 150,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出新增页面
      function handleImport() {
        openModal(true, {
          type: ActionEnum.VIEW,
        });
      }

      // 弹出编辑页面
      function handleView(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.VIEW,
        });
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      // 查看字典项
      function handleViewItem(record: Recordable, e: Event) {
        e.stopPropagation();
        replace({
          name: RouteEnum.BASIC_DICT_ITEM,
          params: { dictId: record.id },
          query: { name: record.name },
        });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleImport,
        handleSuccess,
        handleView,
        handleViewItem,
        registerModal,
      };
    },
  });
</script>
