<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAuthorize">授权</a-button>
      </template>
      <template #expired="{ record }">
        <Tag :color="record.expired ? 'warning' : 'success'">{{
          record.expired ? '已过期' : '未过期'
        }}</Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '续期',
              onClick: handleRenewal.bind(null, record),
            },
            {
              label: '取消授权',
              color: 'error',
              popConfirm: {
                title: '是否确认取消授权？',
                confirm: handleCancelAuthorize.bind(null, record),
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
  import { Tag } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page } from '/@/api/lamp/application/defTenantApplicationRel';
  import { columns, searchFormSchema } from './defTenantApplicationRel.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: '应用授权管理',
    components: { BasicTable, PageWrapper, EditModal, TableAction, Tag },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { replace } = useRouter();

      // 表格
      const [registerTable, { reload }] = useTable({
        title: t('lamp.application.defTenantApplicationRel.table.title'),
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
          width: 160,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出续期页面
      function handleRenewal(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.EDIT,
        });
      }

      // 弹出授权
      function handleAuthorize() {
        replace({
          name: '应用授权',
        });
      }

      // 点击取消授权
      function handleCancelAuthorize(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          batchDelete([record.id]);
        }
      }

      // 授权成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(ids: any[]) {
        console.log(ids);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleAuthorize,
        handleRenewal,
        handleCancelAuthorize,
        handleSuccess,
      };
    },
  });
</script>
