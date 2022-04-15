<template>
  <BasicForm @register="registerBasicForm">
    <template #resetBefore>
      <a-button :loading="loading" class="mr-2" type="default" @click="downloadFront"
        >下载前端
      </a-button>
    </template>
    <template #submitBefore>
      <a-button :loading="loading" class="mr-2" type="primary" @click="generatorFront"
        >生成前端
      </a-button>
    </template>
  </BasicForm>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadFile } from '/@/utils/lamp/common';
  import {
    downloadZip,
    generatorCode,
    getDefFileOverrideStrategy,
    getFieldTemplate,
  } from '/@/api/devOperation/developer/defGenTable';
  import { generatorCodeFormSchema } from './defGenTableEditGenerator.data';
  import { TemplateEnum } from '/@/enums/biz/tenant';

  export default defineComponent({
    name: '代码生成',
    components: {
      BasicForm,
    },
    setup(_) {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const fieldTemplate = ref<Recordable>({});
      const tableId = ref<string>('');
      const loading = ref<boolean>(false);

      const [registerBasicForm, { validate, setFieldsValue, setProps }] = useForm({
        name: 'generator',
        labelWidth: 140,
        schemas: generatorCodeFormSchema(),
        showActionButtonGroup: true,
        baseColProps: { span: 8 },
        actionColOptions: {
          span: 13,
        },
        resetButtonOptions: {
          text: '下载后端',
        },
        submitButtonOptions: {
          text: '生成后端',
        },
        submitFunc: generatorBackend,
        resetFunc: downloadBackend,
      });

      async function loadDetail(tId: string) {
        tableId.value = tId;
        const ft = await getFieldTemplate();
        fieldTemplate.value = ft;
        const defFileOverrideStrategy = await getDefFileOverrideStrategy();
        setFieldsValue(defFileOverrideStrategy);
      }

      function setLoading(load: boolean) {
        setProps({ submitButtonOptions: { loading: load } });
        loading.value = load;
      }

      async function download(template: TemplateEnum) {
        setLoading(true);
        try {
          const response = await downloadZip([tableId.value], template);
          downloadFile(response);
          createMessage.success(t('common.tips.downloadSuccess'));
        } finally {
          setLoading(false);
        }
      }

      async function generator(template: TemplateEnum) {
        try {
          setLoading(true);
          const params = await validate();
          const fileOverrideConfig = {};
          for (const key in params) {
            fileOverrideConfig[fieldTemplate.value[key]] = params[key];
          }

          const defGenVo = { ids: [tableId.value], template, fileOverrideConfig };
          await generatorCode(defGenVo);

          createMessage.success('代码生成成功，请在[生成路径]查看');
        } finally {
          setLoading(false);
        }
      }

      async function downloadBackend() {
        await download(TemplateEnum.BACKEND);
      }

      async function generatorBackend() {
        await generator(TemplateEnum.BACKEND);
      }

      async function generatorFront() {
        await generator(TemplateEnum.WEB_PLUS);
      }

      async function downloadFront() {
        await download(TemplateEnum.WEB_PLUS);
      }

      return {
        t,
        registerBasicForm,
        loadDetail,
        validate,
        downloadFront,
        generatorFront,
        loading,
      };
    },
  });
</script>
