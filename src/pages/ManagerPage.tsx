import Main from "../components/Main";
import { Form,Input,Button} from "antd";
import {UserOutlined}from "@ant-design/icons";
import type React from "react";
export default function ManagerPage({changePage}: {changePage: (page: string) => void}){
    const underlineStyle: React.CSSProperties = {
      borderBottom: "0.5px solid #ebedf0",
    };
    return (
      <Main back={() => changePage("Home")} title="管理员登录">
        <header className="gap-[1.5rem] flex flex-col justify-center items-center my-[32px]">
          <UserOutlined style={{ fontSize: "48px", color: "#1989FA" }} />
          <h2 className="text-[20px] font-bold">公职类考试培训报名系统</h2>
          <p className="text-[16px] font-normal text-gray-500">管理后台</p>
        </header>

        <Form
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
            rules={[{ required: true }]}
          >
            <Input variant="borderless" placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            style={underlineStyle}
            label="密码"
            name="password"
            rules={[{ required: true }]}
          >
            <Input variant="borderless" placeholder="请输入密码" />
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