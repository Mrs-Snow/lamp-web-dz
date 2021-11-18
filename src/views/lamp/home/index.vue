<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex" v-if="userinfo && userinfo.employeeId && userinfo.employeeId !== '0'">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ApplicationCard class="enter-y" :api="findMyApplication" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="w-full lg:w-3/10 enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="mx-auto xl:h-50 h-30" :src="illustration" />
        </Card>

        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div>
    <div class="p-8" v-else>
      <Empty
        :image-style="{
          'justify-content': 'center',
          'align-items': 'center',
          display: 'flex',
          height: '250px',
        }"
        :image="illustration"
      >
        <template #description>
          <div style="font-size: 1.75rem" class="mx-auto mt-10 mb-10"> 您还不属于任何企业 </div>
        </template>
        <a-button type="primary" @click="handleTenant">注册企业</a-button>
        <a-button class="ml-20" type="primary" @click="handleEmployee">成为员工</a-button>
      </Empty>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ApplicationCard from './components/ApplicationCard.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useRouter } from 'vue-router';
  import QuickNav from './components/QuickNav.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import SaleRadar from './components/SaleRadar.vue';
  import { findMyApplication } from '/@/api/lamp/profile/userInfo';
  import illustration from '/@/assets/svg/illustration.svg';
  import { useMessage } from '/@/hooks/web/useMessage';

  const loading = ref(false);
  const userStore = useUserStore();
  const { createSuccessModal } = useMessage();
  const { replace } = useRouter();
  const userinfo = computed(() => userStore.getUserInfo);

  function handleEmployee() {
    createSuccessModal({ content: '请联系贵公司管理员邀请您加入公司。' });
  }

  function handleTenant() {
    replace({
      name: 'myTenantInfo',
    });
  }
</script>

<style lang="less" scoped>
  .ant-empty-image img {
    margin: auto;
    height: 100%;
  }
</style>
