import moment from 'moment';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchemaExt, RuleType } from '/@/api/lamp/common/formValidateService';

const { t } = useI18n();
// 列表页字段
export const columns: BasicColumn[] = [
  {
    title: t('lamp.gateway.blockList.ip'),
    dataIndex: 'ip',
    // width: 180,
  },
  {
    title: t('lamp.gateway.blockList.requestUri'),
    dataIndex: 'requestUri',
    // width: 180,
  },
  {
    title: t('lamp.gateway.blockList.requestMethod'),
    dataIndex: 'requestMethod',
    // width: 180,
  },
  {
    title: t('lamp.gateway.blockList.limitStart'),
    dataIndex: 'limitStart',
    // width: 180,
  },
  {
    title: t('lamp.gateway.blockList.limitEnd'),
    dataIndex: 'limitEnd',
    // width: 180,
  },
  {
    title: t('lamp.gateway.blockList.state'),
    dataIndex: 'state',
    width: 80,
    format: (text) => {
      return text ? t('lamp.common.enable') : t('lamp.common.disable');
    },
  },
  {
    title: t('lamp.common.createTime'),
    dataIndex: 'createTime',
    sorter: true,
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'requestUri',
    label: t('lamp.gateway.blockList.requestUri'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'ip',
    label: t('lamp.gateway.blockList.ip'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createTimeRange',
    label: t('lamp.common.createTime'),
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

// 编辑页字段
export const editFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    label: t('lamp.gateway.blockList.ip'),
    field: 'ip',
    component: 'Input',
  },
  {
    label: t('lamp.gateway.blockList.requestUri'),
    field: 'requestUri',
    component: 'Input',
  },
  {
    label: t('lamp.gateway.blockList.requestMethod'),
    field: 'requestMethod',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'ALL',
          value: 'ALL',
          key: 'ALL',
        },
        {
          label: 'GET',
          value: 'GET',
          key: 'GET',
        },
        {
          label: 'POST',
          value: 'POST',
          key: 'POST',
        },
        {
          label: 'PUT',
          value: 'PUT',
          key: 'PUT',
        },
        {
          label: 'DELETE',
          value: 'DELETE',
          key: 'DELETE',
        },
      ],
    },
  },
  {
    label: t('lamp.gateway.blockList.limitStart'),
    field: 'limitStart',
    component: 'TimePicker',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        style: { width: '200px' },
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss',
        secondStep: 10,
        minuteStep: 5,
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
        disabledHours: () => {
          if (!formModel.limitEnd) {
            return false;
          }

          const timeArr = formModel.limitEnd.split(':');
          const hours = [] as number[];
          for (let i = 23; i > parseInt(timeArr[0]); i--) {
            hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (selectedHour: number) => {
          if (!formModel.limitEnd) {
            return false;
          }
          const timeArr = formModel.limitEnd.split(':');
          if (selectedHour === parseInt(timeArr[0])) {
            const minutes = [] as number[];
            for (let i = 55; i > parseInt(timeArr[1]); i -= 5) {
              minutes.push(i);
            }
            return minutes;
          }
          return false;
        },
        disabledSeconds: (selectedHour: number, selectedMinute: number) => {
          if (!formModel.limitEnd) {
            return false;
          }
          const timeArr = formModel.limitEnd.split(':');
          if (selectedHour === parseInt(timeArr[0]) && selectedMinute === parseInt(timeArr[1])) {
            const seconds = [] as number[];
            for (let i = 50; i > parseInt(timeArr[2]); i = i - 10) {
              seconds.push(i);
            }
            return seconds;
          }
          return false;
        },
      };
    },
  },
  {
    label: t('lamp.gateway.blockList.limitEnd'),
    field: 'limitEnd',
    component: 'TimePicker',
    colProps: {
      span: 12,
    },
    componentProps: ({ formModel }) => {
      return {
        style: { width: '200px' },
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss',
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
        secondStep: 10,
        minuteStep: 5,
        disabledHours: () => {
          if (!formModel.limitStart) {
            return false;
          }
          const timeArr = formModel.limitStart.split(':');
          const hours = [] as number[];
          for (let i = 0; i < parseInt(timeArr[0]); i++) {
            hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (selectedHour: number) => {
          if (!formModel.limitStart) {
            return false;
          }
          const timeArr = formModel.limitStart.split(':');
          if (selectedHour === parseInt(timeArr[0])) {
            const minutes = [] as number[];
            for (let i = 0; i < parseInt(timeArr[1]); i += 5) {
              minutes.push(i);
            }
            return minutes;
          }
          return false;
        },
        disabledSeconds: (selectedHour: number, selectedMinute: number) => {
          if (!formModel.limitStart) {
            return false;
          }
          const timeArr = formModel.limitStart.split(':');
          if (selectedHour === parseInt(timeArr[0]) && selectedMinute === parseInt(timeArr[1])) {
            const seconds = [] as number[];
            for (let i = 0; i < parseInt(timeArr[2]); i = i + 10) {
              seconds.push(i);
            }
            return seconds;
          }
          return false;
        },
      };
    },
  },
  {
    label: t('lamp.gateway.blockList.state'),
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: t('lamp.common.enable'), value: true },
        { label: t('lamp.common.disable'), value: false },
      ],
    },
    defaultValue: true,
  },
];

// 前端自定义表单验证规则
export const customFormSchemaRules = (_): Partial<FormSchemaExt>[] => {
  return [
    {
      field: 'requestUri',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
    {
      field: 'requestMethod',
      type: RuleType.append,
      rules: [{ trigger: 'blur', required: true }],
    },
  ];
};
