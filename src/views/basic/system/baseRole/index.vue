<template>
  <PageWrapper dense>
    <div class="overflow-hidden flex" ref="wrapEl">
      <RoleList class="md:w-1/3" @select="handleRoleSelect" ref="roleListRef" />
      <ApplicationTabs class="md:w-2/3" ref="applicationResourceRef" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import RoleList from './roleList/index.vue';
  import ApplicationTabs from './applicationResource/ApplicationTabs.vue';
  import { useLoading } from '/@/components/Loading';
  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseRoleManagement',
    components: { PageWrapper, RoleList, ApplicationTabs },
    setup() {
      const { t } = useI18n();
      const wrapEl = ref<ElRef>(null);
      const roleListRef = ref<any>(null);
      const applicationResourceRef = ref<any>(null);

      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: '加载中...',
          absolute: true,
        },
      });

      // 获取字典条目表单
      function getApplicationResourceRef() {
        return unref(applicationResourceRef);
      }

      // 选择角色事件
      async function handleRoleSelect(role: Recordable) {
        try {
          openWrapLoading();
          await getApplicationResourceRef().fetch(role);
        } finally {
          closeWrapLoading();
        }
      }

      return {
        t,
        wrapEl,
        roleListRef,
        applicationResourceRef,
        handleRoleSelect,
      };
    },
  });
</script>
