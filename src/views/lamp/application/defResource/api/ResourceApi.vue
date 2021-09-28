<template>
  <div class="resource-api">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">录入</a-button>
        <a-button type="primary" @click="handleSelect">选择</a-button>
      </template>
      <template #uri="{ record }">
        <Tag color="processing">
          {{ record.requestMethod }}
        </Tag>
        {{ record.uri }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
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

    <SelectModal @register="registerModal" @success="handleSuccess" />
    <EditModal @register="registerEditModal" @success="handleEditSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref } from 'vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { resourceApiColumns } from '../defResource.data';
  import SelectModal from './ResourceApiSelect.vue';
  import EditModal from './ResourceApiEdit.vue';
  import { DefResourceApiVO } from '/@/api/lamp/application/model/defResourceModel';
  export default defineComponent({
    name: 'DefResourceResourceApi',
    components: { BasicTable, TableAction, SelectModal, EditModal, Tag },
    props: {
      value: {
        type: [Array] as PropType<DefResourceApiVO[]>,
      },
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
      const [registerModal, { openModal }] = useModal();
      const [registerEditModal, { openModal: openEditModal }] = useModal();
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const innerVal = ref<Recordable[]>([]);

      const [registerTable, { getDataSource, setTableData }] = useTable({
        title: '资源关联的接口',
        dataSource: innerVal,
        scroll: { y: 250 },
        columns: resourceApiColumns,
        bordered: true,
        actionColumn: {
          width: 100,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      watch(
        () => props.value,
        (value: DefResourceApiVO[] = []) => {
          innerVal.value = value;
        },
        { deep: true },
      );

      // 选择
      function handleSelect() {
        openModal(true, {
          selectedData: [...unref(innerVal)],
        });
      }
      // 手工录入
      function handleAdd() {
        openEditModal(true, {});
      }

      // 删除接口
      function handleDelete(record: Recordable, e: Event) {
        e?.stopPropagation();

        let index = unref(innerVal).findIndex(
          (selected) =>
            selected.springApplicationName === record.springApplicationName &&
            selected.uri === record.uri &&
            selected.requestMethod === record.requestMethod,
        );

        if (index > -1) {
          innerVal.value.splice(index, 1);
          const data = getDataSource();
          data.splice(index, 1);
        }

        emit('change', innerVal.value);
        emit('update:value', innerVal.value);
      }

      function handleSuccess(selectedData: DefResourceApiVO[]) {
        innerVal.value = selectedData;
        setTableData(selectedData);

        emit('change', selectedData);
        emit('update:value', selectedData);
      }
      function handleEditSuccess(addData: DefResourceApiVO) {
        const index = unref(innerVal).findIndex(
          (selected) =>
            selected.springApplicationName === addData.springApplicationName &&
            selected.uri === addData.uri &&
            selected.requestMethod === addData.requestMethod,
        );

        if (index > -1) {
          createMessage.warn('已存在该接口，请勿重复录入！');
        } else {
          innerVal.value.push(addData);
          const data = getDataSource();
          data.push(addData);
        }

        emit('change', innerVal.value);
        emit('update:value', innerVal.value);
      }

      return {
        handleAdd,
        handleSelect,
        handleDelete,
        handleSuccess,
        registerModal,
        registerTable,
        registerEditModal,
        handleEditSuccess,
        t,
      };
    },
  });
</script>
<style lang="less" scoped>
  .resource-api {
    border: 1px solid #d9d9d9;
    padding: 10px;
    display: flex;
  }
</style>
