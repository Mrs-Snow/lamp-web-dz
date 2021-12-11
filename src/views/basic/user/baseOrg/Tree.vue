<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <div class="m-4">
      <a-button type="primary" @click="changeDisplay()" class="mr-2"> 切换 </a-button>
      <a-button
        @click="handleAdd()"
        preIcon="ant-design:plus-outlined"
        v-hasAnyPermission="[RoleEnum.ORG_ADD]"
        class="mr-2"
      >
        {{ t('common.title.addRoot') }}
      </a-button>
      <a-button
        @click="handleBatchDelete()"
        v-hasAnyPermission="[RoleEnum.ORG_DELETE]"
        preIcon="ant-design:delete-outlined"
        class="mr-2"
      >
        {{ t('common.title.delete') }}
      </a-button>
    </div>
    <BasicTree
      :title="t('basic.user.baseOrg.table.title')"
      toolbar
      checkable
      search
      checkStrictly
      :actionList="actionList"
      :beforeRightClick="getRightMenuList"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, h } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    BasicTree,
    TreeItem,
    TreeActionItem,
    TreeActionType,
    ContextMenuItem,
  } from '/@/components/Tree';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { findNodeByKey } from '/@/utils/lamp/common';

  import { tree, remove } from '/@/api/basic/user/baseOrg';

  export default defineComponent({
    name: 'BaseOrgManagement',
    components: { BasicTree },

    emits: ['select', 'add', 'edit', 'change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('树结构加载失败,请刷新页面');
        }
        return tree;
      }

      onMounted(() => {
        fetch();
      });

      // 加载数据
      async function fetch() {
        treeData.value = (await tree()) as unknown as TreeItem[];
        setTimeout(() => {
          getTree().filterByLevel(2);
        }, 0);
      }

      // 选择节点
      function handleSelect(keys: string[]) {
        if (keys[0]) {
          const node = findNodeByKey(keys[0], treeData.value);
          const parent = findNodeByKey(node?.parentId, treeData.value);
          emit('select', parent, node);
        }
      }

      // 悬停图标
      const actionList: TreeActionItem[] = [
        {
          auth: RoleEnum.ORG_ADD,
          render: (node) => {
            return h(
              'a',
              {
                class: 'ml-2',
                onClick: (e: Event) => {
                  e?.stopPropagation();
                  e?.preventDefault();
                  emit('add', findNodeByKey(node.id, treeData.value));
                },
              },
              t('common.title.add'),
            );
          },
        },
        {
          auth: RoleEnum.ORG_EDIT,
          render: (node) => {
            return h(
              'a',
              {
                class: 'ml-2',
                onClick: (e: Event) => {
                  e?.stopPropagation();
                  e?.preventDefault();
                  const current = findNodeByKey(node?.id, treeData.value);
                  const parent = findNodeByKey(node?.parentId, treeData.value);
                  emit('edit', parent, current);
                },
              },
              t('common.title.edit'),
            );
          },
        },
        {
          auth: RoleEnum.ORG_DELETE,
          render: (node) => {
            return h(
              'a',
              {
                class: 'ml-2',
                onClick: (e: Event) => {
                  e?.stopPropagation();
                  e?.preventDefault();
                  batchDelete([node.id]);
                },
              },
              t('common.title.delete'),
            );
          },
        },
      ];

      // 右键菜单
      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: t('common.title.addChildren'),
            auth: [RoleEnum.ORG_ADD],
            handler: () => {
              emit('add', findNodeByKey(unref(node).id, treeData.value));
            },
            icon: 'ant-design:plus-outlined',
          },
          {
            label: t('common.title.edit'),
            auth: [RoleEnum.ORG_EDIT],
            handler: () => {
              const current = findNodeByKey(unref(node)?.id, treeData.value);
              const parent = findNodeByKey(unref(node)?.parentId, treeData.value);
              emit('edit', parent, current);
            },
            icon: 'ant-design:edit-outlined',
          },
          {
            label: t('common.title.delete'),
            auth: [RoleEnum.ORG_DELETE],
            handler: () => {
              batchDelete([unref(node).id]);
            },
            icon: 'ant-design:delete-outlined',
          },
        ];
      }

      // 执行批量删除
      async function batchDelete(ids: string[]) {
        createConfirm({
          iconType: 'warning',
          content: '选中节点及其子结点将被永久删除, 是否确定删除？',
          onOk: async () => {
            try {
              await remove(ids);
              createMessage.success(t('common.tips.deleteSuccess'));
              fetch();
            } catch (e) {}
          },
        });
      }

      // 点击树外面的 新增
      function handleAdd() {
        emit('add', findNodeByKey('0', treeData.value));
      }

      // 点击树外面的 批量删除
      function handleBatchDelete() {
        const { checked } = getTree().getCheckedKeys() as {
          checked: string[];
          halfChecked: string[];
        };
        if (!checked || checked.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        batchDelete(checked);
      }

      // 切换显示方式
      function changeDisplay() {
        emit('change', '1');
      }

      return {
        t,
        treeRef,
        treeData,
        fetch,
        handleAdd,
        handleBatchDelete,
        getRightMenuList,
        actionList,
        handleSelect,
        changeDisplay,
        RoleEnum,
      };
    },
  });
</script>
