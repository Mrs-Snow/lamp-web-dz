<template>
  <CollapseContainer class="mb-4 appResource">
    <template #title>
      <Checkbox
        :value="application.id"
        @change="onCheckAllChange"
        :indeterminate="indeterminate"
        v-model:checked="checkAll"
      >
        {{ application.name }}</Checkbox
      ></template
    >
    <BasicTree
      checkable
      checkStrictly
      :clickRowToExpand="false"
      :treeData="resourceList"
      :replaceFields="replaceFields"
      ref="treeRef"
      @check="checkNode"
    >
      <template #title="item">
        <TreeIcon :icon="item.icon" v-if="item.icon" />
        [{{ item.echoMap?.resourceType }}] {{ item.label }}
        <span>
          <a
            v-if="item.children && item.children.length"
            @click="selectAll(item.id, $event)"
            style="margin-left: 30px"
            >{{ isAllCheckedByKey(item.id) ? '取消全选' : '全选' }}</a
          >
        </span>
      </template>
    </BasicTree>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, toRefs, reactive } from 'vue';
  import { Checkbox } from 'ant-design-vue';
  import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicTree, TreeActionType, TreeIcon, ReplaceFields } from '/@/components/Tree';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { eachTree, getChildrenByParentId, getById } from '/@/utils/helper/treeHelper';
  import { isArray } from '/@/utils/is';
  import { uniq } from 'lodash-es';
  const replaceFields: ReplaceFields = { key: 'id', title: 'label' };
  export default defineComponent({
    name: 'ApplicationTab',
    components: {
      BasicTree,
      Checkbox,
      CollapseContainer,
      TreeIcon,
    },
    props: {
      application: {
        type: Object as PropType<Recordable>,
        default: () => {
          return {};
        },
      },
      resourceList: {
        type: Array as PropType<TreeDataItem[]>,
        default: () => {
          return [] as TreeDataItem[];
        },
      },
    },
    setup(props) {
      const { t } = useI18n();
      const treeRef = ref<Nullable<TreeActionType>>(null);

      const formData = reactive<Recordable>({
        expirationTime: '',
        applicationList: [],
      });
      const state = reactive({
        indeterminate: false,
        checkAll: false,
        allKeys: [] as string[],
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      onMounted(async () => {
        const keys = [] as string[];

        eachTree(
          props.resourceList,
          (item, parant) => {
            keys.push(item.id);
            item.keyLinks = [...(parant.keyLinks || []), item.id];
            item.slots = { title: 'title' };
            return item;
          },
          {},
        );

        state.allKeys = keys;
      });

      function getCheckedKeys(): string[] {
        const checkedKeys = getTree().getCheckedKeys();
        return (isArray(checkedKeys) ? checkedKeys : checkedKeys.checked) as string[];
      }

      function onCheckAllChange(e: any) {
        e?.stopPropagation();
        e?.preventDefault();
        getTree()?.checkAll(e.target.checked);

        const checkeds = getCheckedKeys();
        state.indeterminate = checkeds.length > 0 && checkeds.length < state.allKeys.length;
      }

      function checkNode(checkedKeys, { checked, node }) {
        const checkeds = isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;
        if (checked) {
          const item = getById(node?.eventKey, props.resourceList);
          // 选中父节点
          let parentKeys = item?.keyLinks?.filter((item) => !checkeds.includes(item));
          if (parentKeys) {
            const newKeys = getCheckedKeys().concat(parentKeys);
            getTree().setCheckedKeys(uniq(newKeys));
          }
        } else {
          // 取消子节点
          const childrenIds = getChildrenByParentId(node?.eventKey, props.resourceList);
          const newKeys = getCheckedKeys().filter((item) => !childrenIds.includes(item));
          getTree().setCheckedKeys(uniq(newKeys));
        }

        state.checkAll =
          state.allKeys.length > 0 && state.allKeys.length === getCheckedKeys().length;
        state.indeterminate =
          getCheckedKeys().length > 0 && getCheckedKeys().length < state.allKeys.length;
        debugger;
      }

      function selectAll(id: string, e: any) {
        e?.stopPropagation();
        e?.preventDefault();
        const keys = getChildrenByParentId(id, props.resourceList);
        if (isAllChecked(keys)) {
          const newKeys = getCheckedKeys().filter((item) => !keys.includes(item));
          getTree().setCheckedKeys(newKeys);
        } else {
          const newKeys = getCheckedKeys().concat(keys);
          getTree().setCheckedKeys(uniq(newKeys));
        }

        state.checkAll =
          state.allKeys.length > 0 && state.allKeys.length === getCheckedKeys().length;
        state.indeterminate =
          getCheckedKeys().length > 0 && getCheckedKeys().length < state.allKeys.length;
      }

      function isAllCheckedByKey(id: string) {
        const keys = getChildrenByParentId(id, props.resourceList);

        return isAllChecked(keys);
      }

      function isAllChecked(ids: string[]) {
        if (!ids || !ids.length) {
          return false;
        }
        const checkedKeyts = getCheckedKeys().filter((item) => ids.includes(item));
        return checkedKeyts.length === ids.length;
      }

      return {
        ...toRefs(state),
        t,
        formData,
        onCheckAllChange,
        treeRef,
        checkNode,
        selectAll,
        isAllCheckedByKey,
        replaceFields,
      };
    },
  });
</script>
<style scoped>
  .appResource {
    border: 1px solid #d9d9d9;
  }
</style>
