<template>
  <BasicModal
    :keyboard="true"
    :maskClosable="false"
    :min-height="300"
    title="切换企业和组织"
    v-bind="$attrs"
    okText="切换"
    width="40%"
    @ok="handleSubmit"
    @register="registerModal"
  >
    <Card :bodyStyle="{ padding: 0 }" size="small" title="企业">
      <RadioGroup v-model:value="formData.tenant" style="width: 100%" @change="changeTenant">
        <div class="pl-2">
          <List :data-source="formState.tenantList">
            <template #renderItem="{ item }">
              <ListItem style="cursor: pointer">
                <ListItemMeta>
                  <template #title>
                    <Radio :value="item.id" :disabled="disabledItem(item)">
                      {{ getTenantName(item) }}
                    </Radio>
                  </template>
                  <template #description>
                    <RadioGroup
                      v-model:value="formData.orgId"
                      :disabled="disabledItem(item)"
                      @change="changeOrg(item.id)"
                    >
                      <RadioButton v-for="org in item.orgList" :key="org.id" :value="org.id">
                        {{ getOrgName(org) }}
                      </RadioButton>
                    </RadioGroup>
                  </template>
                </ListItemMeta>

                <template #actions>
                  <a
                    key="more"
                    href="javascript:void(0)"
                    v-if="!item.isDefault"
                    @click="setDefaults(item, $event)"
                  >
                    设为默认
                  </a>
                </template>
              </ListItem>
            </template>
          </List>
        </div>
      </RadioGroup>
    </Card>
    <Alert message="注意事项">
      <template #description>
        <p>
          1.【用户】：即账号，任何人在本平台都有一条唯一的用户数据，用户表中的数据可理解为账号，通过手机号、身份证、登录账号等唯一信息来确定唯一性。
          用户表的id类似于微信平台的unionId.
        </p>
        <p>
          2.【员工】：用户属于某个租户，他就是这个租户的员工，一个用户可以属于多个租户，用户和员工是一对多关系。
          一个用户属于多个租户时，在用户表有1条数据，在员工表有多条数据。
          员工表的id类似于微信平台的openId。
        </p>
        <p
          >3.
          【企业】：即租户；1个用户可以属于多个企业，当用户属于多个企业，登录系统时，会进入默认企业。</p
        >
        <p>
          4.
          【单位】："员工"在某个"企业"下可以属于多个单位；员工可以直接挂在单位下，也可以挂在部门下，建议挂在部门下。
        </p>
        <p>5. 【部门】："员工"在某个"企业"下可以属于多个部门；</p>
      </template>
    </Alert>
  </BasicModal>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive } from 'vue';
  import { Alert, Card, List, Radio, RadioGroup } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { findCompanyDept, updateDefaultTenant } from '/@/api/lamp/common/oauth';
  import { BaseOrgResultVO } from '/@/api/basic/user/model/baseOrgModel';
  import { Tenant } from '/@/api/devOperation/tenant/model/tenantModel';
  import { ORG_TYPE_MAP } from '/@/enums/biz/base';

  export default defineComponent({
    name: 'SwitchTenant',
    components: {
      BasicModal,
      Card,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      Radio,
      RadioButton: Radio.Button,
      RadioGroup,
      Alert,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage, createConfirm } = useMessage();
      const userStore = useUserStore();

      const formData = reactive({
        tenant: '',
        orgId: null,
      });
      const formState = reactive({
        // 当前拥有拥有的租户列表
        tenantList: [] as Tenant[],
        // 所属单位id
        currentCompanyId: '',
        // 所属部门id
        currentDeptId: '',
      });

      // 当前企业id
      const currentTenantId = computed(() => userStore.getTenantId);

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });

        formData.tenant = userStore.getTenantId;
        formData.orgId = null;
        await loadOrgByTenant(userStore.getTenantId);
      });

      async function loadOrgByTenant(tenantId: string) {
        const org = await findCompanyDept(tenantId);

        formState.tenantList = org.tenantList;
        formState.currentCompanyId = org.currentCompanyId;
        formState.currentDeptId = org.currentDeptId;
      }

      async function changeOrg(tenantId: string) {
        formData.tenant = tenantId;
      }

      async function changeTenant() {
        formData.orgId = null;
      }

      function disabledItem(tenant: Recordable) {
        return !tenant.state || !tenant.employeeState;
      }

      function getTenantName(tenant: Recordable) {
        if (!tenant) {
          return '';
        }
        const name = tenant?.name?.length > 10 ? tenant?.name?.substr(0, 10) + '...' : tenant?.name;
        const strList = [name];
        if (!tenant.state) {
          // 企业被禁用
          strList.push('(已禁用)');
        } else if (!tenant.employeeState) {
          // 员工被禁用
          strList.push('(已禁用)');
        } else if (tenant.isDefault) {
          // 默认企业
          strList.push('(默认)');
        }
        return strList.join(' ');
      }

      async function setDefaults(tenant: Recordable, e: Event) {
        e?.stopPropagation();
        e?.preventDefault();
        createConfirm({
          iconType: 'warning',
          title: `是否确认修改【${tenant?.name} 】为默认企业？`,
          content: `修改会立即生效，设置为默认企业后，下次登录将默认进入该企业！`,
          onOk: async () => {
            try {
              await updateDefaultTenant(tenant.id as string);
              await loadOrgByTenant(tenant.id);
            } catch (e) {}
          },
        });
      }

      function switchTenantConfirm() {
        const tenant = formState.tenantList?.find((item) => item.id === formData.tenant);
        if (!tenant) {
          createMessage.error('无法切换该企业，请选择正常的企业');
          throw Error('无法切换该企业，请选择正常的企业');
        }
        if (!tenant.state) {
          createMessage.error('该企业已被禁用');
          throw Error('该企业已被禁用');
        }

        if (!tenant.employeeState) {
          createMessage.error('您在该公司的账号被禁用，请联系公司管理员');
          throw Error('您在该公司的账号被禁用，请联系公司管理员');
        }

        for (const tenant of formState.tenantList) {
          if (tenant.id === formData.tenant) {
            if (tenant.orgList && tenant.orgList.length > 0 && !formData.orgId) {
              createMessage.error('请选择机构');
              throw Error('请选择机构');
            }
          }
        }

        createConfirm({
          iconType: 'warning',
          content: `是否确认切换到企业： ${tenant?.name} ？`,
          onOk: async () => {
            try {
              const userInfo = await userStore.switchTenantAndOrg(formData.tenant, formData.orgId);
              if (userInfo) {
                createMessage.success('切换成功');
              }
            } catch (e) {}
          },
        });
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          switchTenantConfirm();
          emit('success');
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      function getOrgName(org: BaseOrgResultVO) {
        let name = `[${ORG_TYPE_MAP.get(org.type)}] `;

        name += org.name;
        if (
          (formState.currentDeptId !== null && formState.currentDeptId === org.id) ||
          (formState.currentDeptId === null && formState.currentCompanyId === org.id)
        ) {
          name += '(当前)';
        }
        return name;
      }

      return {
        registerModal,
        formData,
        formState,
        currentTenantId,
        getTenantName,
        switchTenantConfirm,
        setDefaults,
        handleSubmit,
        disabledItem,
        changeTenant,
        getOrgName,
        changeOrg,
      };
    },
  });
</script>
