<template>
  <div class="meta-input">
    <div class="item-box">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleAdd">添加</a-button>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: t('common.title.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                label: t('common.title.delete'),
                color: 'error',
                popConfirm: {
                  title: t('common.tips.confirmDelete'),
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
    <EditModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { forEach } from 'lodash-es';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { metaJsonColumns } from './defResource.data';
  import EditModal from './MetaEdit.vue';
  export default defineComponent({
    name: 'DefResourceMetaJson',
    components: { BasicTable, TableAction, EditModal },
    props: {
      value: {
        type: [Object, String],
      },
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
      const [registerModal, { openModal }] = useModal();
      const { t } = useI18n();
      const keys = ref<Recordable[]>([]);
      const innerVal = ref<Recordable>({});

      const [registerTable] = useTable({
        title: '路由的 Meta 配置',
        dataSource: keys,
        columns: metaJsonColumns,
        bordered: true,
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      watch(
        () => props.value,
        (value: string) => {
          innerVal.value = JSON.parse(value || '{}');
          // keys.value = Object.keys(innerVal.value || {});
          const list: Recordable[] = [];
          forEach(innerVal.value, (v, key) => {
            list.push({ key, value: v });
          });
          keys.value = list;
        },
        { deep: true },
      );
      watch(
        () => innerVal.value,
        (value) => {
          const list: Recordable[] = [];
          forEach(value, (v, key) => {
            list.push({ key, value: v });
          });
          keys.value = list;
          // keys.value = Object.keys(value || {});
          // emit('change', JSON.stringify(value));
        },
        { deep: true },
      );

      function handleAdd() {
        openModal(true, {
          type: ActionEnum.ADD,
        });
      }
      function handleEdit(record: Recordable, e) {
        e?.stopPropagation();
        openModal(true, {
          record: record,
          type: ActionEnum.EDIT,
        });
      }
      function handleDelete(record: Recordable, e) {
        e?.stopPropagation();
        if (record && record?.key) {
          delete innerVal.value[record?.key];

          emit('change', JSON.stringify(innerVal.value));
          emit('update:value', JSON.stringify(innerVal.value));
        }
      }
      function handleSuccess(metaItem) {
        const data = { ...innerVal.value };
        data[metaItem.key] = metaItem.value;
        for (let key in data) {
          let value = data[key];
          if (value === 'false') {
            value = false;
          } else if (value === 'true') {
            value = true;
          } else if (/^\d+$/.test(value)) {
            value = parseInt(value);
          } else if (/^\d+\.\d+$/.test(value)) {
            value = parseFloat(value);
          }
          data[key] = value;
        }

        innerVal.value = data;
        emit('change', JSON.stringify(data));
        emit('update:value', JSON.stringify(data));
      }

      return {
        innerVal,
        keys,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSuccess,
        registerModal,
        registerTable,
        metaJsonColumns,
        t,
      };
    },
  });
</script>
<style lang="less" scoped>
  .meta-input {
    border: 1px solid #d9d9d9;
    padding: 10px 20px;
    display: flex;
    border-radius: 4px;

    .item-box {
      flex: 1;
      margin-right: 20px;

      .item {
        display: flex;

        .key {
          font-weight: 500;
        }

        .value {
          margin-left: 20px;
          margin-right: 40px;
        }
      }
    }
  }
</style>
