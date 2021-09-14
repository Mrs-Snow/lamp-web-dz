<template>
  <div class="bg-white m-4 ml-2 overflow-hidden">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :disabled="formData.menu.id === '0'" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
        <a-button type="primary" :disabled="formData.menu.id === '0'" @click="handleAdd">{{
          t('common.title.add')
        }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            { label: t('common.title.edit'), onClick: handleEdit.bind(null, record) },
            { label: t('common.title.copy'), onClick: handleCopy.bind(null, record) },
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
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page, remove } from '/@/api/lamp/system/resource';
  import { resourceColumns, resourceSearchFormSchema } from './menu.data';
  import EditModal from './ResourceEdit.vue';

  export default defineComponent({
    name: 'ResourceManagement',
    components: { BasicTable, EditModal, TableAction },
    emits: ['success'],
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      let formData = reactive({ menu: { id: '0', label: '' } });
      let menuId = ref('0');
      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: () => {
          if (formData.menu.label) {
            return `【${formData.menu.label}】${t('lamp.system.resource.table.title')}`;
          } else {
            return t('lamp.system.resource.table.title');
          }
        },
        api: page,
        columns: resourceColumns,
        formConfig: {
          labelWidth: 80,
          schemas: resourceSearchFormSchema,
        },
        searchInfo: {
          menuId,
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

      // 弹出复制页面
      function handleCopy(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.COPY,
          menuName: formData.menu.label,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openDrawer(true, {
          type: ActionEnum.ADD,
          record: { menuId: formData.menu.id },
          menuName: formData.menu.label,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e) {
        e.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.EDIT,
          menuName: formData.menu.label,
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

      async function setData(data: Recordable) {
        formData.menu = data?.record;
        menuId.value = data?.record?.id;
        reload();
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
        setData,
        formData,
      };
    },
  });
</script>
