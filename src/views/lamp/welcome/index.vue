<template>
  <div class="p-4 analysis">
    <GrowCard :loading="false" class="enter-y" />

    <a-row class="">
      <a-col :md="24" :lg="24" class="my-3">
        <CollapseContainer class="" title="近十天访问记录" :canExpan="false">
          <div ref="tenVisitRef" :style="{ height: '280px', width: '100%' }"></div>
        </CollapseContainer>
      </a-col>
    </a-row>
    <a-row class="">
      <a-col :md="24" :lg="12" class="product-total">
        <CollapseContainer class="mr-2" title="访问用户浏览器" :canExpan="false">
          <div ref="browserRef" :style="{ height: '280px', width: '100%' }"></div>
        </CollapseContainer>
      </a-col>
      <a-col :md="24" :lg="12">
        <CollapseContainer class="ml-2" title="访问用户操作系统" :canExpan="false">
          <div ref="operatingSystemRef" :style="{ height: '280px', width: '100%' }"></div>
        </CollapseContainer>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, Ref } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import type { EChartsOption } from 'echarts';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { parseTime } from '/@/utils';
  import { simplePie, simpleBar } from '/@/utils/chartsOption';

  import { getChart } from '/@/api/lamp/welcome/welcome';
  import GrowCard from './components/GrowCard.vue';

  export default defineComponent({
    name: 'Welcome',
    components: {
      GrowCard,
      CollapseContainer,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const tenVisitRef = ref<HTMLDivElement | null>(null);
      const browserRef = ref<HTMLDivElement | null>(null);
      const operatingSystemRef = ref<HTMLDivElement | null>(null);
      const tenVisitSetOptions = useECharts(tenVisitRef as Ref<HTMLDivElement>).setOptions;
      const browserCountSetOptions = useECharts(browserRef as Ref<HTMLDivElement>).setOptions;
      const operatingSystemSetOptions = useECharts(
        operatingSystemRef as Ref<HTMLDivElement>
      ).setOptions;

      const formState = reactive({
        lastTenVisitCount: [],
        lastTenUserVisitCount: [],
      });

      onMounted(() => {
        loadVisitList();
      });

      async function loadVisitList() {
        const data = await getChart();

        bar(data.lastTenVisitCount, data.lastTenUserVisitCount);
        browserCount(data.browserCount);
        operatingSystemCount(data.operatingSystemCount);
      }

      function bar(lastTenVisitCount, lastTenUserVisitCount) {
        const tenVisitCount = [] as number[];
        const dateArr = [] as string[];
        const tenUserVisitCount = [] as number[];
        const visitBar = simpleBar();

        for (let i = 9; i >= 0; i--) {
          const time = parseTime(
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * i),
            '{y}-{m}-{d}'
          );
          let contain = false;
          for (const o of lastTenVisitCount) {
            if (o.login_date === time) {
              contain = true;
              tenVisitCount.push(o.count);
              break;
            }
          }
          if (!contain) {
            tenVisitCount.push(0);
          }

          let userContain = false;
          for (const o of lastTenUserVisitCount) {
            if (o.login_date === time) {
              userContain = true;
              tenUserVisitCount.push(o.count);
              break;
            }
          }
          if (!userContain) {
            tenUserVisitCount.push(0);
          }
          dateArr.push(time);
        }

        visitBar.legend.data = ['我的', '总的'];
        visitBar.xAxis.data = dateArr;
        visitBar.series.push({
          name: '我的',
          type: 'bar',
          barWidth: '25%',
          color: 'rgb(0, 227, 150)',
          data: tenUserVisitCount,
        });
        visitBar.series.push({
          smooth: true,
          name: '总的',
          type: 'line',
          barWidth: '25%',
          color: 'rgb(0, 143, 251)',
          data: tenVisitCount,
        });

        tenVisitSetOptions(visitBar as EChartsOption);
      }

      function browserCount(data) {
        if (!data) {
          return;
        }
        const browserPie = simplePie();
        const legend_data = [] as string[];
        const series_data = [] as any[];
        data.forEach((item) => {
          const browser = item.browser || '未知';
          series_data.push({ value: item.count, name: browser });
          legend_data.push(browser);
        });

        browserPie.series[0].data = series_data;
        browserPie.legend.data = legend_data;

        browserCountSetOptions(browserPie as EChartsOption);
      }

      function operatingSystemCount(data) {
        if (!data) {
          return;
        }
        const operatingSystemPie = simplePie();
        const legend_data = [] as string[];
        const series_data = [] as any[];
        data.forEach((item) => {
          const browser = item.operating_system || '未知';
          series_data.push({ value: item.count, name: browser });
          legend_data.push(browser);
        });

        operatingSystemPie.series[0].data = series_data;
        operatingSystemPie.legend.data = legend_data;

        operatingSystemSetOptions(operatingSystemPie as EChartsOption);
      }
      return { formState, tenVisitRef, browserRef, operatingSystemRef };
    },
  });
</script>
<style lang="less" scoped>
  .analysis {
    width: 100%;
  }
</style>
