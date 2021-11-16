<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="grantType">
      <Input size="large" v-model:value="formData.grantType" :hidden="true" />
    </FormItem>
    <FormItem name="key">
      <Input size="large" v-model:value="formData.key" :hidden="true" />
    </FormItem>
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        autocomplete="off"
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x" v-show="formState.showCaptcha">
      <ACol>
        <FormItem class="code-input" name="code">
          <Input
            size="large"
            visibilityToggle
            v-model:value="formData.code"
            :placeholder="t('sys.login.captcha')"
          />
        </FormItem>

        <img
          v-show="true"
          :src="formState.captchaSrc"
          @click="loadCaptcha"
          alt="captcha"
          class="code-image"
        />
      </ACol>
    </ARow>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="formState.loading">
        {{ t('sys.login.loginButton') }} {{ devFlag }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, toRaw, unref, computed, onMounted } from 'vue';
  import { isDevMode } from '/@/utils/env';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { randomNum } from '/@/utils';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const globSetting = useGlobSetting();
  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const rememberMe = ref(false);
  const devFlag = ref<string>('');

  if (isDevMode()) {
    devFlag.value = '(debug)';
  }
  onMounted(() => {
    loadCaptcha();
  });

  const formData = reactive({
    username: '',
    password: '',
    code: '',
    grantType: globSetting.showCaptcha === 'true' ? 'CAPTCHA' : 'PASSWORD',
    key: randomNum(24, 16),
    verify: undefined,
  });
  const formState = reactive({
    loading: false,
    captchaSrc: '',
    isMultiTenant: globSetting.multiTenantType !== 'NONE',
    showCaptcha: globSetting.showCaptcha === 'true',
  });

  // 加载验证码
  async function loadCaptcha() {
    formData.code = '';
    const captcha = await userStore.loadCaptcha(formData.key);
    formState.captchaSrc = captcha;
  }

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      formState.loading = true;
      const userInfo = await userStore.login(toRaw(data));
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}`,
          duration: 3,
        });
      } else {
        await loadCaptcha();
      }
    } catch (error) {
      await loadCaptcha();
    } finally {
      formState.loading = false;
    }
  }
</script>
