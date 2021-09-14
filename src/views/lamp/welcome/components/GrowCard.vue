<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="flex justify-between px-4 py-4">
          <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="flex justify-between p-2 px-4">
          <span>总{{ item.title }}</span>
          <CountTo prefix="" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';

  import { getItem, pvIncr } from '/@/api/lamp/welcome/welcome';
  import { growCardList } from '../data';
  export default defineComponent({
    components: { CountTo, Tag, Card, Icon },
    setup() {
      const loading = ref(true);
      onMounted(() => {
        loadItem();
        pv();
      });

      async function loadItem() {
        const data = await getItem();

        growCardList[0].value = Number(data.todayUserCount);
        growCardList[0].total = Number(data.totalUserCount);
        growCardList[1].value = Number(data.todayLoginIv);
        growCardList[1].total = Number(data.totalLoginIv);
        growCardList[2].value = Number(data.todayLoginPv);
        growCardList[2].total = Number(data.totalLoginPv);
        growCardList[3].value = Number(data.todayPv);
        growCardList[3].total = Number(data.totalPv);
        loading.value = false;
      }

      function pv() {
        pvIncr();
      }

      return { growCardList, loading };
    },
  });
</script>
