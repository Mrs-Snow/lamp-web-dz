<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style="getImageWrapperStyle" @click="openModal">
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img v-if="realSrc" :src="realSrc" alt="avatar" />
    </div>
    <a-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal"
      v-if="showBtn"
      v-bind="btnProps"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </a-button>

    <CopperModal
      @register="register"
      @uploadSuccess="handleUploadSuccess"
      :uploadApi="uploadApi"
      :uploadParams="uploadParams"
      :src="realSrc"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, CSSProperties, unref, ref, watch, PropType } from 'vue';
  import CopperModal from './CopperModal.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ButtonProps } from '/@/components/Button';
  import Icon from '/@/components/Icon';
  import { asyncGetUrls } from '/@/api/lamp/file/upload';

  const props = {
    width: { type: [String, Number], default: '200px' },
    value: { type: String },
    fileId: { type: [String, Number] },
    showBtn: { type: Boolean, default: true },
    btnProps: { type: Object as PropType<ButtonProps> },
    btnText: { type: String, default: '' },
    uploadApi: {
      type: Function as PropType<PromiseFn>,
      default: null,
      required: true,
    },
    uploadParams: {
      type: Object as PropType<any>,
      default: {},
    },
  };

  export default defineComponent({
    name: 'CropperAvatar',
    components: { CopperModal, Icon },
    props,
    emits: ['update:value', 'change'],
    setup(props, { emit, expose }) {
      // const sourceValue = ref(props.value || '');
      const fileValue = ref({});
      const realSrc = ref<string>('');

      const { prefixCls } = useDesign('cropper-avatar');
      const [register, { openModal, closeModal }] = useModal();
      const { createMessage } = useMessage();
      const { t } = useI18n();

      const getClass = computed(() => [prefixCls]);

      const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');

      const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px');

      const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

      const getImageWrapperStyle = computed(
        (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
      );

      watch(
        () => props.value,
        () => {
          if (props.value && props.value.startsWith('http')) {
            realSrc.value = props.value;
          } else if (props.value && props.value.startsWith('data:')) {
            realSrc.value = props.value;
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
        asyncGetUrls(props.fileId).then((res) => {
          if (res.code === 0) {
            realSrc.value = res.url;
          }
        });
      }

      // watchEffect(() => {
      //   sourceValue.value = props.value || '';
      // });

      watch(
        () => realSrc.value,
        (v: string) => {
          emit('update:value', v);
        },
      );

      function handleUploadSuccess(result) {
        // sourceValue.value = result?.source;
        fileValue.value = result?.data;
        emit('change', result);
        createMessage.success(t('component.cropper.uploadSuccess'));
      }

      expose({ openModal: openModal.bind(null, true), closeModal });

      return {
        t,
        prefixCls,
        register,
        openModal: openModal as any,
        getIconWidth,
        fileValue,
        realSrc,
        getClass,
        getImageWrapperStyle,
        getStyle,
        handleUploadSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      cursor: pointer;
      background: @component-background;
      border: 1px solid @border-color-base;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      opacity: 0;
      position: absolute;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      border: inherit;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      -webkit-transition: opacity 0.4s;
      transition: opacity 0.4s;

      ::v-deep(svg) {
        margin: auto;
      }
    }

    &-image-mask:hover {
      opacity: 40;
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
