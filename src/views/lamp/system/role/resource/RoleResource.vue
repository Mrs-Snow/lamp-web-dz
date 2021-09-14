<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <RoleList class="xl:w-1/5" @select="handleRoleSelect" ref="roleListRef" />
    <ResourceTree class="xl:w-4/5" @success="handleTreeSuccess" ref="treeRef" />
    <template #rightFooter>
      <a-button type="primary" color="warning" @click="resetFields">
        {{ t('common.resetText') }}
      </a-button>
      <a-button type="primary" @click="handleSubmit" class="ml-4">
        {{ t('common.saveText') }}
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { PageWrapper } from '/@/components/Page';
  import RoleList from '../resource/RoleList.vue';
  import ResourceTree from '../resource/ResourceTree.vue';

  export default defineComponent({
    name: 'RoleResource',
    components: { PageWrapper, RoleList, ResourceTree },
    setup() {
      const { t } = useI18n();
      const roleListRef = ref<any>(null);
      const treeRef = ref<any>(null);
      const { currentRoute } = useRouter();

      // 获取树
      function getTreeRef() {
        return unref(treeRef);
      }

      function getRoleListRef() {
        return unref(roleListRef);
      }

      onMounted(() => {
        const { params } = currentRoute.value;
        getRoleListRef().setData(params.roleId);
      });
      // 选择角色
      function handleRoleSelect(record: Recordable = {}) {
        getTreeRef().setData({ record });
      }

      // 保存成功
      function handleTreeSuccess() {}

      function handleSubmit() {
        getTreeRef().handleSubmit();
      }
      function resetFields() {
        getTreeRef().resetFields();
      }
      return {
        t,
        roleListRef,
        treeRef,
        handleRoleSelect,
        handleTreeSuccess,
        resetFields,
        handleSubmit,
      };
    },
  });
</script>
