<template>
  <BasicForm @register="registerBasicForm" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum, VALIDATE_API } from '/@/enums/commonEnum';
  import { GenTypeEnum, TplEnum } from '/@/enums/biz/tenant';
  import { getValidateRules, RuleType } from '/@/api/lamp/common/formValidateService';
  import { Api, detail, update } from '/@/api/devOperation/developer/defGenTable';
  import { tree as queryMenu } from '/@/api/devOperation/application/defResource';
  import { baseEditFormSchema, customFormSchemaRules } from './defGenTableEdit.data';

  export default defineComponent({
    name: '代码配置',
    components: {
      BasicForm,
    },
    emits: ['loading'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const { createMessage } = useMessage();

      function setLoading(loading: boolean) {
        setProps({ submitButtonOptions: { loading: loading } });
        emit('loading', loading);
      }

      const [
        registerBasicForm,
        { validate, getFieldsValue, setFieldsValue, updateSchema, setProps },
      ] = useForm({
        name: 'basic',
        labelWidth: 140,
        schemas: baseEditFormSchema(),
        showActionButtonGroup: true,
        baseColProps: { span: 24 },
        actionColOptions: {
          span: 13,
        },
        submitButtonOptions: {
          text: '保存',
        },
        submitFunc: handleSubmit,
      });

      async function handleSubmit() {
        try {
          setLoading(true);

          const params = await validate();

          await update(params);
          createMessage.success('保存成功');
        } finally {
          setLoading(false);
        }
      }

      async function loadDetail(tableId: string) {
        const record = await detail(tableId);
        setFieldsValue(record);
        if (record.menuApplicationId) {
          const treeData = await queryMenu({ applicationId: record.menuApplicationId });
          await updateSchema({
            field: 'menuParentId',
            componentProps: {
              treeData,
            },
          });
        }

        let validateApi = Api[VALIDATE_API[ActionEnum.EDIT]];
        const customRules = customFormSchemaRules(getFieldsValue);
        if (record.isDs) {
          customRules.push({
            field: 'dsValue',
            type: RuleType.append,
            rules: [{ required: true }],
          });
          updateSchema({
            field: 'isDs',
            colProps: {
              span: 12,
            },
          });
        } else {
          customRules.push({
            field: 'dsValue',
            type: RuleType.append,
            rules: [{ required: false }],
          });
          updateSchema({
            field: 'isDs',
            colProps: {
              span: 24,
            },
          });
        }
        if (TplEnum.TREE === record.tplType) {
          customRules.push({
            field: 'treeName',
            type: RuleType.append,
            rules: [{ required: true }],
          });
        } else {
          customRules.push({
            field: 'treeName',
            type: RuleType.append,
            rules: [{ required: false }],
          });
        }
        if (GenTypeEnum.GEN === record.genType) {
          customRules.push({
            field: 'outputDir',
            type: RuleType.append,
            rules: [{ required: true }],
          });
          customRules.push({
            field: 'frontOutputDir',
            type: RuleType.append,
            rules: [{ required: true }],
          });
        } else {
          customRules.push({
            field: 'outputDir',
            type: RuleType.append,
            rules: [{ required: false }],
          });
          customRules.push({
            field: 'frontOutputDir',
            type: RuleType.append,
            rules: [{ required: false }],
          });
        }
        getValidateRules(validateApi, customRules).then(async (rules) => {
          rules && rules.length > 0 && (await updateSchema(rules));
        });
      }

      return {
        t,
        registerBasicForm,
        handleSubmit,
        loadDetail,
        validate,
      };
    },
  });
</script>
