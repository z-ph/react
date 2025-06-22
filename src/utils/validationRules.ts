import type { Rule } from "antd/es/form";

// 姓名验证规则
export const usernameRules: Rule[] = [
  { required: true, message: "请输入姓名" },
  { min: 2, message: "姓名至少2个字符" },
  { max: 20, message: "姓名最多20个字符" },
  {
    pattern: /^[\u4e00-\u9fa5a-zA-Z·]+$/,
    message: "姓名只能包含中文、英文字母和·",
  },
];

// 手机号验证规则
export const phoneRules: Rule[] = [
  { required: true, message: "请输入手机号" },
  { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
];

// 身份证号验证规则
export const idCardRules: Rule[] = [
  { required: true, message: "请输入身份证号" },
  {
    pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    message: "请输入正确的身份证号",
  },
  {
    validator: async (_, value) => {
      if (value) {
        // 验证身份证号的校验位
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const codes = "10X98765432";
        if (value.length === 18) {
          let sum = 0;
          for (let i = 0; i < 17; i++) {
            sum += parseInt(value[i]) * weights[i];
          }
          const checkCode = codes[sum % 11];
          if (checkCode !== value[17].toUpperCase()) {
            throw new Error("身份证号校验位错误");
          }
        }
      }
    },
  },
];

// 学历验证规则
export const educationRules: Rule[] = [
  { required: true, message: "请选择学历" },
];

// 报考类型验证规则
export const enrollTypeRules: Rule[] = [
  { required: true, message: "请选择报考类型" },
];

// 备注验证规则
export const remarkRules: Rule[] = [{ max: 200, message: "备注最多200个字符" }];

// 管理员账号验证规则
export const adminUsernameRules: Rule[] = [
  { required: true, message: "请输入账号" },
  { max: 20, message: "账号最多20个字符" },
  { pattern: /^[a-zA-Z0-9_]+$/, message: "账号只能包含字母、数字和下划线" },
];

// 管理员密码验证规则
export const adminPasswordRules: Rule[] = [
  { required: true, message: "请输入密码" },
];
