<template>
  <BasicModal
    :footer="null"
    :title="t('layout.header.lockScreen')"
    v-bind="$attrs"
    :class="prefixCls"
    @register="register"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <Avatar :src="avatarUrl" :size="70">
          <Avatar :size="70">{{ getRealName?.charAt(0) }}</Avatar></Avatar
        >
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <BasicForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, watch } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { asyncGetUrls } from '/@/api/lamp/file/upload';
  import { useUserStore } from '/@/store/modules/user';
  import { useLockStore } from '/@/store/modules/lock';

  export default defineComponent({
    name: 'LockModal',
    components: { BasicModal, BasicForm, Avatar },

    setup() {
      const { t } = useI18n();
      const { prefixCls } = useDesign('header-lock-modal');
      const userStore = useUserStore();
      const lockStore = useLockStore();

      const getRealName = computed(() => userStore.getUserInfo?.name);
      const [register, { closeModal }] = useModalInner();
      const avatarUrl = ref<string>('');

      const [registerForm, { validateFields, resetFields }] = useForm({
        showActionButtonGroup: false,
        schemas: [
          {
            field: 'password',
            label: t('layout.header.lockScreenPassword'),
            component: 'InputPassword',
            required: true,
            componentProps: {
              autocomplete: 'off',
            },
          },
        ],
      });

      async function handleLock() {
        const values = (await validateFields()) as any;
        const password: string | undefined = values.password;
        closeModal();

        lockStore.setLockInfo({
          isLock: true,
          pwd: password,
        });
        await resetFields();
      }

      // onMounted(async () => {
      //   const user = userStore.getUserInfo;
      //   await loadAvatarUrl(user.avatarId as string);
      // });

      async function loadAvatarUrl(avatarId: string) {
        const res = await asyncGetUrls(avatarId);
        if (res.code === 0) {
          avatarUrl.value = res.url;
        }
      }

      watch(
        () => userStore.getUserInfo.avatarId,
        (v: string) => {
          loadAvatarUrl(v);
        },
        { immediate: true },
      );

      // const getAvatar = computed(() => {
      //   const user = userStore.getUserInfo;
      //   debugger;
      //   if (!user['avatar']) {
      //     // 这里要怎么写？
      //     // return require(`/@/assets/avatar/default.jpg`);
      //     // return () => import(`/@/assets/avatar/default.jpg`);
      //   } else {
      //     if (user['avatar'].startsWith('http://') || user['avatar'].startsWith('https://')) {
      //       return user['avatar'];
      //     } else {
      //       // return import(`/@/assets/avatar/${user.avatar}`);
      //     }
      //   }
      //   return user['avatar'];
      // });

      return {
        t,
        avatarUrl,
        prefixCls,
        getRealName,
        register,
        registerForm,
        handleLock,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-lock-modal';

  .@{prefix-cls} {
    &__entry {
      position: relative;
      //height: 240px;
      padding: 130px 30px 30px 30px;
      border-radius: 10px;
    }

    &__header {
      position: absolute;
      top: 0;
      left: calc(50% - 45px);
      width: auto;
      text-align: center;

      &-img {
        width: 70px;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
      }
    }

    &__footer {
      text-align: center;
    }
  }
</style>
