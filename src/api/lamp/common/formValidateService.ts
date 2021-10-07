import moment from 'moment';
import { RuleObject } from 'ant-design-vue/lib/form/interface';
import type { ConstraintInfo, FieldValidatorDesc } from './model/formValidateModel';
import type { Rule, FormSchema } from '/@/components/Form/src/types/form';
import { ServicePrefixEnum } from '/@/enums/commonEnum';
import { defHttp } from '/@/utils/http/axios';
import type { AxiosRequestConfig } from 'axios';

export enum RuleType {
  append,
  cover,
}
export interface FormSchemaExt extends FormSchema {
  // 类型 append：追加  cover：覆盖
  type?: RuleType;
}

/**
 * 时间与当前时间进行比较， 不存在的情况默认都是比较成功 返回true
 * @param dateStr 待比较日期
 * @param timeType 时间类型
 * @param compareType 比较类型
 */
function compareDate2Now(dateStr: string, timeType = 'YYYY-MM-DD HH:mm:ss', compareType = 'Past') {
  if (dateStr) {
    const now = moment();
    let nowStr = '';
    if (timeType === 'Date') {
      nowStr = now.format('YYYY-MM-DD');
    } else if (timeType === 'DateTime') {
      nowStr = now.format('YYYY-MM-DD HH:mm:ss');
    } else if (timeType === 'Time') {
      nowStr = now.format('HH:mm:ss');
    }
    if (nowStr) {
      if (compareType === 'Past') {
        return nowStr > dateStr;
      } else if (compareType === 'Future') {
        return nowStr < dateStr;
      }
    }
  }
  return true;
}

function getMessage(attrs: Recordable) {
  if (attrs && attrs.message) {
    const reg = /({([a-zA-Z0-9]*)})/g;
    let result;
    let message = '';
    while ((result = reg.exec(attrs.message)) !== null) {
      console.log(result);
      const place = result[0];
      const field = result[2];
      message = attrs.message.replaceAll(place, attrs[field]);
    }

    return message;
  }
  return '输入不符合规则';
}

/**
 * 解析字段的校验规则
 * @param fieldRules 字段约束
 * @param constraints 约束
 * @param fieldType 字段类型
 */
function decodeRules(fieldRules: Rule[], constraints: ConstraintInfo[], fieldType: string) {
  constraints &&
    constraints.forEach(({ type, attrs }) => {
      switch (type) {
        case 'RegEx':
          fieldRules.push({
            type: 'regexp',
            pattern: new RegExp(attrs.regexp),
            message: attrs.message,
          });
          break;
        case 'Max':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (parseInt(value) > attrs.value) {
                return Promise.reject(attrs.message);
              } else {
                return Promise.resolve();
              }
            },
            message: getMessage(attrs),
          });
          break;
        case 'Min':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (parseInt(value) < attrs.value) {
                return Promise.reject(attrs.message);
              } else {
                return Promise.resolve();
              }
            },
            message: getMessage(attrs),
          });
          break;
        case 'DecimalMax':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (parseFloat(value) > attrs.value) {
                return Promise.reject(attrs.message);
              } else {
                return Promise.resolve();
              }
            },
            message: attrs.message,
          });
          break;
        case 'DecimalMin':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (parseFloat(value) < attrs.value) {
                return Promise.reject(attrs.message);
              } else {
                return Promise.resolve();
              }
            },
            message: attrs.message,
          });
          break;
        case 'Null':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (value.length !== 0) {
                return Promise.reject(attrs.message);
              } else {
                return Promise.resolve();
              }
            },
            message: attrs.message,
          });
          break;
        case 'NotNull':
          fieldRules.push({
            required: true,
            whitespace: true,
            message: attrs.message,
          });
          break;
        case 'Range':
          fieldRules.push({
            max: attrs.max,
            min: attrs.min,
            message: getMessage(attrs),
          });
          break;
        case 'AssertTrue':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (value === 'true' || value === true) {
                return Promise.resolve();
              } else {
                return Promise.reject(attrs.message);
              }
            },
            message: attrs.message,
          });
          break;
        case 'AssertFalse':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (value === 'false' || value === false) {
                return Promise.resolve();
              } else {
                return Promise.reject(attrs.message);
              }
            },
            message: attrs.message,
          });
          break;
        case 'Past':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (compareDate2Now(value, fieldType, 'Past')) {
                return Promise.resolve();
              } else {
                return Promise.reject(attrs.message);
              }
            },
            message: attrs.message,
          });
          break;
        case 'Future':
          fieldRules.push({
            type: 'method',
            validator(_rule: RuleObject, value, _) {
              if (compareDate2Now(value, fieldType, 'Future')) {
                return Promise.resolve();
              } else {
                return Promise.reject(attrs.message);
              }
            },
            message: attrs.message,
          });
          break;
        default:
          break;
      }
    });
}

