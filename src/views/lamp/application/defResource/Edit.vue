<template>
  <div class="bg-white m-4 ml-2 overflow-hidden">
    <a-card :title="t(`common.title.${type}`)" :bordered="false">
      <BasicForm @register="register">
        <template #apiList="{ model, field }"> <a-input v-model:value="model[field]" /> </template>
        <template #metaJson="{ model, field }">
          <MetaJson ref="meta" v-model:value="model[field]" />
        </template>
      </BasicForm>

      <div class="flex justify-center" v-if="show">
        <a-button @click="resetFields">{{ t('common.resetText') }}</a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit" :loading="confirmLoading">{{
          t('common.okText')
        }}</a-button>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form';
  import { ActionEnum } from '/@/enums/commonEnum';
  import MetaJson from './meta/MetaJson.vue';

  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, save, update } from '/@/api/lamp/application/defResource';
  import { customFormSchemaRules, editFormSchema } from './defResource.data';

  export default defineComponent({
    name: 'DefResourceEdit',
    components: { BasicForm, [Card.name]: Card, MetaJson },
    emits: ['success'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const type = ref<ActionEnum>(ActionEnum.ADD);
      const confirmLoading = ref<boolean>(false);
      const show = ref<boolean>(false);

      const [register, { setFieldsValue, getFieldsValue, resetFields, updateSchema, validate }] =
        useForm({
          size: 'large',
          labelWidth: 100,
          showActionButtonGroup: false,
          schemas: editFormSchema(type),
        });

      // 提交
      async function handleSubmit() {
        try {
          const params = await validate();
          confirmLoading.value = true;
          if (unref(type) === ActionEnum.EDIT) {
            await update(params);
          } else {
            await save(params);
          }
          createMessage.success(t(`common.tips.${type.value}Success`));

          type.value = ActionEnum.ADD;
          await resetFields();
          show.value = false;
          emit('success');
        } finally {
          confirmLoading.value = false;
        }
      }

      // 设置回显数据
      async function setData(data: Recordable) {
        show.value = true;
        await resetFields();
        type.value = data?.type;

        let validateApi = unref(type) !== ActionEnum.ADD ? Api.Update : Api.Save;

        const { record = {}, parent } = data;
        record['parentName'] = parent?.label;
        record['parentId'] = parent?.id;
        if (unref(type) !== ActionEnum.EDIT) {
          record.id = undefined;
        }
        await setFieldsValue({ ...record });

        getValidateRules(validateApi, customFormSchemaRules(type, getFieldsValue)).then(
          async (rules) => {
            rules && rules.length > 0 && (await updateSchema(rules));
          },
        );
      }

      return { register, resetFields, handleSubmit, setData, t, type, confirmLoading, show };
    },
  });
</script>
