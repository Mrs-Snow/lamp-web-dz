<template>
  <PageWrapper
    contentClass="flex"
    contentFullHeight
    dense
    fixedHeight
    title="为lamp-cloud或lamp-boot项目新建新服务"
  >
    <div class="bg-white md:w-2/3 m-4 p-4 mr-2 overflow-hidden">
      <BasicForm @register="registerForm" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 清空</a-button>
        <a-button class="!ml-4" @click="resetForm"> 重置</a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit">立即生成</a-button>
      </div>
    </div>

    <div class="bg-white m-4 p-4 ml-2 overflow-hidden md:w-1/3">
      <Tabs v-model:activeKey="activeKey">
        <TabPane v-for="item in tabList" :key="item.key">
          <template #tab>
            {{ item.name }}
          </template>
          <ThumbUrl :file-url="imgModules[item.key]" height="100%" width="100%" />
        </TabPane>
      </Tabs>
    </div>

    <template #extra>
      <a-button @click="resetFields"> 清空</a-button>
      <a-button @click="resetForm"> 重置</a-button>
      <a-button type="primary" @click="handleSubmit">立即生成</a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Api, generator, getDef } from '/@/api/devOperation/developer/defGenProject';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './genProject.data';
  import { useLoading } from '/@/components/Loading';

  interface TabModel {
    name: string;
    key: string;
  }

  const images = import.meta.globEager('../../../../assets/project/*.{png,jpg}');
  const imgModules = {};

  Object.keys(images).forEach((key) => {
    const mod = images[key].default || {};
    const name = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    imgModules[name] = mod;
  });

  export default defineComponent({
    name: '生成项目',
    components: { ThumbUrl, BasicForm, PageWrapper, Tabs, TabPane: Tabs.TabPane },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const activeKey = ref<string>('project_type');

      const tabList = ref<TabModel[]>([
        { key: 'project_type', name: '项目类型' },
        { key: 'project_outputDir', name: '输出路径' },
        { key: 'project_author', name: '作者' },
        { key: 'project_projectPrefix', name: '项目前缀' },
        { key: 'project_serviceName', name: '服务名' },
        { key: 'project_parent', name: '基础包' },
        { key: 'project_moduleName', name: '模块名' },
        { key: 'project_groupId', name: 'groupId' },
        { key: 'project_utilParent', name: 'util基础包' },
        { key: 'project_utilGroupId', name: 'utilGroupId' },
        { key: 'project_version', name: '版本号' },
        { key: 'project_description', name: '中文服务名' },
        { key: 'project_serverPort', name: '端口号' },
      ]);

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });

      function changeTab(key) {
        activeKey.value = key;
      }

      const [registerForm, { setFieldsValue, updateSchema, validate, resetFields }] = useForm({
        labelWidth: 120,
        schemas: editFormSchema(changeTab),
        name: 'project',
        showActionButtonGroup: false,
        baseColProps: { span: 12 },
        actionColOptions: {
          span: 23,
        },
      });

      onMounted(async () => {
        await load();
      });

      const load = async () => {
        try {
          openFullLoading();
          const record = await getDef();
          await setFieldsValue(record);

          let validateApi = Api.Generator;
          await getValidateRules(validateApi, customFormSchemaRules()).then(async (rules) => {
            rules && rules.length > 0 && (await updateSchema(rules));
          });
        } finally {
          closeFullLoading();
        }
      };

      async function resetForm() {
        await load();
      }

      async function handleSubmit() {
        try {
          openFullLoading();
          const params = await validate();
          await generator(params);
          createMessage.success('生成成功');
        } finally {
          closeFullLoading();
        }
      }

      return {
        t,
        activeKey,
        registerForm,
        tabList,
        imgModules,
        handleSubmit,
        resetForm,
        resetFields,
      };
    },
  });
</script>
