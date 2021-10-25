<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <RoleList class="md:w-1/3" @select="handleRoleSelect" ref="roleListRef" />
    <ApplicationTabs class="md:w-2/3" ref="applicationResourceRef" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import RoleList from './roleList/index.vue';
  import ApplicationTabs from './applicationResource/ApplicationTabs.vue';
  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'BaseRoleManagement',
    components: { PageWrapper, RoleList, ApplicationTabs },
    setup() {
      const { t } = useI18n();
      const roleListRef = ref<any>(null);
      const applicationResourceRef = ref<any>(null);

      // 获取字典条目表单
      function getApplicationResourceRef() {
        return unref(applicationResourceRef);
      }

      // 选择角色事件
      function handleRoleSelect(role: Recordable) {
        getApplicationResourceRef().fetch(role);
      }

      return {
        t,
        roleListRef,
        applicationResourceRef,
        handleRoleSelect,
      };
    },
  });
</script>
