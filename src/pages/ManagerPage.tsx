import Main from "../components/Main";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type React from "react";
import {
  adminUsernameRules,
  adminPasswordRules,
} from "../utils/validationRules";
import { adminLogin } from "../utils/localApi";
import { useNavigate } from "react-router-dom";
interface resData {
  status: string;
}
interface res {
  data: resData;
}

export default function ManagerPage() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const underlineStyle: React.CSSProperties = {
    borderBottom: "0.5px solid #ebedf0",
  };
  const onFinish = async (values: object) => {
    // 这里可以添加登录逻辑
    const res = (await adminLogin(values)) as res;
    console.log(res);
    if (res.data.status === "ok") {
      console.log("登录成功", res);
      // 登录成功后可以进行页面跳转或其他操作
      await messageApi.open({
        type: "success",
        content: "登录成功",
        duration: 2.5,
      });
      navigate("/adminHome");
    } else {
      console.error("登录失败");
      await messageApi.error({
        content: "用户名或密码错误",
        duration: 2.5,
      });
    }
  };
  return (
    <Main title="管理员登录">
      {contextHolder}
      <header className="gap-[1.5rem] flex flex-col justify-center items-center my-[32px]">
        <UserOutlined style={{ fontSize: "48px", color: "#1989FA" }} />
        <h2 className="text-[20px] font-bold">公职类考试培训报名系统</h2>
        <p className="text-[16px] font-normal text-gray-500">管理后台</p>
      </header>

      <Form
        onFinish={onFinish}
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ width: "100%", margin: "0 auto", paddingInline: "32px" }}
      >
        <Form.Item
          style={underlineStyle}
          label="账号"
          name="username"
          rules={adminUsernameRules}
        >
          <Input variant="borderless" placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          style={underlineStyle}
          label="密码"
          name="password"
          rules={adminPasswordRules}
        >
          <Input.Password variant="borderless" placeholder="请输入密码" />
        </Form.Item>
        <Button
          style={{ width: "100%", height: "44px", borderRadius: "22px" }}
          type="primary"
          htmlType="submit"
        >
          登录
        </Button>
      </Form>
    </Main>
  );
}
