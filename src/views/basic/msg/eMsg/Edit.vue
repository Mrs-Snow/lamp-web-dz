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
          <a-select-option v-for="item in formState.userList" :key="item.id" :value="item.id">
            {{ item.nickName }} [{{ item.username }}]
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
          <a-select-option v-for="item in formState.roleList" :key="item.code" :value="item.code">
            {{ item.name }} [{{ item.code }}]
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
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { ActionEnum, MsgTypeEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { Api, save, get } from '/@/api/basic/msg/eMsg';
  import { pageUser } from '/@/api/devOperation/tenant/defUser';
  import { query as queryRole } from '/@/api/basic/system/baseRole';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './eMsg.data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useLoading } from '/@/components/Loading';
  import { useRouter } from 'vue-router';
  import { Enum } from '/@/api/model/baseModel';
  import { RouteEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: 'EMsgEdit',
    components: {
      BasicForm,
      [Select.name]: Select,
      PageWrapper,
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
        userList: [] as any[],
        roleList: [] as any[],
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
        const { params } = currentRoute.value;
        const id = params.id;
        load({ type: params?.type, id });
        loadList();
      });

      const loadList = async () => {
        const result = await pageUser({ model: {}, size: 1000, current: 1 });
        formState.userList = result.records;
        formState.roleList = await queryRole();
      };

      const load = async (data: Recordable) => {
        await resetFields();
        type.value = data?.type;

        if (![ActionEnum.ADD].includes(unref(type))) {
          const record = await get(data?.id);
          record.msgType = (record?.msgType as Enum)?.code as string;
          await setFieldsValue({ ...record });
        }

        if ([ActionEnum.ADD, ActionEnum.COPY].includes(unref(type))) {
          let validateApi = Api[VALIDATE_API[unref(type)]];
          const rules = await getValidateRules(validateApi, customFormSchemaRules(type));
          rules && rules.length > 0 && (await updateSchema(rules));
        }
      };

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });
      async function handleSubmit() {
        try {
          const msgVO = await validate();

          const params = { msgVO };
          if (formState.receiveType === 'user') {
            params['userIdList'] = formState.userIdList;
          } else {
            params['roleCodeList'] = formState.roleCodeList;
          }

          openFullLoading();
          await save(params);
          createMessage.success(t(`common.tips.${type.value}Success`));
          await closeCurrent();
          replace({ name: RouteEnum.BASIC_MSG });
        } finally {
          closeFullLoading();
        }
      }

      return { t, registerForm, type, handleSubmit, formState, ActionEnum, MsgTypeEnum };
    },
  });
</script>
