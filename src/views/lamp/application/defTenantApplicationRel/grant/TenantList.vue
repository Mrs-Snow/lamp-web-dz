<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <BasicTree
      :title="t('lamp.tenant.tenant.table.title')"
      checkable
      search
      checkStrictly
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { query } from '/@/api/lamp/tenant/tenant';
  import { TenantStatusEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: 'TenantList',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);

      onMounted(async () => {
        await fetch();
      });
      // 加载数据
      async function fetch() {
        treeData.value = (await query({
          status: TenantStatusEnum.NORMAL,
        })) as unknown as TreeItem[];
      }

      // 选择节点
      function handleSelect(keys: string[]) {
        if (keys[0]) {
          emit('select', keys[0]);
        }
      }

      return {
        t,
        treeRef,
        treeData,
        fetch,
        handleSelect,
        query,
      };
    },
  });
</script>
