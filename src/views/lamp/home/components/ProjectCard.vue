<template>
  <Card title="我的应用" v-bind="$attrs">
    <template v-for="item in applicationList" :key="item.id">
      <CardGrid @click="handlerTurnToApplication(item)" class="!md:w-1/3 !w-full">
        <span class="flex">
          <ThumbUrl
            :width="50"
            :fileId="item.echoMap?.DEF__APPLICATION__LOGO?.[0].id"
            :fileType="item.echoMap?.DEF__APPLICATION__LOGO?.[0].fileType?.code"
            :originalFileName="item.echoMap?.DEF__APPLICATION__LOGO?.[0].originalFileName"
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
  import ThumbUrl from '/@/components/Upload/src/ThumbUrl.vue';
  import { findMyApplication } from '/@/api/devOperation/application/defApplication';
  import { DefApplicationResultVO } from '/@/api/devOperation/application/model/defApplicationModel';
  import { ExpireStateEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Empty, ThumbUrl },
    setup() {
      const applicationList = ref<DefApplicationResultVO[]>([]);
      function handlerTurnToApplication(item: DefApplicationResultVO) {
        alert('切换应用' + item);
      }

      onMounted(async () => {
        applicationList.value = await findMyApplication();
      });

      return { ExpireStateEnum, applicationList, handlerTurnToApplication };
    },
  });
</script>
