<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <Avatar :src="avatarUrl" :style="{ 'margin-right': '0.5rem' }">
        {{ getUserInfo?.nickName?.charAt(0) }}
      </Avatar>
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.nickName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="profile"
          :text="t('layout.header.dropdownProfile')"
          icon="ant-design:user-outlined"
        />
        <MenuItem
          key="doc"
          :text="t('layout.header.dropdownItemDoc')"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <MenuDivider v-if="getShowDoc" />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu, Avatar } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  import { defineComponent, computed, ref, onMounted, watch } from 'vue';

  import { DOC_URL } from '/@/settings/siteSetting';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  import { propTypes } from '/@/utils/propTypes';
  import { openWindow } from '/@/utils';

  import { asyncGetUrls } from '/@/api/lamp/file/upload';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  type MenuEvent = 'logout' | 'doc' | 'lock' | 'profile';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      Avatar,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();
      const { replace } = useRouter();
      const avatarUrl = ref<string>('');

      const getUserInfo = computed(() => {
        return userStore.getUserInfo;
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL);
      }

      function openProfile() {
        replace({
          name: 'profileIndex',
        });
      }

      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'profile':
            openProfile();
            break;
          case 'logout':
            handleLoginOut();
            break;
          case 'doc':
            openDoc();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      onMounted(async () => {
        const user = userStore.getUserInfo;
        await loadAvatarUrl(user.avatarId as string);
      });

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
      // if (!user['avatar']) {
      //   // return require(`/@/assets/avatar/default.jpg`);
      // } else {
      //   if (user['avatar'].startsWith('http://') || user['avatar'].startsWith('https://')) {
      //     return user['avatar'];
      //   } else {
      //     // return require(`/@/assets/avatar/${user.avatar}`);
      //   }
      // }
      // return user['avatar'];
      // });

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        avatarUrl,
        register,
        getUseLockPage,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
