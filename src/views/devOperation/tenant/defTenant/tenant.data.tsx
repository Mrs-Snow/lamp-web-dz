import { Ref, unref, h } from 'vue';
import moment, { Moment } from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useGlobSetting } from '/@/hooks/setting';
import { ActionEnum, FileBizTypeEnum } from '/@/enums/commonEnum';
import { MultiTenantTypeEnum, TenantConnectTypeEnum, TenantStatusEnum } from '/@/enums/biz/tenant';
import { Tag, Badge, Switch } from 'ant-design-vue';
import { uploadApi } from '/@/api/lamp/file/upload';
import { RuleType, FormSchemaExt } from '/@/api/lamp/common/formValidateService';
import { check } from '/@/api/devOperation/tenant/tenant';
import { query } from '/@/api/devOperation/tenant/datasourceConfig';
import { useMessage } from '/@/hooks/web/useMessage';
import { updateState } from '/@/api/devOperation/tenant/tenant';
import { lazyList } from '/@/api/devOperation/system/defArea';

const { t } = useI18n();
const globSetting = useGlobSetting();

// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('devOperation.tenant.defTenant.code'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('devOperation.tenant.defTenant.name'),
    dataIndex: 'name',
  },
  {
    title: t('devOperation.tenant.defTenant.registerType'),
    dataIndex: 'registerType.desc',
    width: 100,
  },
  {
    title: t('devOperation.tenant.defTenant.state'),
    dataIndex: 'state',
    width: 80,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.state,
        checkedChildren: t('lamp.common.enable'),
        unCheckedChildren: t('lamp.common.disable'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const { createMessage } = useMessage();
          const newState = checked;
          updateState(record.id, newState)
            .then(() => {
              record.state = newState;
              createMessage.success(t(`common.tips.editSuccess`));
            })
            .catch(() => {
              createMessage.success(t(`common.tips.editFail`));
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('devOperation.tenant.defTenant.status'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      let status: 'success' | 'processing' | 'error' | 'default' | 'warning' = 'success';
      switch (record.status) {
        case TenantStatusEnum.NORMAL: // 正常
          status = 'success';
          break;
        case TenantStatusEnum.WAIT_INIT: //待初始化
          status = 'processing';
          break;
          break;
        case TenantStatusEnum.WAITING: // 待审核
          status = 'processing';
          break;
        case TenantStatusEnum.REFUSE: // 拒绝
          status = 'error';
          break;
        case TenantStatusEnum.DELETE: // 已删除
          status = 'warning';
          break;
        default:
          status = 'success';
          break;
      }
      return <Badge status={status} text={record.echoMap?.status} />;
    },
  },
  {
    title: t('devOperation.tenant.defTenant.expirationTime'),
    dataIndex: 'expirationTime',
    width: 180,
    customRender: ({ record }) => {
      // 永久有效 已过期， 还剩2天到期  xxxx
      if (record.expirationTime) {
        if (moment(record.expirationTime).isBefore(Date.now())) {
          return <Tag color="error">已过期</Tag>;
        } else if (moment(record.expirationTime).isBefore(moment().add(30, 'days'))) {
          const duration = moment.duration(moment(record.expirationTime).diff(Date.now()));
          if (duration.days() > 0) {
            return <Tag color="warning">{duration.days() + 1}天后到期</Tag>;
          } else {
            return <Tag color="warning">{duration.hours()}小时后到期</Tag>;
          }
        } else {
          return <Tag color="processing">{record.expirationTime}</Tag>;
        }
      } else {
        return <Tag color="success">永久有效</Tag>;
      }
    },
  },
  {
    title: t('lamp.common.createdTime'),
    dataIndex: 'createdTime',
    sorter: true,
    width: 180,
  },
];

// 列表页搜索表单字段
export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: t('devOperation.tenant.defTenant.code'),
    component: 'Input',
  },
  {
    field: 'name',
    label: t('devOperation.tenant.defTenant.name'),
    component: 'Input',
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createdTime'),
    component: 'RangePicker',
  },
];

