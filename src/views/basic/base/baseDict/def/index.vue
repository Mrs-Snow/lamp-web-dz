<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="导入系统字典"
    :maskClosable="false"
    @ok="handleSubmit"
    :keyboard="true"
    width="80%"
  >
    <PageWrapper dense contentFullHeight>
      <BasicTable @register="registerTable" />
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { RouteEnum } from '/@/enums/biz/tenant';
  import { page } from '/@/api/devOperation/base/defDict';
  import { importDict } from '/@/api/basic/base/baseDict';
  import { columns, searchFormSchema } from '../baseDict.data';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseDictImportManagement',
    components: { BasicModal, BasicTable, PageWrapper },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { replace } = useRouter();
      const { createMessage } = useMessage();

      // 表格
      const [registerTable, { getSelectRowKeys }] = useTable({
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
          type: 'radio',
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          const dictIds = getSelectRowKeys();
          if (dictIds && dictIds.length > 0) {
            await importDict(dictIds[0]);

            createMessage.success(t(`common.tips.importSuccess`));
            closeModal();
            emit('success');
          } else {
            createMessage.warn('请先选择字典');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      // 查看字典项
      function handleViewItem(record: Recordable, e: Event) {
        e.stopPropagation();
        replace({
          name: RouteEnum.DICT_ITEM,
          params: { dictId: record.id },
          query: { name: record.name },
        });
      }

      return {
        t,
        registerTable,
        registerModal,
        handleViewItem,
        handleSubmit,
      };
    },
  });
</script>
