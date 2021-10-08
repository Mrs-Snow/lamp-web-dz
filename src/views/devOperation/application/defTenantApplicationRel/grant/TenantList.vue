<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <BasicTable
      @register="registerTable"
      :rowSelection="{
        type: 'checkbox',
        selectedRowKeys: checkedKeys,
        onChange: onSelectChange,
      }"
    >
      <template #headerTop>
        <Alert type="info" show-icon>
          <template #message>
            <template v-if="checkedKeys.length > 0">
              <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
              <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
            </template>
            <template v-else>
              <span>未选中任何项目</span>
            </template>
          </template>
        </Alert>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable, useTable } from '/@/components/Table';

  import { page } from '/@/api/devOperation/tenant/tenant';
  import { TenantStatusEnum } from '/@/enums/biz/tenant';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { getTenantColumns } from '../defTenantApplicationRel.data';

  export default defineComponent({
    name: 'TenantList',
    components: { BasicTable, Alert },

    emits: ['select'],
    setup(_) {
      const { t } = useI18n();
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm }] = useTable({
        title: t('devOperation.tenant.defTenant.table.title'),
        api: page,
        columns: getTenantColumns(),
        beforeFetch: handleFetchParams,
        searchInfo: {
          status: TenantStatusEnum.NORMAL,
        },
        showIndexColumn: false,
        rowKey: 'id',
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      return {
        t,
        checkedKeys,
        registerTable,
        onSelectChange,
        getForm,
      };
    },
  });
</script>
