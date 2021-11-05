<template>
  <div class="bg-white m-4 mr-2 overflow-hidden">
    <div class="m-4">
      <Space>
        <a-button class="mr-2"> 切换 </a-button>
        <!-- 垂直展示 -->
        <Checkbox v-model:checked="isHorizontal">垂直展示</Checkbox>
        <!-- 折叠节点 -->
        <Checkbox v-model:checked="collapsable">折叠节点</Checkbox>
        <!-- 主题背景 -->
        <Select
          @change="changeClassName"
          :default-value="labelClassName"
          style="width: 120px"
          size="small"
        >
          <SelectOption
            :value="item.value"
            v-for="(item, index) in labelClassNameItem"
            :key="index"
            >{{ item.label }}</SelectOption
          >
        </Select>
        <!-- 架构类型 -->
        <RadioGroup v-model:value="architectureType" @change="changeType" size="small">
          <RadioButton :value="1">机构</RadioButton>
          <RadioButton :value="2">岗位架构</RadioButton>
        </RadioGroup>
      </Space>
    </div>
    <Card>
      <div style="text-align: center; overflow: auto">
        <Spin :spinning="spinning"></Spin>
        <VueBlocksTree
          v-if="!spinning"
          :data="treeData"
          :horizontal="isHorizontal"
          :collapsable="collapsable"
          :props="treeProps"
          :label-class-name="labelClassName"
        ></VueBlocksTree>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, createApp } from 'vue'; // 引入 Composition-API
  // 引入VueBlocksTree组件
  import VueBlocksTree from 'vue3-blocks-tree';
  import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
  import { useI18n } from '/@/hooks/web/useI18n'; // 国际化配置
  import { Row, Col, Card, Checkbox, Spin, Select, Space, Radio } from 'ant-design-vue'; // 引入antd组件
  import { tree } from '/@/api/basic/user/baseOrg';
  import { TreeItem } from '/@/components/Tree';

  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;
  const SelectOption = Select.Option;
  interface treeResult {
    name: string;
    expand: boolean;
    key: number;
    children?: Object[];
  }

  const App = createApp({});
  // 注册VueBlocksTree组件
  let defaultoptions = { treeName: 'blocks-tree' };
  createApp(App).use(VueBlocksTree, defaultoptions);

  const { t } = useI18n(); // 国际化函数
  const isHorizontal = ref<boolean>(false); // 是否垂直展示
  const collapsable = ref<boolean>(true); // 折叠节点
  const architectureType = ref<number>(1); // 架构类型
  const spinning = ref<boolean>(false); // 加载Loading...
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
  const treeData = reactive<treeResult>({ name: 'lamp Admin', expand: false, key: 0 });

  // 不同类型接口切换
  async function getArchitectureTree() {
    switch (architectureType.value) {
      // 组织架构
      case 1:
        spinning.value = true;

        try {
          treeData.children = (await tree()) as unknown as TreeItem[];
        } finally {
          spinning.value = false;
        }

        // await getOrganizationTree()
        //   .then((res) => {
        //     treeData.children = res;
        //   })
        //   .finally(() => {
        //     spinning.value = false;
        //   });
        break;
      // 岗位架构
      case 2:
        spinning.value = true;
      // await getPostTree()
      //   .then((res) => {
      //     treeData.children = res;
      //   })
      //   .finally(() => {
      //     spinning.value = false;
      //   });
    }
  }
  // 改变架构类型触发
  function changeType() {
    getArchitectureTree();
  }

  // 切换主题颜色
  function changeClassName(value) {
    labelClassName.value = value;
  }

  // 首次挂载
  onMounted(async () => {
    getArchitectureTree();
  });
</script>

<style lang="less" scoped>
  @bgColor: background-color;

  .org-tree-node-label {
    white-space: nowrap;
  }

  /deep/ .bg-primary {
    @{bgColor}: @primary-color;
  }

  /deep/ .bg-white {
    @{bgColor}: white;
  }

  /deep/ .bg-orange {
    @{bgColor}: orange;
  }

  /deep/ .bg-gold {
    @{bgColor}: gold;
  }

  /deep/ .bg-gray {
    @{bgColor}: gray;
  }

  /deep/ .bg-lightpink {
    @{bgColor}: lightpink;
  }

  /deep/ .bg-chocolate {
    @{bgColor}: chocolate;
  }

  /deep/ .bg-tomato {
    @{bgColor}: tomato;
  }
</style>
