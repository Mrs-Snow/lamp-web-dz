<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="30%"
    :maskClosable="false"
    :title="t(`common.title.${type}`)"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"
      ><template #resourceIdList="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :replaceFields="{ title: 'name', key: 'id' }"
          :checkedKeys="checkedKeys"
          :expandedKeys="checkedKeys"
          checkable
          checkStrictly
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { detail } from '/@/api/devOperation/application/defTenantApplicationRel';
  import { editFormSchema } from './defTenantApplicationRecord.data';

  export default defineComponent({
    name: 'DefTenantApplicationRecordEdit',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref<ActionEnum>(ActionEnum.VIEW);
      const { createMessage } = useMessage();
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<string[]>([]);
      const [registerForm, { setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(type),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        try {
          setDrawerProps({ confirmLoading: true });
          await resetFields();
          type.value = data?.type;

          // 赋值
          const result = await detail(data?.record.tenantApplicationRelId);

          treeData.value = result.resourceList as TreeItem[];
          checkedKeys.value = result.checkedList as string[];
          await setFieldsValue({ ...data?.record });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      });

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          createMessage.success(t(`common.tips.${type.value}Success`));
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { t, registerDrawer, registerForm, type, handleSubmit, treeData, checkedKeys };
    },
  });
</script>
