<template>
  <BasicModal
    :keyboard="true"
    :maskClosable="false"
    :min-height="300"
    title="切换企业和组织"
    v-bind="$attrs"
    width="40%"
    @ok="handleSubmit"
    @register="registerModal"
  >
    <div class="md:flex enter-y">
      <div class="md:w-1/2">
        <Card :bodyStyle="{ padding: 0 }" size="small" title="租户">
          <RadioGroup v-model:value="formData.tenant" style="width: 100%" @change="changeTenant">
            <div class="pl-2">
              <List :data-source="getTenantList">
                <template #renderItem="{ item }">
                  <ListItem style="cursor: pointer">
                    <Radio :value="item.id">
                      {{ getTenantName(item) }}
                    </Radio>
                    <template #actions>
                      <a key="more" href="javascript:void(0)" @click="setDefaults(item, $event)">
                        设为默认
                      </a>
                    </template>
                  </ListItem>
                </template>
              </List>
            </div>
          </RadioGroup>
        </Card>
      </div>
      <div class="md:w-1/2">
        <Form
          ref="formRef"
          :label-col="{ style: { width: '80px' } }"
          :model="formData"
          class="p-4 enter-x"
        >
          <FormItem label="单位" name="currentCompanyId">
            <Select v-model:value="formData.currentCompanyId" @change="changeCompany">
              <SelectOption
                v-for="company in formState.companyList"
                :key="company.id"
                :label="company.name"
                :value="company.id"
              >
                {{ company.name }}
              </SelectOption>
            </Select>
          </FormItem>
          <FormItem label="部门" name="currentDeptId">
            <Select v-model:value="formData.currentDeptId">
              <SelectOption
                v-for="dept in formState.deptList"
                :key="dept.id"
                :label="dept.name"
                :value="dept.id"
              >
                {{ dept.name }}
              </SelectOption>
            </Select>
          </FormItem>
        </Form>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, unref } from 'vue';
  import { Card, Form, List, Radio, Select } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import {
    findCompanyDept,
    findDeptByCompany,
    updateDefaultTenant,
  } from '/@/api/lamp/common/oauth';
  import { BaseOrgResultVO } from '/@/api/basic/user/model/baseOrgModel';

  export default defineComponent({
    name: 'DatasourceConfigEdit',
    components: {
      BasicModal,
      Form,
      FormItem: Form.Item,
      Select,
      SelectOption: Select.Option,
      Card,
      List,
      ListItem: List.Item,
      Radio,
      RadioGroup: Radio.Group,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage, createConfirm } = useMessage();
      const userStore = useUserStore();
      const formData = reactive({
        tenant: '',
        currentCompanyId: '',
        currentDeptId: '',
      });
      const formState = reactive({
        companyList: [] as BaseOrgResultVO[],
        deptList: [] as BaseOrgResultVO[],
      });

      // 我拥有的企业
      const getTenantList = computed(() => userStore.getUserInfo?.tenantList);
      // 当前企业id
      const currentTenantId = computed(() => userStore.getTenantId);

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });

        formData.tenant = userStore.getTenantId;
        await loadOrgByTenant(userStore.getTenantId);
      });

      async function loadOrgByTenant(tenantId: string) {
        const org = await findCompanyDept(tenantId);
        formData.currentCompanyId = org.currentCompanyId;
        formData.currentDeptId = org.currentDeptId;
        formState.companyList = org.companyList;
        formState.deptList = org.deptList;
      }

      async function changeTenant(e: ChangeEvent) {
        await loadOrgByTenant(e.target.value);
        formData.currentCompanyId = formState.companyList?.[0].id;
        formData.currentDeptId = formState.deptList?.[0].id;
      }

      async function changeCompany(companyId: string) {
        formState.deptList = await findDeptByCompany(formData.tenant, companyId);
        formData.currentDeptId = formState.deptList?.[0].id;
      }

      function disabledItem(tenant: Recordable) {
        return !tenant.state || !tenant.employeeState || unref(currentTenantId) === tenant.id;
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

      function switchTenantConfirm() {
        const tenant = userStore.getUserInfo?.tenantList?.find(
          (item) => item.id === formData.tenant,
        );
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

        createConfirm({
          iconType: 'warning',
          content: `是否确认切换到企业： ${tenant?.name} ？`,
          onOk: async () => {
            try {
              await switchTenant();
            } catch (e) {}
          },
        });
      }

      async function switchTenant() {
        const userInfo = await userStore.switchTenantAndOrg(
          formData.tenant,
          formData.currentCompanyId,
          formData.currentDeptId,
        );
        if (userInfo) {
          createMessage.success('切换成功');
        }
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
            } catch (e) {}
          },
        });
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          console.log(formData);
          switchTenantConfirm();
          emit('success');
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        formData,
        formState,
        currentTenantId,
        getTenantList,
        getTenantName,
        switchTenantConfirm,
        setDefaults,
        handleSubmit,
        disabledItem,
        changeTenant,
        changeCompany,
      };
    },
  });
</script>
