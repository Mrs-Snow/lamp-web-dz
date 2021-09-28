<template>
  <PageWrapper dense contentClass="flex" contentFullHeight>
    <TenantList class="md:w-1/4" ref="tenantListRef" />
    <ApplicationTabs class="md:w-3/4" ref="applicationTabsRef" />
    <template #rightFooter>
      <!-- <a-button type="primary" color="warning" @click="resetFields">
        {{ t('common.resetText') }}
      </a-button> -->
      <a-button type="primary" @click="handleSubmit" class="ml-4">
        {{ t('common.saveText') }}
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import TenantList from './grant/TenantList.vue';
  import ApplicationTabs from './grant/ApplicationTabs.vue';
  import { query } from '/@/api/lamp/tenant/tenant';
  import { TenantStatusEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: '授权',
    components: {
      PageWrapper,
      TenantList,
      ApplicationTabs,
    },
    emits: ['success', 'register'],
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const formData = reactive<Recordable>({
        tenantList: [],
        checkedList: [],
      });
      const tenantListRef = ref<any>(null);
      const applicationTabsRef = ref<any>(null);
      function getTenantList() {
        const tree = unref(tenantListRef);
        if (!tree) {
          throw new Error('tenant list is null!');
        }
        return tree;
      }
      function getApplicationTabs() {
        const tree = unref(applicationTabsRef);
        if (!tree) {
          throw new Error('application tabs is null!');
        }
        return tree;
      }
      onMounted(async () => {
        formData.tenantList = await query({ status: TenantStatusEnum.NORMAL });
      });

      async function handleSubmit() {
        try {
          console.log(getTenantList());
          const data = getApplicationTabs().getData();
          console.log(data);
          createMessage.success('success');
        } finally {
        }
      }

      return { t, handleSubmit, formData, tenantListRef, applicationTabsRef };
    },
  });
</script>
