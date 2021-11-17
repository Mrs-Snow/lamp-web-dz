<template>
  <Card :title="props.title" v-bind="$attrs" :loading="loading" hoverable>
    <template v-for="item in applicationList" :key="item.id">
      <CardGrid @click="customClick(item)" class="!md:w-1/3 !w-full" :class="getAppCardClass(item)">
        <span class="flex">
          <ThumbUrl
            :width="50"
            :height="50"
            :preview="false"
            :fileId="item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.id"
            :fileType="item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.fileType?.code"
            :originalFileName="
              item.echoMap?.[FileBizTypeEnum.DEF_APPLICATION_LOGO]?.[0]?.originalFileName
            "
            :isDef="true"
          />
          <span class="text-lg ml-4">{{ item.name }}</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary" :title="item.remark">{{ item.introduce }}</div>
        <div class="flex justify-between text-secondary">
          <span>{{
            item.state === ExpireStateEnum.EFFECTIVE
              ? ' '
              : item.state === ExpireStateEnum.EXPIRED
              ? '已过期'
              : '申请开通'
          }}</span>
          <span v-if="item.state === ExpireStateEnum.EXPIRED">{{ item.expirationTime }}</span>
        </div>
      </CardGrid>
    </template>
    <Empty :description="props.description" v-if="applicationList.length === 0" />
  </Card>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Card, Empty } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useUserStore } from '/@/store/modules/user';
  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { DefApplicationResultVO } from '/@/api/devOperation/application/model/defApplicationModel';
  import { ExpireStateEnum } from '/@/enums/biz/tenant';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { isUrl } from '/@/utils/is';
  import { FileBizTypeEnum } from '/@/enums/commonEnum';
  import { propTypes } from '/@/utils/propTypes';
  import { checkEmployeeHaveApplication } from '/@/api/lamp/common/oauth';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Empty, ThumbUrl },
    props: {
      title: propTypes.string.def('我的应用'),
      description: propTypes.string.def('暂未开通任何应用, 联系您公司管理员开通'),
      api: {
        type: Function as PropType<PromiseFn>,
        default: null,
        required: true,
      },
      handleClick: {
        type: Function as PropType<PromiseFn>,
        default: null,
      },
    },
    setup(props) {
      const applicationList = ref<DefApplicationResultVO[]>([]);
      const { createMessage, createConfirm } = useMessage();
      const { refreshMenu } = usePermission();
      const loading = ref<boolean>(true);

      const userStore = useUserStore();

      async function handlerTurnToApplication(item: DefApplicationResultVO) {
        if (userStore.getApplicationId === item?.id) {
          createMessage.warn(`您当前正处于[${item.name}]，无需切换`);
          return;
        }
        if (!item || !item.id) {
          createMessage.error('请选择正确的应用进行切换');
          return;
        }
        const canJump = await checkEmployeeHaveApplication(item.id);
        if (!canJump) {
          createMessage.warn(`对不起，您无该应用访问权限，请联系贵公司管理员开通权限`);
          return '';
        }

        const isOpen = item.url && isUrl(item.url);
        createConfirm({
          iconType: 'warning',
          content: `确定要${isOpen ? '跳转' : '切换'}到应用：【${
            item.name
          }】， 并重新加载其资源吗？`,
          onOk: async () => {
            if (isOpen) {
              window.open(item.url);
            } else {
              userStore.setApplicationId(item.id as string);
              await userStore.getUserInfoAction();
              await refreshMenu();
              createMessage.success(`成功切换到应用：[${item.name}]`);

              setTimeout(() => {
                location.reload();
              }, 200);
            }
          },
        });
      }

      const customClick = props.handleClick ? props.handleClick : handlerTurnToApplication;

      const getAppCardClass = (item: DefApplicationResultVO) => {
        return userStore.getApplicationId === item?.id ? 'appDisabled' : '';
      };

      onMounted(async () => {
        applicationList.value = await props.api();
        loading.value = false;
      });

      return {
        props,
        ExpireStateEnum,
        FileBizTypeEnum,
        getAppCardClass,
        applicationList,
        customClick,
        loading,
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

  [data-theme='dark'] .appDisabled {
    color: rgb(255 255 255 / 30%);
    background-color: rgb(255 255 255 / 8%);
  }
</style>
