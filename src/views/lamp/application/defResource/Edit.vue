<template>
  <div class="bg-white m-4 ml-2 overflow-hidden">
    <a-card :title="title" :bordered="false">
      <template #extra>
        <div class="flex justify-center" v-if="show">
          <a-button @click="resetFields">{{ t('common.resetText') }}</a-button>
          <a-button class="!ml-4" type="primary" @click="handleSubmit" :loading="confirmLoading">{{
            t('common.okText')
          }}</a-button>
        </div>
      </template>
      <BasicForm @register="register">
        <template #resourceApiList="{ model, field }">
          <ResourceApi v-model:value="model[field]" />
        </template>
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
  import ResourceApi from './api/ResourceApi.vue';

  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { Api, save, update, get } from '/@/api/lamp/application/defResource';
  import { customFormSchemaRules, editFormSchema } from './defResource.data';

  export default defineComponent({
    name: 'DefResourceEdit',
    components: { BasicForm, [Card.name]: Card, MetaJson, ResourceApi },
    emits: ['success'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const type = ref<ActionEnum>(ActionEnum.ADD);
      const confirmLoading = ref<boolean>(false);
      const show = ref<boolean>(false);
      const title = ref<string>('未选中任何资源');

      const [register, { setFieldsValue, getFieldsValue, resetFields, updateSchema, validate }] =
        useForm({
          labelWidth: 110,
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
          emit('success', params.applicationId);
        } finally {
          confirmLoading.value = false;
        }
      }

      async function resetForm(record) {
        await resetFields();

        show.value = false;
        if (record?.applicationName) {
          title.value = '未选中任何资源';
        }
      }

      // 设置回显数据
      async function setData(data: Recordable) {
        show.value = true;
        await resetFields();
        type.value = data?.type;

        let validateApi = unref(type) !== ActionEnum.ADD ? Api.Update : Api.Save;
        const { parent } = data;
        let resourceVO = {};
        if (unref(type) !== ActionEnum.ADD) {
          resourceVO = await get(data.record.id);
        }
        const record = { ...data.record, ...resourceVO };
        if (record?.applicationName) {
          if (unref(type) === ActionEnum.ADD) {
            title.value =
              t(`common.title.${type.value}`) +
              `【${record?.applicationName}】中【${parent?.label}】的子资源`;
          } else {
            title.value =
              t(`common.title.${type.value}`) +
              `【${record?.applicationName}】中的【${record?.label}】`;
          }
        }
        record['parentName'] = parent?.label;
        record['parentId'] = parent?.id;
        record['parentResourceType'] = parent?.resourceType;
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

      return {
        register,
        resetFields,
        handleSubmit,
        setData,
        t,
        title,
        confirmLoading,
        show,
        resetForm,
      };
    },
  });
</script>
<style lang="less" scoped>
  #resourceApiList {
    flex-direction: column;
  }
</style>