/**
 * 解析所有字段名
 *
 * @param data 后端返回的值
 */
function transformationRules(data: FieldValidatorDesc[]): Partial<FormSchema>[] {
  const validateRules: FormSchema[] = [];
  data.forEach(({ field, fieldType, constraints }) => {
    const rules: Rule[] = [];
    if (fieldType === 'Float') {
      rules.push({
        type: 'number',
        message: `${field}必须是数字`,
      });
    } else if (fieldType === 'Array') {
      rules.push({
        type: 'array',
        message: `${field}必须是数组`,
      });
    } else if (fieldType === 'Boolean') {
      rules.push({
        type: 'boolean',
        message: `${field}必须是布尔类型`,
      });
    } else if (fieldType === 'Date') {
      rules.push({
        type: 'boolean',
        message: `${field}必须是日期类型`,
      });
    }
    decodeRules(rules, constraints, fieldType);

    validateRules.push({ field: field, rules: rules } as FormSchema);
  });
  return validateRules;
}

function enhanceCustomRules(
  formSchemaRules: Partial<FormSchema>[],
  customFormSchemaRules?: Partial<FormSchemaExt>[],
): Partial<FormSchema>[] {
  if (!customFormSchemaRules) {
    return formSchemaRules;
  }
  if (!formSchemaRules) {
    return [];
  }
  const map = new Map<string, Rule[]>();
  formSchemaRules.forEach(({ field = '', rules = [] }) => {
    map.set(field, rules);
  });

  customFormSchemaRules.forEach(({ field = '', rules = [], type = RuleType.cover }) => {
    if (map.has(field)) {
      if (type === RuleType.cover) {
        map.set(field, rules);
      } else {
        const oldRules = map.get(field) || [];
        const newRules = [...oldRules[Symbol.iterator](), ...rules[Symbol.iterator]()];
        map.set(field, newRules);
      }
    } else {
      map.set(field, rules);
    }
  });

  const newRules: FormSchema[] = [];
  for (const [field, rules] of map) {
    newRules.push({ field, rules } as FormSchema);
  }
  return newRules;
}

/**
 * 从后端获取某个接口基于 Hibernate Validator 注解生成的参数校验规则
 * @param Api url和method
 * @param customRules 自定义规则
 */
export const getValidateRules = async (
  Api: AxiosRequestConfig,
  customRules?: Partial<FormSchemaExt>[],
): Promise<Partial<FormSchema>[]> => {
  const formValidateApi = { url: '', method: Api.method };
  for (const sp in ServicePrefixEnum) {
    // @ts-ignore
    if (Api.url.startsWith(ServicePrefixEnum[sp])) {
      // @ts-ignore
      formValidateApi.url = Api.url.replace(
        ServicePrefixEnum[sp],
        `${ServicePrefixEnum[sp]}/form/validator`,
      );
    }
  }
  try {
    const res = await defHttp.request<FieldValidatorDesc[]>({ ...formValidateApi });
    if (res) {
      const formSchemaRules = transformationRules(res);

      return enhanceCustomRules(formSchemaRules, customRules);
    }
  } catch (error) {}
  return [];
};
