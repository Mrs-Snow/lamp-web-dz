<template>
  <PageWrapper dense contentClass="flex">
    <DefResourceTree
      class="md:w-1/4"
      @select="handleTreeSelect"
      @add="handleTreeAdd"
      @change="handlerApplicationChange"
      ref="treeRef"
    />
    <Edit class="md:w-3/4" @success="handleEditSuccess" ref="editRef" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { ActionEnum } from '/@/enums/commonEnum';
  import DefResourceTree from './Tree.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Edit from './Edit.vue';
  import { ResourceTypeEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: 'DefResourceManage',
    components: { Edit, DefResourceTree, PageWrapper },
    setup() {
      const editRef = ref<any>(null);
      const treeRef = ref<any>(null);
      const { createMessage } = useMessage();

      // 获取编辑表单
      function getEditRef() {
        return unref(editRef);
      }
      // 获取树
      function getTreeRef() {
        return unref(treeRef);
      }

      // 编辑成功回调
      function handleEditSuccess() {
        getTreeRef().fetch();
      }

      // 选中树的节点
      function handleTreeSelect(parent = {}, record = {}) {
        getEditRef().setData({ type: ActionEnum.EDIT, parent, record });
      }

      // 点击树的新增按钮
      function handleTreeAdd(parent = {} as { resourceType: string }, record = {}) {
        if (parent?.resourceType === ResourceTypeEnum.FIELD) {
          createMessage.warn('字段下不能添加子资源');
          getEditRef().resetForm(record);
        } else {
          getEditRef().setData({ type: ActionEnum.ADD, parent, record });
        }
      }

      function handlerApplicationChange(_, label) {
        getEditRef().resetForm({ applicationName: label });
      }
      return {
        editRef,
        treeRef,
        handleEditSuccess,
        handleTreeSelect,
        handleTreeAdd,
        handlerApplicationChange,
      };
    },
  });
</script>
