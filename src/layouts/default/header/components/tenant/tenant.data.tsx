import { FormSchema } from '/@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'tenant',
    label: '租户',
    component: 'Input',
  },
  {
    field: 'companyId',
    label: '公司',
    component: 'Input',
  },
  {
    field: 'deptId',
    label: '部门',
    component: 'Input',
  },
];
