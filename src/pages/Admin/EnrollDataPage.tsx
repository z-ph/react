import { Input, Select, Button, Table, Tag, Pagination } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";
import { useState } from "react";

const { Option } = Select;

const statusList = ["已分群", "已签约", "已支付", "待支付"] as const;
type StatusType = (typeof statusList)[number];

const statusMap: Record<StatusType, React.ReactNode> = {
  已分群: <Tag color="green">已分群</Tag>,
  已签约: <Tag color="green">已签约</Tag>,
  已支付: <Tag color="blue">已支付</Tag>,
  待支付: <Tag color="orange">待支付</Tag>,
};

const dataSource = [
  {
    key: "1",
    name: "张三",
    phone: "13812341234",
    type: "公务员",
    class: "包退班",
    status: "已分群",
    time: "2025-05-27 09:23:45",
  },
  {
    key: "2",
    name: "李四",
    phone: "13987654321",
    type: "事业单位",
    class: "包退班",
    status: "已签约",
    time: "2025-05-27 08:15:22",
  },
  {
    key: "3",
    name: "王五",
    phone: "13712345678",
    type: "教师资格证",
    class: "不包退班",
    status: "已支付",
    time: "2025-05-26 16:42:10",
  },
  {
    key: "4",
    name: "赵六",
    phone: "13698765432",
    type: "公务员",
    class: "不包退班",
    status: "待支付",
    time: "2025-05-26 14:30:55",
  },
];

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "手机号", dataIndex: "phone", key: "phone" },
  { title: "报考类型", dataIndex: "type", key: "type" },
  { title: "班型", dataIndex: "class", key: "class" },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: StatusType) => statusMap[status] || status,
  },
  { title: "报名时间", dataIndex: "time", key: "time" },
];

export default function EnrollDataPage() {
  const [page, setPage] = useState(1);

  return (
    <Main title="报名数据" isAdmin={true}>
      <div className="max-w-3xl mx-auto mt-4 mb-[46px] bg-white rounded-xl p-6 shadow-sm">
        {/* 搜索和筛选区 */}
        <div className="flex flex-col gap-3 mb-4">
          <Input.Search
            placeholder="搜索姓名/手机号"
            allowClear
            className="w-full"
            style={{ height: 40 }}
          />
          <div className="flex justify-around border-gray-100 border">
            <Select
              defaultValue="全部状态"
              variant="borderless"
              className="w-fit"
              size="large"
            >
              <Option value="全部状态">全部状态</Option>
              <Option value="已分群">已分群</Option>
              <Option value="已签约">已签约</Option>
              <Option value="已支付">已支付</Option>
              <Option value="待支付">待支付</Option>
            </Select>
            <Select
              defaultValue="全部类型"
              variant="borderless"
              className="w-fit"
              size="large"
            >
              <Option value="全部类型">全部类型</Option>
              <Option value="公务员">公务员</Option>
              <Option value="事业单位">事业单位</Option>
              <Option value="教师资格证">教师资格证</Option>
            </Select>
            <Select
              defaultValue="全部时间"
              variant="borderless"
              className="w-fit"
              size="large"
            >
              <Option value="全部时间">全部时间</Option>
              <Option value="近一周">近一周</Option>
              <Option value="近一月">近一月</Option>
            </Select>
          </div>
        </div>
        {/* 表格 */}
        <div className="relative mt-[2rem]">
          <Button
          style={{position:'absolute',width:'fit-content',top:'-8px',right:'0',scale:'0.8'}}
            icon={<DownloadOutlined />}
            className="w-full flex items-center justify-center"
            size="large"
          >
            导出数据
          </Button>
          <div className="font-bold mb-2">报名列表</div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="middle"
            bordered={false}
            rowKey="key"
          />
          <div className="flex justify-center mt-4">
            <Pagination
              current={page}
              total={4}
              pageSize={4}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      {createPortal(<BottomNav />, document.body)}
    </Main>
  );
}
