<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <BasicTree
      :title="t('lamp.system.role.table.title')"
      checkStrictly
      search
      :clickRowToExpand="true"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, unref } from 'vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { query } from '/@/api/lamp/system/role';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { findNodeByKey } from '/@/utils/lamp/common';

  export default defineComponent({
    name: 'RoleList',
    components: { BasicTree },
    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      onMounted(() => {
        fetch();
      });

      // 加载数据
      async function fetch() {
        treeData.value = (await query({})) as unknown as TreeItem[];
      }

      // 选择节点
      function handleSelect(keys: string[]) {
        if (keys[0]) {
          const node = findNodeByKey(keys[0], treeData.value);
          emit('select', node);
        }
      }

      async function setData(roleId: string) {
        getTree().setSelectedKeys([roleId]);
        await fetch();
        handleSelect([roleId]);
      }

      return {
        t,
        treeRef,
        treeData,
        handleSelect,
        setData,
      };
    },
  });
</script>
