import React from "react";
import { Card, Layout, Button } from "antd";
import { useNavigate, type NavigateFunction } from "react-router-dom";
const { Header, Footer, Content } = Layout;
import {
  CustomerServiceOutlined,
  UserOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
interface HeaderCardProps {
  title: string;
  subTitle: string;
}
const 页脚内容 = [
  <p key={1}>联系电话：400-123-4567</p>,
  <p key={2}>地址：北京市海淀区中关村大街 1 号</p>,
  <p key={3}> © 2025 公职类考试培训中心</p>
]
  // card
  const headerCardStyle: React.CSSProperties = {
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  };
  const body: React.CSSProperties = {
    backgroundColor: "#1989FA",
    padding: "32px 16px",
    color: "#fff",
    marginBottom: "24px",
  };
function HeaderCard({ title, subTitle }: HeaderCardProps) {

  return (
    <Card variant="borderless" style={headerCardStyle} styles={{ body }}>
      <h1 className="text-[1.5rem]">{title}</h1>
      <p className="text-gray-200">{subTitle}</p>
    </Card>
  );
}


function ContentSection1({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[12px]" >
      {children}
    </div>
  );
}

function ContentSection2({
  sectionTitle,
  children,
}: {
  sectionTitle: string;
  children: ReactNode;
}) {

  return (
    <div  className="mb-[12px] mt-[24px] p-[16px] px-0">
      <h3 className="section-title">{sectionTitle}</h3>
      <div className="grid grid-cols-2 gap-[1rem]">{children}</div>
    </div>
  );
}
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#fff",
  paddingInline: "0px",
  height: "fit-content",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  paddingInline: "16px",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#fff",
  color: "#6b7280",
  lineHeight: "1.25rem",
  fontSize: "0.875rem",
};

const layoutStyle: React.CSSProperties = {
  position: "absolute",
  borderRadius: 0,
  width: "100%",
  height: "fit-content",
};

const cardStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#F9FAFB",
  lineHeight: "2rem",
  height: "fit-content",
  border: "none",
};
interface BtnContent {
  text: string;
  type: "primary" | "default" | "dashed" | "link" | "text";
  ghost: boolean;
  path: string;
}

const cardBody: React.CSSProperties = {
  padding: "12px",
};
const iconStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "1rem",
  color: "#1989FA",
};

const btnStyle: React.CSSProperties = {
  display: "block",
  margin: "0.75rem 0",
  width: "100%",
  height: "44px",
};

const btnContentList: BtnContent[] = [
  {
    text: "开始报名",
    type: "primary",
    ghost: false,
    path: "/enroll",
  },
  {
    text: "查看报名进度",
    type: "primary",
    ghost: true,
    path: "/order",
  },
  {
    text: "管理员入口",
    type: "default",
    ghost: false,
    path: "/manager",
  },
];
const contentSection1Data = [
  {
    icon: <UserOutlined style={iconStyle} />,
    title:'专业师资',
    content:'资深讲师团队，丰富教学经验'
  },
  {
    icon: <ReadOutlined style={iconStyle} />,
    title:'精品课程',
    content:'针对性教学，提高通过率'
  },
  {
    icon: <CustomerServiceOutlined style={iconStyle} />,
    title:'贴心服务',
    content:'全程跟踪辅导，答疑解惑'
  },
  {
    icon: <SafetyCertificateOutlined style={iconStyle} />,
    title:'高分保障',
    content:'包退班型，无忧备考'
  },
]
const 返回按钮 = (navigate:NavigateFunction) =>{
  return btnContentList.map((item, index) => (
    <Button
      key={index}
      style={btnStyle}
      type={item.type}
      ghost={item.ghost}
      onClick={() => navigate(item.path)}
    >
      {item.text}
    </Button>
  ));
}
const 返回优势卡片 = () => {
  return contentSection1Data.map((item) => (
    <Card key={item.title} style={cardStyle} styles={{ body: cardBody }}>
      {item.icon}
      <h3 className="font-medium text-gray-800 ">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.content}</p>
    </Card>
  ));
}
function HomePage(){
  const navigate = useNavigate();
  const 三个按钮 = 返回按钮(navigate);
  const 优势 = 返回优势卡片();
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <HeaderCard
            title={"公职类考试培训报名系统"}
            subTitle={"专业培训，助您成功"}
          />
        </Header>
        <Content style={contentStyle}>
          <ContentSection1>
            <h3 className="section-title">欢迎报考</h3>
            <p className="text-gray-600 mb-4">
              本系统提供公务员、事业单位、教师资格证等考试培训的在线报名服务。
              请点击下方按钮开始报名流程。
            </p>
            {三个按钮}
          </ContentSection1>
          <ContentSection2 sectionTitle="我们的优势">
            {优势}
          </ContentSection2>
        </Content>
        <Footer style={footerStyle}>{页脚内容}</Footer>
      </Layout>
    </>
  );
}

export default HomePage;