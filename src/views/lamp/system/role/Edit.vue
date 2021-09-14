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
    <BasicForm @register="registerForm">
      <template #orgList="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="orgTreeData"
          :replaceFields="{ title: 'label', key: 'id' }"
          :checkedKeys="checkedKeys"
          :expandedKeys="checkedKeys"
          checkable
          toolbar
          title="机构部门选择"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { Api, save, update, details } from '/@/api/lamp/system/role';
  import { tree } from '/@/api/lamp/org/org';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './role.data';

  export default defineComponent({
    name: 'RoleEdit',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();
      const orgTreeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<string[]>([]);

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        type.value = data?.type;

        let validateApi = Api.Save;
        const record = { ...data?.record };
        if (unref(type) === ActionEnum.EDIT) {
          validateApi = Api.Update;
        } else {
          record.id = undefined;
        }
        if (data?.record) {
          record.dsType = data?.record?.dsType?.code;
        }

        await setFieldsValue({
          ...record,
        });

        if (data?.record?.id && record.dsType === 'CUSTOMIZE') {
          const roleResult = await details(data?.record?.id);
          checkedKeys.value = roleResult?.orgList || [];
        }
        getValidateRules(validateApi, customFormSchemaRules(type)).then(async (rules) => {
          rules && rules.length > 0 && (await updateSchema(rules));
        });

        orgTreeData.value = (await tree({ state: true })) as any as TreeItem[];
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });

          if (unref(type) === ActionEnum.EDIT) {
            await update(params);
          } else {
            await save(params);
          }
          createMessage.success(t(`common.tips.${type.value}Success`));
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { t, registerDrawer, registerForm, type, handleSubmit, orgTreeData, checkedKeys };
    },
  });
</script>
