<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div class="extra" v-if="item.extra" @click="handleExtra(item.key)">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }} </div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <UpdatePasswordModal @register="registerModal" @success="handleUpdatePasswordSuccess" />
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { List } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import UpdatePasswordModal from './AccountPassword/index.vue';
  import { secureSettingList } from './data';

  export default defineComponent({
    name: 'SecureSetting',
    components: {
      CollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      UpdatePasswordModal,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const { createMessage } = useMessage();

      function handleExtra(key: string, e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        if ('1' === key) {
          openModal(true, {});
        } else {
          createMessage.warn('敬请期待~');
        }
      }
      function handleUpdatePasswordSuccess() {}
      return {
        list: secureSettingList,
        registerModal,
        handleExtra,
        handleUpdatePasswordSuccess,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
