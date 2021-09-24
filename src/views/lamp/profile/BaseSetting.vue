<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2"> 头像 </div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :uploadParams="{ bizType: FileBizTypeEnum.BASE_USER_AVATAR }"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="handleUpdateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { FileBizTypeEnum } from '/@/enums/commonEnum';
  import { get, updateBase, updateAvatar } from '/@/api/lamp/org/user';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/lamp/file/upload';
  import { UserUpdateAvatarDTO } from '/@/api/lamp/org/model/userModel';
  import { Enum } from '/@/api/model/baseModel';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const { t } = useI18n();
      const userStore = useUserStore();

      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const { id } = userStore.getUserInfo;
        const data = await get(id);
        data.sex = (data?.sex as Enum)?.code as string;
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatarId } = userStore.getUserInfo;
        return { id: avatarId };
      });

      async function handleUpdateAvatar({ data }) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatarId = data?.id;
        userStore.setUserInfo(userinfo);

        const params = { id: userinfo.id, appendixAvatar: data } as UserUpdateAvatarDTO;
        await updateAvatar(params);
      }

      async function handleSubmit() {
        try {
          const params = await validate();
          await updateBase(params);

          const userinfo = userStore.getUserInfo;
          userinfo.account = params.account;
          userinfo.name = params.name;
          userinfo.workDescribe = params.workDescribe;
          userStore.setUserInfo(userinfo);

          createMessage.success(t(`common.tips.updateSuccess`));
        } finally {
        }
      }
      return {
        avatar,
        register,
        uploadApi,
        handleUpdateAvatar,
        handleSubmit,
        FileBizTypeEnum,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
