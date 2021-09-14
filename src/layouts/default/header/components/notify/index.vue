<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="count" :offset="[-2, 15]" :numberStyle="numberStyle">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in listData" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span style="color: #fb441b">({{ item.data.total }}) </span></template
              >
              <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
              <NoticeList :value="item.data" :msgType="item.key" @title-click="onNoticeClick" />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, onMounted } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { TabItem } from './data';
  import NoticeList from './NoticeList.vue';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { myMsg, mark } from '/@/api/lamp/resources/msg';
  import { MsgTypeEnum } from '/@/enums/commonEnum';
  import { MsgPageResult } from '/@/api/lamp/resources/model/msgModel';
  import { PageEnum } from '/@/enums/pageEnum';

  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      const { replace, currentRoute } = useRouter();
      const listData = ref<TabItem[]>([]);

      async function loadMyMsg() {
        const allMsg = await myMsg({
          current: 1,
          size: 5,
          model: {},
        });

        listData.value = [];

        listData.value.push({
          key: MsgTypeEnum.TO_DO,
          name: '待办',
          data: allMsg?.todoList,
        });
        listData.value.push({
          key: MsgTypeEnum.NOTIFY,
          name: '通知',
          data: allMsg?.notifyList,
        });
        listData.value.push({
          key: MsgTypeEnum.NOTICE,
          name: '公告',
          data: allMsg?.noticeList,
        });
        listData.value.push({
          key: MsgTypeEnum.EARLY_WARNING,
          name: '预警',
          data: allMsg?.earlyWarningList,
        });
      }

      onMounted(() => {
        loadMyMsg();
      });

      setInterval(() => {
        const { path } = currentRoute.value;
        if (path !== PageEnum.BASE_LOGIN) {
          loadMyMsg();
        }
      }, 5 * 60000);

      const count = computed(() => {
        let count = 0;
        for (let i = 0; i < listData.value.length; i++) {
          count += Number(listData.value[i]?.data?.total);
        }
        return count;
      });

      async function onNoticeClick(record: MsgPageResult) {
        const flag = await mark([record.id]);
        if (flag) {
          loadMyMsg();
        }
        replace({
          name: 'noticeView',
          params: { id: record.id },
        });
      }

      return {
        prefixCls,
        listData,
        count,
        onNoticeClick,
        numberStyle: {},
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-nav .ant-tabs-tab {
      margin: 0;
      padding: 10px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
