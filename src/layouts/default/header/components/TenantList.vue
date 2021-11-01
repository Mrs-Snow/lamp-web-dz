<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <Dropdown placement="bottomLeft">
      <span> {{ getTenantName(getCurrentTenant) }} <DownOutlined /></span>
      <template #overlay>
        <Menu
          @click="switchTenantConfirm"
          :class="[`${prefixCls}--menu`, `${prefixCls}--menu--${theme}`]"
        >
          <MenuItem
            v-for="tenant in getTenantList"
            :key="tenant.id"
            :disabled="disabledItem(tenant)"
          >
            {{ getTenantName(tenant) }}
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { propTypes } from '/@/utils/propTypes';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  export default defineComponent({
    name: 'TenantList',
    components: { Dropdown, DownOutlined, Menu, MenuItem: Menu.Item },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('layout-tenantList');
      const userStore = useUserStore();
      const { createMessage, createConfirm } = useMessage();

      // 我拥有的企业
      const getTenantList = computed(() => userStore.getUserInfo?.tenantList);
      // 当前企业id
      const currentTenantId = computed(() => userStore.getTenantId);
      // 当前企业
      const getCurrentTenant = computed(() => {
        return userStore.getUserInfo?.tenantList?.find(
          (item) => item.id === unref(currentTenantId),
        );
      });

      function getTenantName(tenant: Recordable) {
        const strList = [tenant.name];
        if (!tenant.state) {
          // 企业被禁用
          strList.push('(已禁用)');
        } else if (!tenant.employeeState) {
          // 员工被禁用
          strList.push('(已禁用)');
        } else if (tenant.isDefault) {
          // 默认企业
          strList.push('(默认)');
        }
        return strList.join(' ');
      }

      function disabledItem(tenant: Recordable) {
        return !tenant.state || !tenant.employeeState || unref(currentTenantId) === tenant.id;
      }
      function switchTenantConfirm({ key }: MenuInfo) {
        const tanant = userStore.getUserInfo?.tenantList?.find((item) => item.id === key);
        if (!tanant) {
          createMessage.error('无法切换该企业，请选择正常的企业');
          throw Error('无法切换该企业，请选择正常的企业');
        }
        if (!tanant.state) {
          createMessage.error('该企业已被禁用');
          throw Error('该企业已被禁用');
        }

        if (!tanant.employeeState) {
          createMessage.error('您在该公司的账号被禁用，请联系公司管理员');
          throw Error('您在该公司的账号被禁用，请联系公司管理员');
        }

        createConfirm({
          iconType: 'warning',
          content: `是否确认切换到企业： ${tanant?.name} ？`,
          onOk: async () => {
            try {
              await switchTenant(key as string);
            } catch (e) {}
          },
        });
      }

      async function switchTenant(tenantId: string) {
        const userInfo = await userStore.switchTenant(tenantId);
        if (userInfo) {
          createMessage.success('切换成功');
        }
      }
      return {
        prefixCls,
        switchTenantConfirm,
        getTenantName,
        getTenantList,
        getCurrentTenant,
        disabledItem,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-tenantList';
  @tenantList-item-normal-color: #999;

  .@{prefix-cls} {
    display: flex;
    padding: 0 8px;
    align-items: center;

    &--light {
      .ant-dropdown-trigger {
        color: @tenantList-item-normal-color;
      }
    }

    &--dark {
      .ant-dropdown-trigger {
        color: rgb(255 255 255 / 60%);
      }
    }
  }
</style>
