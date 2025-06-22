import { useLocation, useNavigate } from "react-router-dom";
import InfoCard from "../../components/InfoCard";
import Main from "../../components/Main";
import {
  ApartmentOutlined,
  FileTextOutlined,
  GroupOutlined,
  HomeOutlined,
  MonitorOutlined,
  RightOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { List, Button } from "antd";
import { createPortal } from "react-dom";
export default function AdminHome() {
  const NavBar = BottomNav();
  return (
    <Main title="后台管理" isAdmin={true}>
      {createPortal(NavBar, document.body as HTMLElement)}
      <div className="p-[1rem] mb-[45px]">
        <WelcomeCard></WelcomeCard>
        <OverAllData></OverAllData>
        <InfoCard title="快捷操作">
          <div className="grid grid-cols-2 gap-[1rem]">
            <Button type="primary" style={{ height: "44px" }} ghost>
              查看数据
            </Button>
            <Button type="primary" style={{ height: "44px" }} ghost>
              查看数据
            </Button>
            <Button type="primary" style={{ height: "44px" }} ghost>
              查看数据
            </Button>
            <Button type="primary" style={{ height: "44px" }} ghost>
              查看数据
            </Button>
          </div>
        </InfoCard>
        <InfoCard title="">
          <RecentEnrollList />
        </InfoCard>
        <InfoCard title="系统公告">
          <NoticeList></NoticeList>
        </InfoCard>
      </div>
    </Main>
  );
}
function WelcomeCard() {
  return (
    <div className="p-[1rem] relative">
      <h3 className="font-light">欢迎回来，管理员</h3>
      <p className="text-gray-600 text-[14px]">
        今天是{new Date().toLocaleDateString()}
      </p>
      <GroupOutlined
        className="text-3xl right-0 top-0 bottom-0  absolute"
        style={{ color: "#1890ff" }}
      />
    </div>
  );
}
function OverAllData() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <DataCard></DataCard>
      <DataCard></DataCard>
      <DataCard></DataCard>
      <DataCard></DataCard>
    </div>
  );
}
function DataCard() {
  return (
    <div
      className="p-[1rem]  rounded-lg bg-white gap-[8px]  flex flex-col"
      style={{ boxShadow: "0 2px 8px #0000000d" }}
    >
      <h3 className="m-0">123</h3>
      <p className=" m-0 text-gray-600 text-[14px]">报名人数</p>
    </div>
  );
}
function RecentEnrollList() {
  // 假数据
  const data = [
    {
      name: "张三",
      type: "公务员",
      phone: "138****1234",
      date: "2025-05-27",
      time: "09:23:45",
    },
    {
      name: "李四",
      type: "事业单位",
      phone: "139****5678",
      date: "2025-05-27",
      time: "08:15:22",
    },
    {
      name: "王五",
      type: "教师资格证",
      phone: "137****9012",
      date: "2025-05-26",
      time: "16:42:10",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>最近报名</h3>
        <Button type="primary" size="small" ghost>
          查看全部
        </Button>
      </div>
      <List
        style={{ padding: "0 2rem" }}
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        renderItem={(item) => (
          <List.Item
            style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}
          >
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-gray-500 text-xs">
                {item.type} | {item.phone}
              </div>
            </div>
            <div
              className="text-right text-xs text-gray-500"
              style={{ minWidth: 90 }}
            >
              <div>{item.date}</div>
              <div>{item.time}</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

function NoticeList() {
  const data = [
    {
      title: "系统更新通知",
      desc: "系统将于2025年6月1日进行版本更新，请做好准备",
    },
    {
      title: "新增班型通知",
      desc: "系统已新增「事业单位精英班」，请及时更新宣传资料",
    },
  ];

  return (
    <div className="px-[2rem]">
      <List
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
            actions={[
              <RightOutlined key="arrow" style={{ color: "#bfbfbf" }} />,
            ]}
          >
            <List.Item.Meta
              title={<span className="font-medium">{item.title}</span>}
              description={
                <span className="text-gray-500 text-[14px]">{item.desc}</span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export function BottomNav() {
  const navs = [
    { key: "/adminHome", label: "首页", icon: <HomeOutlined /> },
    { key: "/enrollData", label: "报名数据", icon: <UsergroupAddOutlined /> },
    { key: "/groupConfig", label: "群组配置", icon: <ApartmentOutlined /> },
    { key: "/orderManage", label: "订单管理", icon: <FileTextOutlined /> },
    { key: "/logMonitor", label: "日志监控", icon: <MonitorOutlined /> },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 45,
        background: "#fff",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      {navs.map((item) => (
        <div
          key={item.key}
          onClick={() => navigate(item.key)}
          style={{
            color: location.pathname === item.key ? "#1890ff" : "#888",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 18 }}>{item.icon}</div>
          <div className="text-[12px]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
