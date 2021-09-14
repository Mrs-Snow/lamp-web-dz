<template>
  <PageWrapper class="high-form" title="发送消息" contentBackground contentClass="p-4">
    <BasicForm @register="registerForm">
      <template #receiveType="{ model }">
        <RadioGroup
          v-model:value="formState.receiveType"
          :disabled="
            type === ActionEnum.VIEW ||
            [MsgTypeEnum.NOTIFY, MsgTypeEnum.NOTICE].includes(model['msgType'])
          "
          button-style="solid"
          style="margin-right: 2rem"
        >
          <RadioButton value="user">用户</RadioButton>
          <RadioButton value="role">角色</RadioButton>
        </RadioGroup>
        <a-select
          v-if="formState.receiveType === 'user'"
          v-model:value="formState.userIdList"
          class="pay-select"
          placeholder="请选择用户"
          style="width: 70%"
          mode="multiple"
          :disabled="
            type === ActionEnum.VIEW ||
            [MsgTypeEnum.NOTIFY, MsgTypeEnum.NOTICE].includes(model['msgType'])
          "
        >
          <a-select-option v-for="item in formState.userList" :key="item.id" :value="item.id"
            >{{ item.name }}
          </a-select-option>
        </a-select>
        <a-select
          placeholder="请选择角色"
          v-if="formState.receiveType === 'role'"
          v-model:value="formState.roleIdList"
          class="pay-select"
          style="width: 70%"
          mode="multiple"
          :disabled="
            type === ActionEnum.VIEW ||
            [MsgTypeEnum.NOTIFY, MsgTypeEnum.NOTICE].includes(model['msgType'])
          "
        >
          <a-select-option v-for="item in formState.roleList" :key="item.code" :value="item.code"
            >{{ item.name }}
          </a-select-option>
        </a-select>
      </template>
    </BasicForm>
    <template #rightFooter>
      <a-button v-if="type !== ActionEnum.VIEW" type="primary" @click="handleSubmit" class="ml-4">
        立即发送
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, reactive } from 'vue';
  import { Select, Radio } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoading } from '/@/components/Loading';
  import { ActionEnum, MsgTypeEnum } from '/@/enums/commonEnum';
  import { Api, save, get } from '/@/api/lamp/resources/msg';
  import { query as queryUser } from '/@/api/lamp/org/user';
  import { query as queryRole } from '/@/api/lamp/system/role';
  import { Role } from '/@/api/lamp/system/model/roleModel';
  import { User } from '/@/api/lamp/org/model/userModel';

  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './msg.data';

  export default defineComponent({
    name: 'MsgEdit',
    components: {
      BasicForm,
      PageWrapper,
      [Select.name]: Select,
      ASelectOption: Select.Option,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();
      const { replace, currentRoute } = useRouter();
      const { closeCurrent } = useTabs();

      const formState = reactive({
        receiveType: 'user',
        userIdList: [] as string[],
        roleCodeList: [] as string[],
        userList: [] as User[],
        roleList: [] as Role[],
      });

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(type, msgTypeChange),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      function msgTypeChange(value) {
        if ([MsgTypeEnum.NOTIFY, MsgTypeEnum.NOTICE].includes(value)) {
          formState.userIdList = [];
          formState.roleCodeList = [];
        }
      }

      onMounted(() => {
        const { params, query } = currentRoute.value;
        const id = params.id;
        load({ type: query?.type, id });
        loadList();
      });

      const loadList = async () => {
        formState.userList = await queryUser();
        formState.roleList = await queryRole();
      };

      const load = async (data) => {
        await resetFields();
        type.value = data?.type;

        if (unref(type) === ActionEnum.ADD) {
          let validateApi = Api.Save;
          getValidateRules(validateApi, customFormSchemaRules(type)).then(async (rules) => {
            rules && rules.length > 0 && (await updateSchema(rules));
          });
        } else {
          const record = await get(data?.id);
          record.msgType = record?.msgType?.code;
          record.id = undefined;
          await setFieldsValue({ ...record });
        }
      };

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });
      async function handleSubmit() {
        try {
          const msgDTO = await validate();

          const params = { msgDTO };
          if (formState.receiveType === 'user') {
            params['userIdList'] = formState.userIdList;
          } else {
            params['roleCodeList'] = formState.roleCodeList;
          }

          openFullLoading();
          await save(params);
          createMessage.success(t(`common.tips.${type.value}Success`));
          await closeCurrent();
          replace({
            name: '消息中心',
          });
        } finally {
          closeFullLoading();
        }
      }

      return { t, registerForm, type, handleSubmit, formState, ActionEnum, MsgTypeEnum };
    },
  });
</script>
