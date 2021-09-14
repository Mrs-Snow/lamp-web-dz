<template>
  <div class="m-4 ml-2 overflow-hidden bg-white">
    <BasicTree
      class="h-9/10"
      :title="title"
      toolbar
      checkable
      checkStrictly
      search
      :checkedKeys="selectedKeys"
      :expandedKeys="selectedKeys"
      :clickRowToExpand="true"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'label' }"
      ref="treeRef"
    >
      <template #title="item">
        <TreeIcon :icon="item.icon" v-if="item.icon" />
        <span> [{{ item.type?.desc }}] {{ item.label }} </span>
      </template>
    </BasicTree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { cloneDeep } from 'lodash-es';
  import { useLoading } from '/@/components/Loading';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTree, TreeItem, TreeActionType, TreeIcon } from '/@/components/Tree';
  import { isArray } from '/@/utils/is';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { findNodeByFunction } from '/@/utils/lamp/common';
  import { menuResourceTree } from '/@/api/lamp/system/menu';
  import { resourceList, saveResource } from '/@/api/lamp/system/role';

  export default defineComponent({
    name: 'ResourceTree',
    components: { BasicTree, TreeIcon },

    emits: ['success'],
    setup(_) {
      const { t } = useI18n();
      const { closeCurrent } = useTabs();
      const { createMessage } = useMessage();
      const { replace } = useRouter();
      // const confirmLoading = ref(false);
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      const roleRef = ref({ id: '0', name: '' });
      const title = ref('资源列表');
      const selectedKeys = ref<string[]>([]);

      onMounted(() => {
        fetch();
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      // 加载数据
      async function fetch() {
        treeData.value = (await menuResourceTree()) as unknown as TreeItem[];
      }

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });

      async function setData(data: Recordable) {
        const { record } = data;
        roleRef.value = record;
        title.value = '[' + record.name + '] 拥有的资源';

        openFullLoading();
        try {
          await loadResourceList(record.id);
        } finally {
          closeFullLoading();
        }
      }

      async function loadResourceList(roleId: string) {
        const result = await resourceList(roleId);
        selectedKeys.value = [...result?.menuIdList, ...result?.resourceIdList];
      }

      function resetFields() {
        loadResourceList(roleRef.value.id);
      }

      async function handleSubmit() {
        if (!roleRef.value.id) {
          return createMessage.warn('请先选择角色');
        }
        const checkedKeys = getTree().getCheckedKeys();

        const selectedNodeList = findNodeByFunction(
          unref(treeData),
          (item: any) => {
            return isArray(checkedKeys)
              ? checkedKeys.includes(item.id)
              : checkedKeys.checked.includes(item.id);
          },
          (item) => item
        );
        const nodeList = cloneDeep(selectedNodeList);
        nodeList.forEach((item) => {
          item.children = undefined;
        });

        const params = {
          menuIdList: findNodeByFunction(
            nodeList,
            (item: any) => {
              return item.type?.code === 'MENU';
            },
            (item) => item.id
          ),
          resourceIdList: findNodeByFunction(
            nodeList,
            (item: any) => {
              return item.type?.code === 'RESOURCE';
            },
            (item) => item.id
          ),
          roleId: roleRef.value.id,
        };
        openFullLoading();
        try {
          const flag = await saveResource(params);
          if (flag) {
            createMessage.success('保存成功');
            await closeCurrent();
            replace({
              name: '角色管理',
            });
          }
        } finally {
          closeFullLoading();
        }
      }
      return {
        t,
        treeRef,
        treeData,
        fetch,
        setData,
        title,
        resetFields,
        handleSubmit,
        selectedKeys,
      };
    },
  });
</script>