// 新增、编辑、查看页面表单字段
export const editFormSchema = (type: Ref<ActionEnum>): FormSchema[] => {
  return [
    {
      field: 'divider-selects1',
      component: 'Divider',
      label: '基础信息',
    },
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'code',
      label: t('devOperation.tenant.defTenant.code'),
      component: 'Input',
      dynamicDisabled: (_) => {
        return unref(type) !== ActionEnum.ADD;
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'name',
      label: t('devOperation.tenant.defTenant.name'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'abbreviation',
      label: t('devOperation.tenant.defTenant.abbreviation'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'expirationTime',
      label: t('devOperation.tenant.defTenant.expirationTime'),
      component: 'DatePicker',
      colProps: {
        span: 12,
      },
      componentProps: {
        style: {
          width: '100%',
        },
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        disabledDate: (current: Moment) => {
          return current && current < moment().endOf('day');
        },
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
      },
    },

    {
      field: 'logos',
      label: t('devOperation.tenant.defTenant.logo'),
      component: 'Upload',
      componentProps: {
        api: uploadApi,
        uploadParams: {
          bizType: FileBizTypeEnum.DEF_TENANT_LOGO,
        },
        multiple: false,
        maxNumber: 1,
      },
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects2',
      component: 'Divider',
      label: '联系人信息',
    },
    {
      field: 'contactPerson',
      label: t('devOperation.tenant.defTenant.contactPerson'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'contactPhone',
      label: t('devOperation.tenant.defTenant.contactPhone'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'contactEmail',
      label: t('devOperation.tenant.defTenant.contactEmail'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'divider-selects3',
      component: 'Divider',
      label: '地区信息',
    },
    {
      field: 'area',
      label: '地区',
      component: 'ApiCascader',
      componentProps: {
        api: lazyList,
        asyncFetchParamKey: 'parentId',
        dataField: '',
        labelField: 'name',
        valueField: 'id',
        initFetchParams: {
          parentId: '0',
        },
        isLeaf: (record: Recordable) => {
          return !(record.treeGrade < 2);
        },
      },
    },
    {
      field: 'address',
      label: t('devOperation.tenant.defTenant.address'),
      component: 'Input',
    },
    {
      field: 'divider-selects4',
      component: 'Divider',
      label: '其他信息',
    },
    {
      field: 'creditCode',
      label: t('devOperation.tenant.defTenant.creditCode'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'duty',
      label: t('devOperation.tenant.defTenant.duty'),
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'describe',
      label: t('devOperation.tenant.defTenant.describe'),
      component: 'InputTextArea',
    },
  ];
};

// 额外的新增、编辑表单验证规则
export const customFormSchemaRules = (type: Ref<ActionEnum>): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'code',
      type: RuleType.append,
      rules: [
        {
          trigger: ['change', 'blur'],
          async validator(_, value) {
            if (unref(type) !== ActionEnum.ADD) {
              return Promise.resolve();
            }
            if (value) {
              const res = await check(value);
              if (res) {
                return Promise.reject('企业编码已经存在');
              } else {
                return Promise.resolve();
              }
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
    },
    {
      field: 'logos',
      rules: [
        {
          validator(_, value) {
            if (value) {
              if (value.length > 1) {
                return Promise.reject('只能上传一个文件');
              } else {
                return Promise.resolve();
              }
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
      type: RuleType.cover,
    },
  ];
};

// 额外的初始化链接表单 校验规则
export const customInitDataFormSchemaRules = (required: boolean): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'baseDatasourceId',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: ['change', 'blur'],
        },
      ],
      type: RuleType.cover,
    },
    {
      field: 'extendDatasourceId',
      rules: [
        {
          required: required,
          message: t('common.rules.require'),
          trigger: ['change', 'blur'],
        },
      ],
      type: RuleType.cover,
    },
  ];
};

// 初始化链接表单
export const initDataFormSchema = (onChange: Fn): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'name',
      label: t('devOperation.tenant.defTenant.name'),
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'connectType',
      label: t('devOperation.tenant.defTenant.connectType'),
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '本地',
            value: TenantConnectTypeEnum.SYSTEM,
          },
          {
            label: '远程',
            value: TenantConnectTypeEnum.CUSTOM,
            disabled: ![
              MultiTenantTypeEnum.DATASOURCE,
              MultiTenantTypeEnum.DATASOURCE_COLUMN,
            ].includes(globSetting.multiTenantType as MultiTenantTypeEnum),
          },
        ],
        onChange,
      },
      defaultValue: TenantConnectTypeEnum.SYSTEM,
    },
    {
      field: 'baseDatasourceId',
      label: '基础库',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.SYSTEM;
      },
    },
    {
      field: 'extendDatasourceId',
      label: '扩展库',
      component: 'ApiSelect',
      componentProps: {
        api: query,
        labelField: 'name',
        valueField: 'id',
      },
      dynamicDisabled: ({ values }) => {
        return values?.connectType === TenantConnectTypeEnum.SYSTEM;
      },
    },
  ];
};

// 初始化链接表单
export const linkFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      required: false,
      show: false,
    },
    {
      field: 'name',
      label: t('devOperation.tenant.defTenant.name'),
      component: 'Input',
      componentProps: {
        readonly: true,
      },
    },
  ];
};
