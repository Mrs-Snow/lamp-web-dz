<template>
  <div v-if="showSourceLink" class="fs-source-link-group">
    <div class="fs-source-link" @click="goSource('http://git.tangyh.top')">本页源码（Gitlab）</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'FsSourceLink',
    setup() {
      const router = useRouter();
      const showSourceLink = ref(false);
      watch(
        () => {
          return router.currentRoute.value.fullPath;
        },
        (value) => {
          showSourceLink.value = value !== '/index';
        },
        { immediate: true },
      );
      const middle = '/zuihou/lamp-web-pro/blob/master/src/views';
      function goSource(prefix: any) {
        let component = router.currentRoute.value.meta?.component as string;

        if (component) {
          if (!component.startsWith('/')) {
            component = '/' + component;
          }
          if (!component.endsWith('.vue')) {
            component = component + '.vue';
          }
          window.open(prefix + middle + component);
        } else {
          window.open(prefix + middle);
        }
      }
      return {
        goSource,
        showSourceLink,
      };
    },
  });
</script>

<style lang="less">
  .fs-source-link-group {
    position: fixed;
    right: 3px;
    bottom: 20px;
    z-index: 200;
    .fs-source-link {
      text-align: left;
      cursor: pointer;
      font-size: 12px;
      border-radius: 5px 0 0 5px;
      padding: 5px;
      background: #666;
      color: #fff;
      margin-bottom: 5px;
    }
  }
</style>
