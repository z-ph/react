import { Steps, Form, Input, Radio, Select, message } from "antd";
// import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import {
  usernameRules,
  phoneRules,
  idCardRules,
  educationRules,
  enrollTypeRules,
  remarkRules,
} from "../utils/validationRules";
import ButtonGroup from "../components/ButtonGroup";
import { getLocalData, setLocalData, removeLocalData } from "../utils/localApi";
import type { userInfo } from "../utils/data";
import type { MessageInstance } from "antd/es/message/interface";
import type { FormInstance } from "antd";
import type { NavigateFunction } from "react-router-dom";
const underlineStyle: React.CSSProperties = {
  borderBottom: "0.5px solid #ebedf0",
};
// 学历列表
const educationList = ["大专", "本科", "研究生", "博士"];
const SelectOptions = educationList.map((text) => {
  return {
    value: text,
    label: text,
  };
});

// 报考类型
const enrollTypeList = ["公务员", "教师资格证", "事业单位", "其他"];
const RadioOptions = enrollTypeList.map((text) => {
  return {
    value: text,
    label: text,
  };
});
//保存草稿函数
const saveDraft = (messageApi: MessageInstance, form: FormInstance) => {
  setLocalData("userInfoDraft", form.getFieldsValue());
  // 提示保存成功
  messageApi.success("保存成功");
};
const onFinish = (
  value: object,
  messageApi: MessageInstance,
  navigate: NavigateFunction,
) => {
  // 清除草稿数据
  removeLocalData("userInfoDraft");
  // 将表单数据存储到本地
  setLocalData("userInfo", value);
  // 提示提交成功
  messageApi.success("提交成功");
  messageApi
    .open({
      type: "loading",
      content: "正在跳转...",
      duration: 2.5,
    })
    .then(() => messageApi.success("bro,你的网络有点差"));
  // 导航到选择班型页面
  navigate("/classselect");
};
export default function EnrollPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  //每次渲染时获取草稿数据，如果有草稿数据则设置表单值
  const info =
    getLocalData("userInfoDraft") ||
    getLocalData("userInfo") ||
    ({} as userInfo);
  // 如果有草稿数据，设置表单值
  useEffect(() => form.setFieldsValue(info));
  return (
    <Main title={"填写信息"} backPath="/">
      {contextHolder}
      <Steps
        type="inline"
        style={{ margin: "16px 0", width: "100%" }}
        progressDot
        direction="horizontal"
        labelPlacement="vertical"
        size="small"
        current={0}
      >
        <Steps.Step
          style={{ flex: "1 0 0" }}
          title={<span className="text-[12px]">填写信息</span>}
        />
        <Steps.Step
          style={{ flex: "1 0 0" }}
          title={<span className="text-[12px]">选择班型</span>}
        />
        <Steps.Step
          style={{ flex: "1 0 0" }}
          title={<span className="text-[12px]">支付定金</span>}
        />
        <Steps.Step
          style={{ flex: "1 0 0" }}
          title={<span className="text-[12px]">签署合同</span>}
        />
      </Steps>
      <Form
        onFinish={(value) => onFinish(value, messageApi, navigate)}
        form={form}
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ width: "100%", margin: "0 auto", padding: "32px" }}
      >
        <Form.Item
          style={underlineStyle}
          label="姓名"
          name="username"
          rules={usernameRules}
        >
          <Input variant="borderless" placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          style={underlineStyle}
          label="手机号"
          name="phone"
          rules={phoneRules}
        >
          <Input variant="borderless" placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          style={underlineStyle}
          label="身份证号"
          name="IDcard"
          rules={idCardRules}
        >
          <Input variant="borderless" placeholder="请输入身份证号" />
        </Form.Item>
        <Form.Item
          style={underlineStyle}
          label="学历"
          name="education"
          rules={educationRules}
        >
          <Select options={SelectOptions} variant="borderless"></Select>
        </Form.Item>
        <Form.Item
          style={underlineStyle}
          label="报考类型"
          name="enrollType"
          rules={enrollTypeRules}
        >
          <Radio.Group options={RadioOptions}></Radio.Group>
        </Form.Item>
        <Form.Item label="备注" name="remark" rules={remarkRules}>
          <Input variant="borderless" placeholder="请输入备注(选填)" />
        </Form.Item>
        <ButtonGroup
          leftCallback={() => saveDraft(messageApi, form)}
          rightCallback={() => form.submit()}
          leftText="保存草稿"
          rightText="提交"
          rightDisabled={false}
        />
      </Form>
    </Main>
  );
}
