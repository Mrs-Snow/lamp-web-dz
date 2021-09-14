<template>
  <PageWrapper
    class="high-form"
    title="发送短信"
    contentBackground
    content=" 1.长度不超过500字，单条短信超过70字后，按67字/条分多条计费；
2.短信模板内容不能包含【】符号。 "
    contentClass="p-4"
  >
    <BasicForm @register="registerForm">
      <template #telNum>
        <span style="display: flex">
          <a-tag
            :closable="type !== ActionEnum.VIEW"
            :key="index"
            class="tel-num-tag"
            @close="handleTelNumClose(tag)"
            v-for="(tag, index) in formState.telNumList"
            >{{ tag }}</a-tag
          >
          <a-input
            ref="telNumRef"
            :placeholder="t('lamp.resources.smsTask.receiver')"
            class="input-new-tag"
            v-if="formState.telNumVisible"
            v-model:value="formState.telNumNow"
            size="small"
            @blur="handleTelNumConfirm"
            @keyup.enter="handleTelNumConfirm"
          />
          <a-button
            v-else
            :disabled="type === ActionEnum.VIEW"
            @click="telNumAdd"
            class="button-new-button"
            ><plus-outlined />添加</a-button
          >
        </span>
      </template>
      <template #sendTime="{ model, field }">
        <RadioGroup
          v-model:value="formState.isTiming"
          :disabled="type === ActionEnum.VIEW"
          button-style="solid"
          @change="
            (e) => {
              model[field] = '';
            }
          "
        >
          <RadioButton :value="true">是</RadioButton>
          <RadioButton :value="false">否</RadioButton>
        </RadioGroup>
        <DatePicker
          :disabled="type === ActionEnum.VIEW"
          v-model:value="model[field]"
          v-if="formState.isTiming"
          style="margin-left: 1rem"
          format="YYYY-MM-DD HH:mm:ss"
          valueFormat="YYYY-MM-DD HH:mm:ss"
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          show-time
        />
      </template>
      <template #content>
        <a-row class="message" style="padding: 10px">
          <a-col :sm="12" :xs="24" style="padding-right: 10px">
            <FormItem
              labelAlign="left"
              :colon="true"
              :key="index"
              :label="'参数[' + key + ']（' + item.key + '）'"
              name="content"
              v-for="(item, key, index) in formState.templateParam"
              :labelCol="{
                span: 4,
              }"
              :wrapperCol="{
                span: 20,
              }"
            >
              <a-input
                :disabled="type === ActionEnum.VIEW"
                :value="item.value"
                @input="
                  (e) => {
                    inputTemplateParam(e, key);
                  }
                "
                :maxlength="255"
              />
            </FormItem>
          </a-col>
          <a-col :sm="12" :xs="24" style="padding-left: 10px">
            <FormItem
              label="预览"
              labelAlign="left"
              :colon="true"
              :labelCol="{
                span: 3,
              }"
              :wrapperCol="{
                span: 21,
              }"
            >
              <div class="article" v-text="formState.content"></div>
            </FormItem>
          </a-col>
        </a-row>
      </template>
    </BasicForm>

    <SendStatusIndex v-if="type === ActionEnum.VIEW" />

    <template #rightFooter>
      <template v-if="type !== ActionEnum.VIEW">
        <a-button type="primary" color="warning" @click="handleSubmit(true)"> 存草稿 </a-button>
        <a-button type="primary" @click="handleSubmit(false)" class="ml-4"> 立即发送 </a-button>
      </template>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, nextTick, watch, onMounted } from 'vue';
  import { Tag, Row, Col, Form, Radio, DatePicker } from 'ant-design-vue';
  import moment from 'moment';
  import { useRouter } from 'vue-router';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoading } from '/@/components/Loading';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { validMobile } from '/@/utils/lamp/common';
  import { Api, save, update, detail } from '/@/api/lamp/resources/smsTask';
  import { get } from '/@/api/lamp/resources/smsTemplate';
  import { SmsTask } from '/@/api/lamp/resources/model/smsTaskModel';
  import { SmsTemplate } from '/@/api/lamp/resources/model/smsTemplateModel';
  import { getValidateRules } from '/@/api/lamp/common/formValidateService';
  import { customFormSchemaRules, editFormSchema } from './smsTask.data';
  import SendStatusIndex from './SendStatusIndex.vue';

  export default defineComponent({
    name: 'SmsTaskEdit',
    components: {
      BasicForm,
      PageWrapper,
      [Tag.name]: Tag,
      PlusOutlined,
      [Col.name]: Col,
      [Row.name]: Row,
      FormItem: Form.Item,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      DatePicker,
      SendStatusIndex,
    },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const type = ref<ActionEnum>(ActionEnum.ADD);
      const telNumRef = ref();
      const { replace, currentRoute } = useRouter();
      const { closeCurrent } = useTabs();
      const { createMessage } = useMessage();

      const formState = reactive({
        telNumVisible: false,
        telNumList: [] as string[],
        telNumNow: '',
        content: '',
        templateParam: [] as any[],
        smsTemplate: {} as SmsTemplate,

        isTiming: false,
      });

      const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: editFormSchema(formState, type),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [openFullLoading, closeFullLoading] = useLoading({
        tip: t('common.requestingText'),
      });

      onMounted(() => {
        const { params, query } = currentRoute.value;
        const id = params.id;
        type.value = query?.type as ActionEnum;
        load({ type: query?.type, id });
      });

      watch(
        () => formState.templateParam,
        () => {
          const providerType = formState.smsTemplate?.providerType?.code;
          const extra = formState.smsTemplate?.providerType?.extra;
          let content = formState.smsTemplate?.content as string;
          if (!extra) {
            return;
          }
          if (!extra) {
            return;
          }
          const regex = new RegExp(extra);

          for (const index in formState.templateParam) {
            if (formState.templateParam && formState.templateParam[index]) {
              content = content.replace(regex, formState.templateParam[index].value);
            }
          }

          if (unref(providerType) !== ActionEnum.VIEW) {
            formState.content = content as string;
          }
        },
        { immediate: true, deep: true }
      );

      async function load(data: Recordable) {
        await resetFields();

        type.value = data?.type;
        let record = {} as SmsTask;
        if (data?.type !== ActionEnum.ADD) {
          let smsTask = {} as SmsTask;
          if (data?.id && data?.id !== '0') {
            smsTask = await detail(data?.id);
          }
          record = { ...smsTask };
          record.status = smsTask?.status?.code as string;
          formState.telNumList = (smsTask?.telNumList as string[]) || [];
          formState.isTiming = smsTask?.sendTime == null ? false : true;

          let template = {};
          if (smsTask?.templateId) {
            template = await get(smsTask?.templateId as string);
          }
          setTemplateParam(smsTask?.templateParams);
          formState.smsTemplate = template;
        }
        let validateApi = Api.Save;
        if (data?.type === ActionEnum.EDIT) {
          validateApi = Api.Update;
        } else {
          record.id = undefined;
        }

        await setFieldsValue({ ...record });

        if (data?.type !== ActionEnum.VIEW) {
          const rules = await getValidateRules(validateApi, customFormSchemaRules(type));
          rules && rules.length > 0 && (await updateSchema(rules));
        }
      }

      function setTemplateParam(templateParams) {
        if (templateParams) {
          try {
            const temp = JSON.parse(templateParams);
            formState.templateParam = [...temp];
          } catch (e) {
            console.warn('解析模板参数异常');
            formState.templateParam = [];
          }
        } else {
          formState.templateParam = [];
        }
      }

      function telNumAdd() {
        formState.telNumVisible = true;
        nextTick(() => {
          telNumRef.value.focus();
        });
      }
      function handleTelNumClose(telNum: string) {
        if (formState.telNumList) {
          const tags = formState.telNumList.filter((tag) => tag !== telNum);
          formState.telNumList = tags;
        }
      }
      function handleTelNumConfirm() {
        const inputValue = formState.telNumNow;
        if (!inputValue) {
          return;
        }
        if (!validMobile(inputValue)) {
          createMessage.warn('请填写正确的手机号');
          telNumRef.value.focus();
          return;
        }

        if (inputValue && formState.telNumList.indexOf(inputValue) === -1) {
          formState.telNumList = [...formState.telNumList, inputValue];
        }

        Object.assign(formState, {
          telNumVisible: false,
          telNumNow: '',
        });
      }

      function inputTemplateParam(e, key: string) {
        formState.templateParam[key].value = e.target.value;
      }

      async function handleSubmit(draft: boolean) {
        try {
          const params = await validate();

          params.telNum = formState.telNumList;
          params.templateParam = formState.templateParam;
          params.draft = draft;
          openFullLoading();

          if (unref(type) === ActionEnum.EDIT) {
            await update(params);
          } else {
            await save(params);
          }
          createMessage.success(t(`common.tips.${type.value}Success`));
          await closeCurrent();
          replace({
            name: '短信中心',
          });
        } finally {
          closeFullLoading();
        }
      }

      return {
        t,
        registerForm,
        type,
        handleSubmit,
        formState,
        telNumAdd,
        handleTelNumClose,
        handleTelNumConfirm,
        telNumRef,
        moment,
        inputTemplateParam,
        ActionEnum,
      };
    },
  });
</script>
<style lang="less" scoped>
  .tel-num-tag {
    height: 30px;
    line-height: 30px;
  }

  .input-new-tag {
    width: 120px;
    vertical-align: bottom;
    height: 30px;
  }

  .button-new-button {
    background: #fff;
    border-style: dashed;
    height: 30px;
    line-height: 22px;
    top: 0;
  }

  .button-new-tag {
    height: auto;
    line-height: 1.2rem;
    top: 1px;
  }

  .message {
    border: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .article {
    font-size: 14px;
    height: auto;
  }
</style>
