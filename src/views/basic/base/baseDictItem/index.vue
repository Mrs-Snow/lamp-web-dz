<template>
  <PageWrapper dense contentFullHeight>
    <template #headerContent>
      <a-descriptions size="small" :column="3" :title="'字典【' + dict.name + '】的基本信息'">
        <a-descriptions-item :label="t('devOperation.system.defDict.key')">
          {{ dict.key }}
        </a-descriptions-item>
        <a-descriptions-item :label="t('devOperation.system.defDict.name')">
          {{ dict.name }}
        </a-descriptions-item>
        <a-descriptions-item :label="t('devOperation.system.defDict.remark')">
          {{ dict.remark }}
        </a-descriptions-item>
      </a-descriptions>
    </template>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" color="error" @click="handleBatchDelete">{{
          t('common.title.delete')
        }}</a-button>
        <a-button type="primary" @click="handleAdd">{{ t('common.title.add') }}</a-button>
      </template>
      <template #state="{ record }">
        <Tag :color="record.state ? 'success' : 'error'">
          {{ record.state ? t('lamp.common.enable') : t('lamp.common.disable') }}
        </Tag>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              label: t('common.title.copy'),
              onClick: handleCopy.bind(null, record),
            },
            {
              label: t('common.title.delete'),
              color: 'error',
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
              ifShow: () => {
                return record?.classify === DictClassifyEnum.BUSINESS;
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
  import { defineComponent, reactive, onMounted } from 'vue';
  import { Descriptions, Tag } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { DictClassifyEnum } from '/@/enums/biz/base';
  import { page, remove } from '/@/api/basic/base/baseDictItem';
  import { columns, searchFormSchema } from './baseDictItem.data';
  import EditModal from './Edit.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseDictItemManagement',
    components: {
      BasicTable,
      PageWrapper,
      EditModal,
      TableAction,
      Tag,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { currentRoute } = useRouter();
      const dict = reactive<Recordable>({
        id: '',
        name: '',
        key: '',
        remark: '',
      });

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: () => {
          return `【${dict.name}】的字典项列表`;
        },
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
        },
        beforeFetch: handleFetchParams,
        searchInfo: {
          parentId: dict.id,
        },
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

      onMounted(() => {
        const { params, query } = currentRoute.value;
        dict.id = params?.dictId as string;
        dict.name = (query?.name || '') as string;
        dict.key = (query?.key || '') as string;
        dict.remark = (query?.remark || '') as string;
        // reload();
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e: Event) {
        e?.stopPropagation();
        record.parentId = dict.id;
        openDrawer(true, {
          record,
          type: ActionEnum.COPY,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openDrawer(true, {
          type: ActionEnum.ADD,
          record: { parentId: dict.id },
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e: Event) {
        e?.stopPropagation();
        record.parentId = dict.id;
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
      function handleDelete(record: Recordable, e: Event) {
        e?.stopPropagation();
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
        DictClassifyEnum,
      };
    },
  });
</script>
