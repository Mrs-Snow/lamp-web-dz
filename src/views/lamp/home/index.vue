<template>
  <PageWrapper>
    <template #headerContent>
      <WorkbenchHeader />
    </template>
    <div v-if="isUser" class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ApplicationCard
          :api="findMyApplication"
          :class="['enter-y', myAppCls]"
          title="我的应用 (点击应用进行切换应用，体验不同应用的功能)"
        />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="w-full lg:w-3/10 enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card :loading="loading" class="!my-4 enter-y">
          <img :src="illustration" class="mx-auto xl:h-50 h-30" />
        </Card>

        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div>
    <div v-else class="p-8">
      <Empty
        :image="illustration"
        :image-style="{
          'justify-content': 'center',
          'align-items': 'center',
          display: 'flex',
          height: '250px',
        }"
      >
        <template #description>
          <div class="mx-auto mt-10 mb-10" style="font-size: 1.75rem"> 您还不属于任何企业</div>
        </template>
        <a-button :class="[rtCls]" type="primary" @click="handleTenant">注册企业</a-button>
        <a-button :class="[beCls, 'ml-20']" type="primary" @click="handleEmployee">
          成为员工
        </a-button>
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
  import { computed, ref, unref, onMounted } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ApplicationCard from './components/ApplicationCard.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import SaleRadar from './components/SaleRadar.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { isDevMode } from '/@/utils/env';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDesign } from '/@/hooks/web/useDesign';
  import QuickNav from './components/QuickNav.vue';
  import { findMyApplication } from '/@/api/lamp/profile/userInfo';
  import illustration from '/@/assets/svg/illustration.svg';

  import intro from 'intro.js';
  import 'intro.js/minified/introjs.min.css';
  import { useGlobSetting } from '/@/hooks/setting';

  const loading = ref(false);
  const userStore = useUserStore();
  const { createSuccessModal } = useMessage();
  const { replace } = useRouter();
  const globSetting = useGlobSetting();
  const BASE_APP_ID = globSetting.baseApplicationId;
  //const userinfo = computed(() => userStore.getUserInfo);
  const isUser = computed(
    () => userStore.getUserInfo?.employeeId && userStore.getUserInfo?.employeeId !== '0',
  );
  const { prefixCls: myAppCls, prefixVar } = useDesign('myApplication');
  const rtCls = `${prefixVar}-register-tenant`;
  const beCls = `${prefixVar}-become-employee`;

  function handleEmployee() {
    createSuccessModal({ content: '请联系贵公司管理员邀请您加入公司。' });
  }

  function handleStart() {
    let steps = [] as intro.Step[];
    // 可以根据自身的需求，改成用户首次登陆系统时提示（可以通过redis记录用户是否首次登陆，或增加一张表来记录。）
    if (unref(isUser)) {
      steps = [
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
          title: '用户功能区',
          element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
          intro: '您可以在此修改您的个人信息。',
        },
        {
          title: '我的应用',
          element: document.querySelector(`.${myAppCls}`)!,
          intro: '当您所在的企业购买了多个应用时，可以在此切换应用，每个应用拥有不同的功能。',
        },
        {
          title: '基础平台',
          element: document.querySelector(`.${prefixVar}-basicPlatform`)!,
          intro:
            '企业(租户)的工作台，拥有平台最基础最核心的功能，开发者可以继续开发和完善平台的基础功能。',
        },
        {
          title: '开发运营系统',
          element: document.querySelector(`.${prefixVar}-devOperation`)!,
          intro:
            '开发者或运营者使用的系统，拥有平台级功能；开发者或运营者可以在此给企业（租户）开通企业账号和应用权限等。',
        },
        {
          title: '业务系统',
          element: document.querySelector(`.${prefixVar}-businessSystem`)!,
          intro:
            '此系统是开发者根据自身的业务需求进行二次开发。开发完毕后，通过应用授权或购买的方式给企业开通访问权限。',
        },
      ];
    } else {
      steps = [
        {
          title: '欢迎访问',
          intro: '欢迎体验《灯灯》SaaS快速开发平台 👋',
        },
        {
          title: '注册企业',
          element: document.querySelector(`.${rtCls}`)!,
          intro: '您可以点击此按钮，填写企业信息成为企业主~',
          position: 'left',
        },
        {
          title: '成为员工',
          element: document.querySelector(`.${beCls}`)!,
          intro: '您也可以申请成为其他企业的员工~',
          position: 'right',
        },
        {
          title: '当前企业',
          element: document.querySelector(`.${prefixVar}-layout-header-left`)!,
          intro: '当您属于多个企业时，可以在此切换当前企业。',
          position: 'right',
        },
        {
          title: '用户功能区',
          element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
          intro: '您可以在此修改你的个人信息。',
        },
      ];
    }
    if (userStore.getApplicationId === BASE_APP_ID && !isDevMode()) {
      intro()
        .setOptions({
          //对应的按钮
          prevLabel: '上一步 &larr;',
          nextLabel: '下一步 &rarr;',
          skipLabel: '跳过',
          doneLabel: '结束',
          steps,
        })
        .start();
    }
  }

  onMounted(async () => {
    // 必须要setTimeout才能让document.querySelector正确选取某些元素？
    // 这里是否可以优化，知道的朋友欢迎pr
    setTimeout(() => handleStart(), 1000);
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
