<template>
  <span class="thumb">
    <template v-if="props.fileType === 'IMAGE'">
      <Image
        v-if="realSrc && !loadError"
        :src="realSrc"
        :width="props.width"
        :height="props.height"
        :fallback="errImg"
      />
      <div style="width: 100%; height: 100%" v-if="loading"></div>
      <slot name="empty" v-if="!realSrc && !loadError">
        <img :width="props.width" :height="props.height" src="./err-img.svg" />
      </slot>
      <slot name="error" v-if="loadError">
        <img :width="props.width" :height="props.height" src="./err-img.svg" />
      </slot>
    </template>
    <template v-else>
      <a href="javascript:;" @click="onView(realSrc, $event)">{{ props.originalFileName }}</a>
    </template>
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { Image } from 'ant-design-vue';
  import { asyncGetUrls } from '/@/api/lamp/file/upload';
  import errImg from './err-img.svg';
  import { Base64 } from 'js-base64';

  export default defineComponent({
    components: { Image },
    props: {
      fileUrl: propTypes.string.def(''),
      fileId: propTypes.string.def(''),
      width: propTypes.number.def(104),
      height: propTypes.number.def(104),
      fileType: propTypes.string.def('IMAGE'),
      originalFileName: propTypes.string.def('未知文件'),
    },
    setup(props) {
      const loading = ref<boolean>(false);
      const loadError = ref<boolean>(false);
      const realSrc = ref<string>('');

      watch(
        () => props.fileUrl,
        () => {
          loadError.value = false;
          if (props.fileUrl && props.fileUrl.startsWith('http')) {
            realSrc.value = props.fileUrl;
          } else if (props.fileUrl && props.fileUrl.startsWith('data:')) {
            realSrc.value = props.fileUrl;
          }
        },
        { immediate: true },
      );

      watch(
        () => props.fileId,
        () => {
          loadError.value = false;
          if (props.fileId) {
            realSrc.value = '';
            loadSrc();
          }
        },
        { immediate: true },
      );

      function loadSrc() {
        if (!props.fileId) {
          return;
        }
        loading.value = true;
        loadError.value = false;
        asyncGetUrls(props.fileId)
          .then((res) => {
            if (res.code === 0) {
              realSrc.value = res.url;
            } else {
              loadError.value = true;
            }
          })
          .catch(() => {
            loadError.value = true;
          })
          .finally(() => {
            loading.value = false;
          });
      }
      function onView(realSrc, e) {
        e?.stopPropagation();
        e?.preventDefault();
        if (realSrc) {
          window.open(
            'http://106.53.26.9:8012/onlinePreview?url=' +
              encodeURIComponent(Base64.encode(realSrc)),
          );
        }
      }

      return { realSrc, loading, loadError, errImg, props, onView };
    },
  });
</script>
<style lang="less">
  .thumb {
    img {
      position: static;
      display: block;
      cursor: zoom-in;
      border-radius: 4px;
      object-fit: cover;
      max-height: 104px;
      margin: 0 auto;
    }
  }
</style>
