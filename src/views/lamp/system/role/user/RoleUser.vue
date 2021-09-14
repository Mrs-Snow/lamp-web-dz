<template>
  <BasicModal
    v-bind="$attrs"
    width="40%"
    @register="registerModal"
    title="给角色绑定用户"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #userIdList="{ model, field }">
        <a-transfer
          ref="transferRef"
          v-model:value="model[field]"
          :data-source="userData"
          :rowKey="(record) => record.id"
          show-search
          :showSelectAll="false"
          @change="handleChange"
          :target-keys="targetKeys"
          :render="(item) => item.name"
          :titles="['全部用户', '已选用户']"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Transfer } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, saveUserRole, userList } from '/@/api/lamp/system/role';
  import { query } from '/@/api/lamp/org/user';
  import { roleUserFormSchema } from '../role.data';

  export default defineComponent({
    name: 'RoleUser',
    components: { BasicModal, BasicForm, [Transfer.name]: Transfer },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const transferRef = ref(null);
      const userData = ref<any[]>([]);
      const targetKeys = ref<string[]>([]);
      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: roleUserFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      function getTransfer() {
        const tree = unref(transferRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false, height: 500 });
        const users = (await query({ state: true })) as any[];
        users.forEach((item) => {
          item.key = item.id;
          item.title = item.name;
        });
        userData.value = users;

        const record = { ...data.record };
        targetKeys.value = await userList(record.id);
        record.roleId = record.id;
        await setFieldsValue({
          ...record,
        });
        let validateApi = Api.SaveUserRole;
        getValidateRules(validateApi).then((rules) => {
          rules && rules.length > 0 && updateSchema(rules);
        });
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setModalProps({ confirmLoading: true });

          params.userIdList = getTransfer()?.targetKeys || [];
          await saveUserRole(params);

          createMessage.success('保存成功');
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function handleChange(nextTargetKeys: string[]) {
        targetKeys.value = nextTargetKeys;
      }
      return {
        t,
        transferRef,
        registerModal,
        registerForm,
        handleSubmit,
        userData,
        targetKeys,
        handleChange,
      };
    },
  });
</script>
