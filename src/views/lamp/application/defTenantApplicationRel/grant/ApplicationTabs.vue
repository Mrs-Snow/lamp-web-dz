<template>
  <div class="bg-white m-4 ml-2 overflow-hidden">
    <DatePicker
      v-model:value="formData.expirationTime"
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="有效期"
      valueFormat="YYYY-MM-DD HH:mm:ss"
      :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
    />

    <ApplicationTab
      v-for="item in applicationResourceList"
      :key="item.defApplication.id"
      :application="item.defApplication"
      :resourceList="item.resourceList"
      :ref="(el) => (itemRefs[item.defApplication.id] = el)"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, toRefs, reactive } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import moment from 'moment';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { findApplicationResourceList } from '/@/api/lamp/application/defApplication';
  import ApplicationTab from './ApplicationTab.vue';
  import { isArray } from '/@/utils/is';
  export default defineComponent({
    name: 'ApplicationTabs',
    components: {
      DatePicker,
      ApplicationTab,
    },

    emits: ['select'],
    setup() {
      const { t } = useI18n();
      const itemRefs = {};

      const formData = reactive<Recordable>({
        expirationTime: '',
        applicationResourceMap: {},
      });

      const state = reactive({
        applicationResourceList: [] as any[],
      });

      onMounted(async () => {
        state.applicationResourceList = await findApplicationResourceList();
      });

      function getData() {
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

      return {
        ...toRefs(state),
        t,
        moment,
        formData,
        itemRefs,
        getData,
      };
    },
  });
</script>
<style scoped>
  .appResource {
    border: 1px solid #d9d9d9;
  }
</style>
