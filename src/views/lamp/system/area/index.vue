<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <AreaTree class="w-1/2" @select="handleTreeSelect" @add="handleTreeAdd" ref="treeRef" />
    <Edit class="w-1/2" @success="handleEditSuccess" ref="editRef" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { ActionEnum } from '/@/enums/commonEnum';
  import AreaTree from './Tree.vue';
  import Edit from './Edit.vue';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'AreaManage',
    components: { Edit, AreaTree, PageWrapper },
    setup() {
      const editRef = ref<any>(null);
      const treeRef = ref<any>(null);
      const { refreshPage } = useTabs();

      // 获取编辑表单
      function getEditRef() {
        return unref(editRef);
      }
      // 获取树
      // function getTreeRef() {
      //   return unref(treeRef);
      // }

      // 编辑成功回调
      function handleEditSuccess() {
        // getTreeRef().fetch(); // 之前展开过的数据会失去 左边的下载按钮
        refreshPage();
      }

      // 选中树的节点
      function handleTreeSelect(parent = {}, record = {}) {
        getEditRef().setData({ type: ActionEnum.EDIT, parent, record });
      }

      // 点击树的新增按钮
      function handleTreeAdd(parent = {}) {
        getEditRef().setData({ type: ActionEnum.ADD, parent });
      }

      return {
        editRef,
        treeRef,
        handleEditSuccess,
        handleTreeSelect,
        handleTreeAdd,
      };
    },
  });
</script>
