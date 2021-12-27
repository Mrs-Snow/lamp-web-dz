<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex" v-if="userinfo && userinfo.employeeId && userinfo.employeeId !== '0'">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ApplicationCard
          title="我的应用 (点击应用进行切换应用，体验不同应用的功能)"
          :class="['enter-y', myAppCls]"
          :api="findMyApplication"
        />
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
<script lang="ts">
  export default {
    name: 'Welcome',
  };
</script>
<script lang="ts" setup>
  import { computed, ref, onMounted, nextTick } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ApplicationCard from './components/ApplicationCard.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import SaleRadar from './components/SaleRadar.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDesign } from '/@/hooks/web/useDesign';
  import QuickNav from './components/QuickNav.vue';
  import { findMyApplication } from '/@/api/lamp/profile/userInfo';
  import illustration from '/@/assets/svg/illustration.svg';

  import intro from 'intro.js';
  import 'intro.js/minified/introjs.min.css';

  const loading = ref(false);
  const userStore = useUserStore();
  const { createSuccessModal } = useMessage();
  const { replace } = useRouter();
  const userinfo = computed(() => userStore.getUserInfo);
  const { prefixCls: myAppCls, prefixVar } = useDesign('myApplication');

  function handleEmployee() {
    createSuccessModal({ content: '请联系贵公司管理员邀请您加入公司。' });
  }

  function handleStart() {
    // 可以根据自身的需求，改成用户首次登陆系统时提示（可以通过redis记录用户是否首次登陆，或增加一张表来记录。）
    intro()
      .setOptions({
        //对应的按钮
        prevLabel: '上一步 &larr;',
        nextLabel: '下一步 &rarr;',
        skipLabel: '跳过',
        doneLabel: '结束',
        steps: [
          {
            title: '欢迎访问',
            intro: '欢迎体验《灯灯》SaaS快速开发平台 👋',
          },
          {
            title: '当前企业',
            element: document.querySelector(`.${prefixVar}-layout-header-left`)!,
            intro: '当您属于多个企业时，可以在此切换当前企业。',
            position: 'right',
          },
          {
            title: '我的应用',
            element: document.querySelector(`.${myAppCls}`)!,
            intro: '当您所在的企业购买了多个应用时，可以在此切换当前应用。',
          },
          {
            title: '用户功能区',
            element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
            intro: '您可以在此修改你的个人信息。',
          },
        ],
      })
      .start();
  }

  onMounted(async () => {
    await nextTick();
    handleStart();
  });

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
