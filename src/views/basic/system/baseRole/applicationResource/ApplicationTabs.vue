<template>
  <div class="appResTabs bg-white m-4 ml-2 overflow-hidden">
    <Card :title="title">
      <template #extra>
        <a-button
          class="!ml-4"
          v-if="formData.roleId"
          type="primary"
          @click="handleSubmit"
          :loading="confirmLoading"
          >{{ t('common.saveText') }}</a-button
        >
      </template>

      <ApplicationTab
        v-for="item in applicationResourceList"
        :key="item.defApplication.id"
        :application="item.defApplication"
        :resourceList="item.resourceList"
        :checkedKeys="appResMap[item.defApplication.id]"
        :ref="(el) => (itemRefs[item.defApplication.id] = el)"
      />
      <Empty v-if="applicationResourceList.length === 0" />
    </Card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, toRefs, reactive } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { findAvailableApplicationResourceList } from '/@/api/devOperation/application/defApplication';
  import ApplicationTab from './ApplicationTab.vue';
  import { isArray } from '/@/utils/is';
  import { findResourceIdByRoleId, saveRoleResource } from '/@/api/basic/system/baseRole';
  import { BaseRoleResourceRelSaveVO } from '/@/api/basic/system/model/baseRoleModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'ApplicationResourceTabs',
    components: {
      Card,
      Empty,
      ApplicationTab,
    },

    emits: ['select'],
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const itemRefs = {};

      const formData = reactive<BaseRoleResourceRelSaveVO>({
        roleId: '',
        applicationResourceMap: {},
      });

      const state = reactive({
        applicationResourceList: [] as any[],
        title: '请选择角色',
        confirmLoading: false,
        appResMap: {},
      });

      onMounted(async () => {
        state.applicationResourceList = await findAvailableApplicationResourceList();
      });

      function getData(): BaseRoleResourceRelSaveVO {
        const appResourceMap = {};

        for (const item of state.applicationResourceList) {
          const itemRef = itemRefs[item.defApplication.id];
          if (!itemRef) {
            continue;
          }
          const checkedKeys = itemRef.treeRef.getCheckedKeys();
          const checkeds = isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;

          if (itemRef.checkAll || itemRef.indeterminate) {
            appResourceMap[itemRef.application.id] = checkeds;
          }
        }
        formData.applicationResourceMap = appResourceMap;
        return formData;
      }

      async function fetch(role: Recordable) {
        if (role && role.id) {
          state.title = `【${role.name}】拥有的应用资源`;
          formData.roleId = role.id;

          state.appResMap = await findResourceIdByRoleId(role.id);
        } else {
          state.title = '请选择角色';
          formData.roleId = '';
          const appResourceMap = {};
          for (const item of state.applicationResourceList) {
            appResourceMap[item.defApplication.id] = [];
          }
          state.appResMap = appResourceMap;
        }
      }

      async function handleSubmit() {
        try {
          state.confirmLoading = true;
          const params = getData();
          if (params.roleId) {
            await saveRoleResource(params);

            createMessage.success('配置成功');
          } else {
            createMessage.warn('请选择角色');
          }
        } finally {
          state.confirmLoading = false;
        }
      }
      return {
        ...toRefs(state),
        t,
        fetch,
        formData,
        itemRefs,
        getData,
        handleSubmit,
      };
    },
  });
</script>
