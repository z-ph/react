import './App.css'
import React from 'react';
import { Card,  Layout,Button } from 'antd';
import './content-section1.css'
const { Header, Footer,  Content } = Layout;
import { CustomerServiceOutlined, UserOutlined,ReadOutlined,SafetyCertificateOutlined } from "@ant-design/icons";
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
  paddingInline:'0px',
  height:'fit-content',
};

const contentStyle: React.CSSProperties = {
  // textAlign: 'center',
  minHeight: 120,
  // lineHeight: '16px',
  paddingInline:'16px',
  backgroundColor:'#fff'
};


const footerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#fff",
  color: "#6b7280",
  lineHeight:'1.25rem',
  fontSize:'0.875rem'
};

const layoutStyle:React.CSSProperties = {
  position:'absolute',
  borderRadius: 0,
  overflow: 'hidden',
  width:'100%',
  height:'fit-content'
};

// card
const headerCardStyle: React.CSSProperties = {
  width: "100%",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  // transform:'translateY(10px)'
};
interface HeaderCardProps {
  title: string;
  subTitle: string;
}
interface ContentProps {
  title: string;
  desc: string;
}
function HeaderCard({ title, subTitle }: HeaderCardProps) {
  const body: React.CSSProperties = {
    backgroundColor: "#1989FA",
    padding: "32px 16px",
    color: "#fff",
    marginBottom:'24px'
  };
  const h1Style: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "1.5rem",
    lineHeight: "2rem",
  };
  const pStyle: React.CSSProperties = {
    opacity:0.9,
    fontSize: "1rem",
    margin:'8px 0 16px 0px'
  };
  return (
    <Card variant="borderless" style={headerCardStyle} styles={{ body }}>
      <h1 style={h1Style}>{title}</h1>
      <p style={pStyle}>{subTitle}</p>
    </Card>
  );
}
function ContentSection1({title,desc}:ContentProps){
  return(
    <div>
      <h2 className='section-title'>{title}</h2>
      <p className='text-gray-600 mb-4'>{desc}</p>
    </div>
  )
}
function ContentSection2(){
  const btnStyle: React.CSSProperties = {
    display:'block',
    margin: "0.75rem 0",
    width:'100%',
    height:'44px'
  };
  const btnContentList = [
    "开始报名",
    "查询订单状态",
    "管理员入口",
  ];
  const sectionStyle: React.CSSProperties = {
    marginBottom:'12px'
  }
  return (
    <div style={sectionStyle}>
      <Button type="primary" style={btnStyle}>
        {btnContentList[0]}
      </Button>
      <Button type="primary" ghost style={btnStyle}>
        {btnContentList[1]}
      </Button>
      <Button style={btnStyle}>
        {btnContentList[2]}
      </Button>
    </div>
  );
}

function ContentSection3() {

  const sectionStyle: React.CSSProperties = {
    marginBottom: "12px",
    marginTop:'24px',
    padding:'16px',
    paddingInline:0
  };
  const cardSetStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "1rem",
  };
  const cardStyle: React.CSSProperties = {
    textAlign: "center",
    backgroundColor: "#F9FAFB",
    lineHeight:"2rem",
    height:"fit-content",
    border:'none'
  };
  const cardBody: React.CSSProperties = {
    padding: "12px",
  };
  const iconStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#1989FA",
  };

  return (
    <div style={sectionStyle}>
      <h3 style={{ fontWeight: 700 }}>我们的优势</h3>
      <div className="card-set" style={cardSetStyle}>
        <Card style={cardStyle} styles={{ body: cardBody }}>
          <UserOutlined style={iconStyle}  />
          <p style={{fontSize:'18px'}}>专业师资</p>
          <p style={{opacity:0.9,fontSize:"14px",margin:"1.5rem 0 0 0"}}>资深讲师团队，丰富教学经验</p>
        </Card>
        <Card style={cardStyle} styles={{ body: cardBody }}>
          <ReadOutlined style={iconStyle} />
          <p style={{fontSize:'18px'}}>精品课程</p>
          <p style={{opacity:0.9,fontSize:"14px",margin:"1.5rem 0 0 0"}}>针对性教学，提高通过率</p>
        </Card>
        <Card style={cardStyle} styles={{ body: cardBody }}>
          <CustomerServiceOutlined style={iconStyle} />
          <p style={{fontSize:'18px'}}>贴心服务</p>
          <p style={{opacity:0.9,fontSize:"14px",margin:"1.5rem 0 0 0"}}>全程跟踪辅导，答疑解惑</p>
        </Card>
        <Card style={cardStyle} styles={{ body: cardBody }}>
          <SafetyCertificateOutlined style={iconStyle} />
          <p style={{fontSize:'18px'}}>高分保障</p>
          <p style={{opacity:0.9,fontSize:"14px",margin:"1.5rem 0 0 0"}}>包退班型，无忧备考</p>
        </Card>
      </div>
    </div>
  );
}
function App() {

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
          <ContentSection1
            title={"欢迎报考"}
            desc={
              "本系统提供公务员、事业单位、教师资格证等考试培训的在线报名服务。 请点击下方按钮开始报名流程。"
            }
          />
          <ContentSection2 />
          <ContentSection3 />
        </Content>
        <Footer style={footerStyle}>
          <p>联系电话：400-123-4567</p>
          <p>地址：北京市海淀区中关村大街 1 号</p>
          <p> © 2025 公职类考试培训中心</p>
        </Footer>
      </Layout>
    </>
  );
}

export default App
