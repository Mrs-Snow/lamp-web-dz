<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <MenuTree class="w-1/4" @select="handleTreeSelect" @add="handleTreeAdd" ref="treeRef" />
    <Edit class="w-1/3" @success="handleEditSuccess" ref="editRef" />
    <ResourceIndex class="w-1/2" @success="handleResourceSuccess" ref="resourceIndexRef" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { ActionEnum } from '/@/enums/commonEnum';
  import MenuTree from './Tree.vue';
  import Edit from './Edit.vue';
  import ResourceIndex from './ResourceIndex.vue';

  export default defineComponent({
    name: 'MenuManage',
    components: { Edit, ResourceIndex, MenuTree, PageWrapper },
    setup() {
      const editRef = ref<any>(null);
      const treeRef = ref<any>(null);
      const resourceIndexRef = ref<any>(null);

      // 获取编辑表单
      function getEditRef() {
        return unref(editRef);
      }
      // 获取树
      function getTreeRef() {
        return unref(treeRef);
      }
      function getResourceIndexRef() {
        return unref(resourceIndexRef);
      }

      // 编辑成功回调
      function handleEditSuccess() {
        getTreeRef().fetch();
        getResourceIndexRef().setData({ record: { id: '0' } });
      }

      // 选中树的节点
      function handleTreeSelect(parent = {}, record = {}, treeData = []) {
        getEditRef().setData({ type: ActionEnum.EDIT, parent, record, treeData });
        getResourceIndexRef().setData({ record });
      }

      // 点击树的新增按钮
      function handleTreeAdd(parent = {}, treeData = []) {
        getEditRef().setData({ type: ActionEnum.ADD, parent, treeData });
        getResourceIndexRef().setData({ record: { id: '0' } });
      }

      function handleResourceSuccess(_) {}

      return {
        editRef,
        treeRef,
        resourceIndexRef,
        handleEditSuccess,
        handleTreeSelect,
        handleTreeAdd,
        handleResourceSuccess,
      };
    },
  });
</script>
