<template>
  <Card title="我的应用" v-bind="$attrs" hoverable>
    <template v-for="item in applicationList" :key="item.id">
      <CardGrid
        @click="handlerTurnToApplication(item)"
        class="!md:w-1/3 !w-full"
        :class="getAppCardClass(item)"
      >
        <span class="flex">
          <ThumbUrl
            :width="50"
            :fileId="item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.id"
            :fileType="item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.fileType?.code"
            :originalFileName="
              item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.originalFileName
            "
          />
          <span class="text-lg ml-4">{{ item.name }}</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">{{ item.introduce }}</div>
        <div class="flex justify-between text-secondary">
          <span>{{ item.state === ExpireStateEnum.EFFECTIVE ? '有效' : '已过期' }}</span>
          <span v-if="item.state === ExpireStateEnum.EXPIRED">{{ item.expirationTime }}</span>
        </div>
      </CardGrid>
    </template>
    <Empty
      description="暂未开通任何应用, 联系您公司管理员开通"
      v-if="applicationList.length === 0"
    />
  </Card>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useUserStore } from '/@/store/modules/user';
  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { findMyApplication } from '/@/api/lamp/profile/userInfo';
  import { DefApplicationResultVO } from '/@/api/devOperation/application/model/defApplicationModel';
  import { ExpireStateEnum } from '/@/enums/biz/tenant';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { isUrl } from '/@/utils/is';
  import { FileBizTypeEnum } from '/@/enums/commonEnum';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Empty, ThumbUrl },
    setup() {
      const applicationList = ref<DefApplicationResultVO[]>([]);
      const { createMessage, createConfirm } = useMessage();
      const { refreshMenu } = usePermission();

      const userStore = useUserStore();

      async function handlerTurnToApplication(item: DefApplicationResultVO) {
        if (userStore.getApplicationId === item?.id) {
          createMessage.warn(`您当前正处于[${item.name}]，无需切换`);
          return;
        }
        if (item && item.id) {
          createConfirm({
            iconType: 'warning',
            content: `确定要切换到应用：[${item.name}]， 并重新加载其资源吗？`,
            onOk: async () => {
              if (item.url && isUrl(item.url)) {
                window.open(item.url);
              } else {
                userStore.setApplicationId(item.id as string);
                await userStore.getUserInfoAction();
                await refreshMenu();

                createMessage.success(`成功切换到应用：[${item.name}]`);
              }
            },
          });
        } else {
          createMessage.error('请选择正确的应用进行切换');
        }
      }

      const getAppCardClass = (item: DefApplicationResultVO) => {
        return userStore.getApplicationId === item?.id ? 'appDisabled' : '';
      };

      onMounted(async () => {
        applicationList.value = await findMyApplication();
      });

      return {
        ExpireStateEnum,
        FileBizTypeEnum,
        getAppCardClass,
        applicationList,
        handlerTurnToApplication,
      };
    },
  });
</script>

<style lang="less" scoped>
  .appDisabled {
    color: rgb(0 0 0 / 75%);
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 100%;
  }
</style>
