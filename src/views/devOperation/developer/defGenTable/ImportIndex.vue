<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    title="绑定员工"
    :defaultFullscreen="true"
    @ok="handleSubmit"
  >
    <PageWrapper dense contentFullHeight>
      <BasicTable @register="registerTable" />
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { selectTableList } from '/@/api/devOperation/developer/defGenTable';
  import { importColumns, importSearchFormSchema } from './defGenTable.data';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'DefGenTableManagement',
    components: { BasicModal, BasicTable, PageWrapper },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();

      // 表格
      const [registerTable, { reload, getSelectRowKeys, setFieldsValue }] = useTable({
        title: t('devOperation.developer.defGenTable.table.title'),
        api: selectTableList,
        columns: importColumns(),
        formConfig: {
          labelWidth: 120,
          schemas: importSearchFormSchema(
            (value) => {
              reload({ searchInfo: { dsName: value } });
            },
            (value) => {
              setFieldsValue(value);
            },
          ),
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
        immediate: false,
        rowKey: 'tableName',
        rowSelection: {
          type: 'checkbox',
          columnWidth: 40,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (_) => {
        setModalProps({ confirmLoading: false });
      });

      // 点击批量删除
      function handleSubmit() {
        const names = getSelectRowKeys();
        if (!names || names.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: '是否确认导入此表？',
          onOk: async () => {
            try {
              closeModal();
            } catch (e) {}
          },
        });
      }

      return {
        t,
        registerModal,
        registerTable,
        handleSubmit,
      };
    },
  });
</script>
