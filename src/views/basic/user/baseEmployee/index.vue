<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:delete-outlined"
          color="error"
          v-hasAnyPermission="[RoleEnum.EMPLOYEE_DELETE]"
          @click="handleBatchDelete"
        >
          {{ t('common.title.delete') }}
        </a-button>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          v-hasAnyPermission="[RoleEnum.EMPLOYEE_ADD]"
          @click="handleAdd"
        >
          {{ t('common.title.add') }}
        </a-button>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleInvitation"
          v-hasAnyPermission="[RoleEnum.INVITATION_USER]"
        >
          邀请
        </a-button>
      </template>
      <template #orgIdList="{ record }">
        <span>
          <Tag
            color="success"
            class="mr-2"
            v-for="(orgName, index) in record?.echoMap?.orgIdList"
            :key="index"
          >
            {{ orgName }}
          </Tag>
        </span>
      </template>
      <template #mainOrg="{ record }">
        <span>
          <Tag color="success" class="mr-2" v-if="record?.echoMap?.mainOrgId">
            {{ record?.echoMap?.mainOrgId }}
          </Tag>
        </span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: t('common.title.view'),
              icon: 'ant-design:search-outlined',
              onClick: handleView.bind(null, record),
              auth: RoleEnum.EMPLOYEE_VIEW,
            },
            {
              label: '绑定角色',
              icon: 'ant-design:search-outlined',
              onClick: handleBindRole.bind(null, record),
              auth: RoleEnum.EMPLOYEE_BIND_ROLE,
            },
          ]"
          :dropDownActions="[
            {
              label: t('common.title.edit'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
              auth: RoleEnum.EMPLOYEE_EDIT,
            },
            {
              label: t('common.title.copy'),
              icon: 'ant-design:copy-outlined',
              onClick: handleCopy.bind(null, record),
              auth: RoleEnum.EMPLOYEE_ADD,
            },
            {
              label: t('common.title.delete'),
              icon: 'ant-design:delete-outlined',
              auth: RoleEnum.EMPLOYEE_DELETE,
              popConfirm: {
                title: t('common.tips.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :stopButtonPropagation="true"
        />
      </template>
    </BasicTable>
    <EditModal @register="registerDrawer" @success="handleSuccess" />
    <InvitationUserModal @register="registerInvitationModal" @success="handleSuccess" />
    <EmployeeRole @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import { handleFetchParams } from '/@/utils/lamp/common';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { page, remove } from '/@/api/basic/user/baseEmployee';
  import EmployeeRole from './employeeRole/index.vue';
  import { columns, searchFormSchema } from './baseEmployee.data';
  import EditModal from './Edit.vue';
  import InvitationUserModal from './InvitationUser.vue';

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: '员工维护',
    components: {
      BasicTable,
      PageWrapper,
      EditModal,
      InvitationUserModal,
      TableAction,
      Tag,
      EmployeeRole,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage, createConfirm } = useMessage();
      // 编辑页弹窗
      const [registerDrawer, { openDrawer }] = useDrawer();
      // 绑定角色
      const [registerModal, { openModal }] = useModal();
      const [registerInvitationModal, { openModal: openInvitationModal }] = useModal();

      // 表格
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        title: t('basic.user.baseEmployee.table.title'),
        api: page,
        columns: columns(),
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema(),
          baseColProps: { xs: 24, sm: 12, md: 12, lg: 12, xl: 8 },
          autoSubmitOnEnter: true,
          resetButtonOptions: {
            preIcon: 'ant-design:rest-outlined',
          },
          submitButtonOptions: {
            preIcon: 'ant-design:search-outlined',
          },
          alwaysShowLines: 1,
        },
        beforeFetch: handleFetchParams,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        titleHelpMessage: [
          '1. 新增员工，会同时新增一条def_user表数据',
          '2. 初始密码统一为：123456',
          '3. 可以使用用户名、手机、邮箱、身份证登录',
        ],
        actionColumn: {
          width: 220,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹出复制页面
      function handleCopy(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.COPY,
        });
      }

      // 弹出新增页面
      function handleAdd() {
        openDrawer(true, {
          type: ActionEnum.ADD,
        });
      }

      // 弹出查看页面
      function handleView(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.VIEW,
        });
      }

      // 弹出编辑页面
      function handleEdit(record: Recordable, e: Event) {
        e?.stopPropagation();
        openDrawer(true, {
          record,
          type: ActionEnum.EDIT,
        });
      }

      // 弹出绑定角色页面
      function handleBindRole(record: Recordable, e: Event) {
        e?.stopPropagation();
        openModal(true, record);
      }

      // 弹出邀请用户框
      function handleInvitation(record: Recordable, e: Event) {
        e?.stopPropagation();
        openInvitationModal(true, record);
      }

      // 新增或编辑成功回调
      function handleSuccess() {
        reload();
      }

      async function batchDelete(ids: any[]) {
        await remove(ids);
        createMessage.success(t('common.tips.deleteSuccess'));
        handleSuccess();
      }

      // 点击单行删除
      function handleDelete(record: Recordable, e: Event) {
        e?.stopPropagation();
        if (record?.id) {
          batchDelete([record.id]);
        }
      }

      // 点击批量删除
      function handleBatchDelete() {
        const ids = getSelectRowKeys();
        if (!ids || ids.length <= 0) {
          createMessage.warning(t('common.tips.pleaseSelectTheData'));
          return;
        }
        createConfirm({
          iconType: 'warning',
          content: t('common.tips.confirmDelete'),
          onOk: async () => {
            try {
              await batchDelete(ids);
            } catch (e) {}
          },
        });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        registerModal,
        registerInvitationModal,
        handleView,
        handleAdd,
        handleCopy,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        handleBindRole,
        handleInvitation,
        RoleEnum,
      };
    },
  });
</script>
