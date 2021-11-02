<template>
  <span class="thumb">
    <template v-if="props.fileType === 'IMAGE'">
      <Image
        :src="realSrc"
        :width="props.width"
        :height="props.height"
        :fallback="props.fallback"
        :preview="props.preview"
        :placeholder="true"
      />
    </template>
    <template v-else>
      <a href="javascript:;" @click="onView(realSrc, $event)">{{ props.originalFileName }}</a>
    </template>
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Image } from 'ant-design-vue';
  import { Base64 } from 'js-base64';
  import { propTypes } from '/@/utils/propTypes';
  import { asyncFindDefUrlById, asyncFindUrlById } from '/@/api/lamp/file/upload';
  import { errImg } from '/@/utils/file/base64Conver';
  import { useGlobSetting } from '/@/hooks/setting';

  export default defineComponent({
    components: { Image },
    props: {
      fileUrl: propTypes.string.def(''),
      fileId: propTypes.string.def(''),
      width: propTypes.number.def(104),
      height: propTypes.number.def(104),
      fileType: propTypes.string.def('IMAGE'),
      originalFileName: propTypes.string.def('未知文件'),
      isDef: propTypes.bool.def(false),
      preview: propTypes.bool.def(true),
      fallback: propTypes.string.def(errImg),
    },
    setup(props) {
      const realSrc = ref<string>('');
      const { previewUrlPrefix } = useGlobSetting();

      watch(
        () => props.fileUrl,
        () => {
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

        const api = props.isDef ? asyncFindDefUrlById : asyncFindUrlById;
        api(props.fileId).then((res) => {
          if (res.code === 0) {
            realSrc.value = res.data;
          }
        });
      }
      function onView(realSrc: string, e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        if (realSrc) {
          window.open(previewUrlPrefix + encodeURIComponent(Base64.encode(realSrc)));
        }
      }

      return { realSrc, errImg, props, onView };
    },
  });
</script>
<style lang="less">
  .thumb {
    img {
      position: static;
      display: block;
      object-fit: cover;
      max-height: 104px;
      margin: 0 auto;
    }
  }
</style>
