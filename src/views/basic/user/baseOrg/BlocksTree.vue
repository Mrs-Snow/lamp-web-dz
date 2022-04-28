<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <div class="m-4">
      <Space>
        <a-button
          v-hasAnyPermission="[RoleEnum.ORG_SWITCH]"
          class="mr-2"
          type="primary"
          @click="changeDisplay()"
        >
          切换
        </a-button>
        <!-- 垂直展示 -->
        <Checkbox v-model:checked="isHorizontal">垂直展示</Checkbox>
        <!-- 折叠节点 -->
        <Checkbox v-model:checked="collapsable">折叠节点</Checkbox>
        <!-- 主题背景 -->
        <Select
          :default-value="labelClassName"
          size="small"
          style="width: 120px"
          @change="changeClassName"
        >
          <SelectOption v-for="(item, index) in labelClassNameItem" :key="index" :value="item.value"
            >{{ item.label }}
          </SelectOption>
        </Select>
      </Space>
    </div>
    <Card>
      <div style="text-align: center; overflow: auto">
        <Spin :spinning="spinning" />
        <VueBlocksTree
          v-if="!spinning"
          :collapsable="collapsable"
          :data="treeData"
          :horizontal="isHorizontal"
          :label-class-name="labelClassName"
          :props="treeProps"
          @node-click="nodeClick"
        />
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { createApp, onMounted, reactive, ref } from 'vue'; // Composition-API
  import { Card, Checkbox, Select, Space, Spin } from 'ant-design-vue'; // antd组件
  // 引入VueBlocksTree组件
  import VueBlocksTree from 'vue3-blocks-tree';
  import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { TreeItem } from '/@/components/Tree';
  import { tree } from '/@/api/basic/user/baseOrg';
  import { findNodeByKey } from '/@/utils/helper/treeHelper';

  const SelectOption = Select.Option;

  interface TreeResult {
    name: string;
    expand: boolean;
    key: number;
    children?: TreeItem[];
  }

  const App = createApp({});
  // 注册VueBlocksTree组件
  let defaultOptions = { treeName: 'blocks-tree' };
  createApp(App).use(VueBlocksTree, defaultOptions);

  const emit = defineEmits(['change', 'select']);

  const isHorizontal = ref<boolean>(false); // 是否垂直展示
  const collapsable = ref<boolean>(false); // 折叠节点
  const spinning = ref<boolean>(false); // 加载 ...
  const labelClassName = ref<string>('bg-primary'); // 主题背景类名
  const labelClassNameItem = reactive([
    { value: 'bg-primary', label: '主题背景' },
    { value: 'bg-white', label: '洁白无瑕' },
    { value: 'bg-orange', label: '金橙' },
    { value: 'bg-gold', label: '金光灿灿' },
    { value: 'bg-gray', label: '珊瑚灰' },
    { value: 'bg-lightpink', label: '姹紫嫣红' },
    { value: 'bg-chocolate', label: '黑朱古力' },
    { value: 'bg-tomato', label: '红彤彤' },
  ]);
  const treeProps = { label: 'name', children: 'children', key: 'id' }; // 组件配置
  const treeData = reactive<TreeResult>({ name: '机构(单位/部门)树', expand: false, key: 0 });

  // 不同类型接口切换
  async function loadOrgTree() {
    spinning.value = true;
    try {
      treeData.children = (await tree()) as unknown as TreeItem[];
    } finally {
      spinning.value = false;
    }
  }

  // 切换主题颜色
  function changeClassName(value) {
    labelClassName.value = value;
  }

  // 切换显示方式
  function changeDisplay() {
    emit('change', '1');
  }

  function nodeClick(e: Event, data) {
    e?.stopPropagation();
    if (data && data.id) {
      const node = findNodeByKey(data.id, treeData.children || []);
      const parent = findNodeByKey(node?.parentId, treeData.children || []);
      emit('select', parent, node);
    }
  }

  // 首次挂载
  onMounted(async () => {
    await loadOrgTree();
  });
</script>

<style lang="less" scoped>
  @bgColor: background-color;

  .org-tree-node-label {
    white-space: nowrap;
  }

  :deep(.bg-primary) {
    @{bgColor}: @primary-color;
  }

  :deep(.bg-white) {
    @{bgColor}: white;
  }

  :deep(.bg-orange) {
    @{bgColor}: orange;
  }

  :deep(.bg-gold) {
    @{bgColor}: gold;
  }

  :deep(.bg-gray) {
    @{bgColor}: gray;
  }

  :deep(.bg-lightpink) {
    @{bgColor}: lightpink;
  }

  :deep(.bg-chocolate) {
    @{bgColor}: chocolate;
  }

  :deep(.bg-tomato) {
    @{bgColor}: tomato;
  }
</style>
