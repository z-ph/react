import { Steps, Button, Form, Input, Radio, Select, message } from "antd";
// import React from "react";
import { useState, useEffect } from "react";
import type { RadioChangeEvent } from "antd";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import { 
  usernameRules, 
  phoneRules, 
  idCardRules, 
  educationRules, 
  enrollTypeRules,
  remarkRules 
} from "../utils/validationRules";

export default function EnrollPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // 学历列表
  const educationList = ["大专", "本科", "研究生", "博士"];
  const SelectOptions = educationList.map((text) => {
    return {
      value: text,
      label: text,
    };
  });
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  // 报考类型
  const enrollTypeList = ["公务员", "教师资格证", "事业单位", "其他"];
  const RadioOptions = enrollTypeList.map((text, index) => {
    return {
      value: index,
      label: text,
    };
  });
  let info = {};
  if (localStorage.getItem("userInfoDraft")) {
    info = JSON.parse(localStorage.getItem("userInfoDraft") as string);
  } else if (localStorage.getItem("userInfo")) {
    info = JSON.parse(localStorage.getItem("userInfo") as string);
  } else {
    info = {};
  }
  useEffect(() => form.setFieldsValue(info));
  //保存草稿函数
  const saveDraft = () => {
    localStorage.setItem(
      "userInfoDraft",
      JSON.stringify(form.getFieldsValue())
    );
    messageApi.success("保存成功");
  };
  const onFinish = (value: unknown) => {
    console.log(value);
    localStorage.removeItem("userInfoDraft");
    localStorage.setItem("userInfo", JSON.stringify(value));
    // 导航到选择班型页面
    messageApi.success('提交成功')
    messageApi.open({
      type:"loading",
      content:"正在跳转...",
      duration:2.5
    }).then(()=>messageApi.success('bro,你的网络有点差'))
    navigate("/ClassSelect");
  };
  const underlineStyle: React.CSSProperties = {
    borderBottom: "0.5px solid #ebedf0",
  };
  return (
    <Main title={"填写信息"}>
      {contextHolder}
      <Steps
        type="inline"
        style={{ margin: "16px 0",width:"100%"}}
        progressDot
        direction="horizontal"
        labelPlacement="vertical"
        size="small"
        current={0}
      >
        <Steps.Step style={{flex:"1 0 0"}} title={<span className="text-[12px]">填写信息</span>} />
        <Steps.Step style={{flex:"1 0 0"}} title={<span className="text-[12px]">选择班型</span>} />
        <Steps.Step style={{flex:"1 0 0"}} title={<span className="text-[12px]">支付定金</span>} />
        <Steps.Step style={{flex:"1 0 0"}} title={<span className="text-[12px]">签署合同</span>} />
      </Steps>
      <Form
        onFinish={onFinish}
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
          <Radio.Group
            onChange={onChange}
            value={value}
            options={RadioOptions}
          ></Radio.Group>
        </Form.Item>
        <Form.Item label="备注" name="remark" rules={remarkRules}>
          <Input variant="borderless" placeholder="请输入备注(选填)" />
        </Form.Item>
        <div className="flex gap-4">
          <Button
            type="primary"
            style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
            ghost
            onClick={() => saveDraft()}
          >
            保存为草稿
          </Button>
          <Button
            type="primary"
            style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
            htmlType="submit"
          >
            提交
          </Button>
        </div>
      </Form>
    </Main>
  );
}