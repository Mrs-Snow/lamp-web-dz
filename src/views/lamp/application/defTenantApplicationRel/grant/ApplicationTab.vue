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
      :treeData="resourceList"
      :replaceFields="{ key: 'id', title: 'label' }"
      ref="treeRef"
      @check="checkNode"
    />
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, toRefs, reactive } from 'vue';
  import { Checkbox } from 'ant-design-vue';

  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { forEach } from '/@/utils/helper/treeHelper';
  import { isArray } from '/@/utils/is';

  export default defineComponent({
    name: 'ApplicationTab',
    components: {
      BasicTree,
      Checkbox,
      CollapseContainer,
    },
    props: {
      application: {
        type: Object as PropType<Recordable>,
        default: () => {
          return {};
        },
      },
      resourceList: {
        type: Array as PropType<Recordable[]>,
        default: () => {
          return [];
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
        forEach(props.resourceList, (item) => {
          keys.push(item.id);
        });

        state.allKeys = keys;
      });

      function onCheckAllChange(e: any) {
        e?.stopPropagation();
        e?.preventDefault();
        getTree()?.checkAll(e.target.checked);

        const checkedKeys = getTree().getCheckedKeys();
        const checkeds = isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;

        state.indeterminate = checkeds.length > 0 && checkeds.length < state.allKeys.length;
      }

      function checkNode(node) {
        const checkeds = isArray(node) ? node : node.checked;
        state.checkAll = state.allKeys.length > 0 && state.allKeys.length === checkeds.length;

        state.indeterminate = checkeds.length > 0 && checkeds.length < state.allKeys.length;
      }

      return {
        ...toRefs(state),
        t,
        formData,
        onCheckAllChange,
        treeRef,
        checkNode,
      };
    },
  });
</script>
<style scoped>
  .appResource {
    border: 1px solid #d9d9d9;
  }
</style>
