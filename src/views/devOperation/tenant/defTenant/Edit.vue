<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    width="50%"
    :maskClosable="false"
    :title="t(`common.title.${type}`)"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum, ServicePrefixEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
  import { Api, save, update } from '/@/api/devOperation/tenant/tenant';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { listByBizId } from '/@/api/lamp/file/upload';
  import { customFormSchemaRules, editFormSchema } from './tenant.data';

  export default defineComponent({
    name: 'TenantEdit',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const type = ref(ActionEnum.ADD);
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 120,
        schemas: editFormSchema(type),
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

        if (unref(type) !== ActionEnum.ADD) {
          const record = data.record;
          // if (record.logo) {
          //   record.logos = [record.logo];
          // }

          const logos = await listByBizId(
            ServicePrefixEnum.TENANT,
            record.id,
            FileBizTypeEnum.DEF_TENANT_LOGO,
          );
          record.logos = logos;
          await setFieldsValue({
            ...record,
          });
          validateApi = Api.Update;
        }

        getValidateRules(validateApi, customFormSchemaRules(type)).then(async (formSchemaRules) => {
          await updateSchema(formSchemaRules);
        });
      });

      async function handleSubmit() {
        try {
          const params = await validate();
          setDrawerProps({ confirmLoading: true });

          // if (params.logos && params.logos.length > 0) {
          //   params.logo = params.logos[0];
          // }

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

      return { t, registerDrawer, registerForm, type, handleSubmit };
    },
  });
</script>
