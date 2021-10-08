<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <div class="m-4">
      <Select
        :options="data.applicationList"
        showSearch
        labelInValue
        :disabled="data.appDisabled"
        v-model:value="applicationRef"
        placeholder="选择应用"
        style="width: 100%; margin-bottom: 1rem"
        @change="handleChange"
      />
      <a-button
        @click="handleAdd()"
        v-hasAnyPermission="[RoleEnum.RESOURCE_ADD, RoleEnum.APPLICATION_RESOURCE_ADD]"
        class="mr-2"
        >{{ t('common.title.addRoot') }}</a-button
      >
      <a-button
        @click="handleBatchDelete()"
        v-hasAnyPermission="[RoleEnum.RESOURCE_DELETE, RoleEnum.APPLICATION_RESOURCE_DELETE]"
        class="mr-2"
        >{{ t('common.title.delete') }}</a-button
      >
    </div>
    <BasicTree
      :title="t('devOperation.application.defResource.table.title')"
      toolbar
      checkable
      search
      checkStrictly
      highlight
      :actionList="actionList"
      :beforeRightClick="getRightMenuList"
      :clickRowToExpand="true"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'label' }"
      @select="handleSelect"
      ref="treeRef"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, h, reactive } from 'vue';
  import { Select } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PermModeEnum, RoleEnum } from '/@/enums/roleEnum';
  import {
    BasicTree,
    TreeItem,
    ActionItem,
    TreeActionType,
    ContextMenuItem,
  } from '/@/components/Tree';
  import { findNodeByKey } from '/@/utils/lamp/common';
  import { query } from '/@/api/devOperation/application/defApplication';
  import { tree, remove } from '/@/api/devOperation/application/defResource';

  export default defineComponent({
    name: 'DefResourceManagement',
    components: { BasicTree, Select },

    emits: ['select', 'add', 'change'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      const { currentRoute } = useRouter();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      const data = reactive<Recordable>({
        applicationList: [],
        appDisabled: false,
      });
      const applicationRef = reactive<Recordable>({ value: '', label: '' });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('树结构加载失败,请刷新页面');
        }
        return tree;
      }

      onMounted(async () => {
        const params = currentRoute.value?.params;
        applicationRef.value = params?.id as string;
        const applications = await query({ id: params?.id as string });
        data.appDisabled = params?.id ? true : false;

        data.applicationList = applications.map((item) => ({
          label: item.name,
          value: item.id,
          key: item.id,
        }));
        if (applications && applications.length > 0) {
          applicationRef.value = applications[0]?.id;
          applicationRef.label = applications[0]?.name;
          await fetch(applicationRef.value);
        }
      });
      // 加载数据
      async function fetch(applicationId?: string) {
        applicationId = applicationId || applicationRef.value;
        if (!!applicationId) {
          treeData.value = (await tree({ applicationId })) as unknown as TreeItem[];
          setTimeout(() => {
            getTree().filterByLevel(2);
          }, 0);
        } else {
          createMessage.warn('请先选择应用');
        }
      }

      // 选择节点
      function handleSelect(keys: string[]) {
        if (keys[0]) {
          const node = findNodeByKey(keys[0], treeData.value);
          const parent = findNodeByKey(node?.parentId, treeData.value);
          node.applicationId = applicationRef.value;
          node.applicationName = applicationRef.label;
          emit('select', parent, node);
        }
      }

      // 悬停图标
      const actionList: ActionItem[] = [
        {
          auth: [RoleEnum.RESOURCE_ADD, RoleEnum.APPLICATION_RESOURCE_ADD],
          authMode: PermModeEnum.HasAny,
          render: (node) => {
            return h(PlusOutlined, {
              class: 'ml-2',
              onClick: (e: Event) => {
                e?.stopPropagation();
                e?.preventDefault();
                emit('add', findNodeByKey(node.id, treeData.value), {
                  applicationId: applicationRef.value,
                  applicationName: applicationRef.label,
                });
              },
            });
          },
        },
        {
          auth: [RoleEnum.RESOURCE_DELETE, RoleEnum.APPLICATION_RESOURCE_DELETE],
          authMode: PermModeEnum.HasAny,
          render: (node) => {
            return h(DeleteOutlined, {
              class: 'ml-2',
              onClick: (e: Event) => {
                e?.stopPropagation();
                e?.preventDefault();
                batchDelete([node.id]);
              },
            });
          },
        },
      ];

      // 右键菜单
      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            auth: [RoleEnum.RESOURCE_ADD, RoleEnum.APPLICATION_RESOURCE_ADD],
            authMode: PermModeEnum.HasAny,
            label: t('common.title.addChildren'),
            handler: () => {
              emit('add', findNodeByKey(unref(node.$attrs).id, treeData.value), {
                applicationId: applicationRef.value,
                applicationName: applicationRef.label,
              });
            },
            icon: 'ant-design:plus-square-outlined',
          },
          {
            label: t('common.title.delete'),
            handler: () => {
              batchDelete([unref(node.$attrs).id]);
            },
            icon: 'ant-design:delete-outlined',
            auth: [RoleEnum.RESOURCE_DELETE, RoleEnum.APPLICATION_RESOURCE_DELETE],
            authMode: PermModeEnum.HasAny,
          },
        ];
      }

      // 执行批量删除
      async function batchDelete(ids: string[]) {
        createConfirm({
          iconType: 'warning',
          content: '选中节点及其子结点将被永久删除, 是否确定删除？',
          onOk: async () => {
            await remove(ids);
            createMessage.success(t('common.tips.deleteSuccess'));
            fetch();
          },
        });
      }

      // 点击树外面的 新增
      function handleAdd() {
        emit('add', findNodeByKey('0', treeData.value), {
          applicationId: applicationRef.value,
          applicationName: applicationRef.label,
        });
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

      function handleChange({ value, label }) {
        applicationRef.label = label;
        applicationRef.value = value;
        fetch(value);
        emit('change', value, label);
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
        query,
        handleChange,
        data,
        applicationRef,
        RoleEnum,
      };
    },
  });
</script>
