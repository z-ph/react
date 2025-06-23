import { Input, Select, Button, Table, Tag, Pagination } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";
import { useState } from "react";
export type StatusType = keyof typeof statusMap;
export const { Option } = Select;

const statusMap = {
  已分群: <Tag color="green">已分群</Tag>,
  已签约: <Tag color="green">已签约</Tag>,
  已支付: <Tag color="blue">已支付</Tag>,
  待支付: <Tag color="orange">待支付</Tag>,
};

const dataSource = [
  {
    key: "1",
    orderId: "order_001",
    name: "张三",
    class: "包退班",
    amount: "¥5980",
    status: "已分群",
    time: "2025-05-27 09:23:45",
  },
  {
    key: "2",
    orderId: "order_002",
    name: "李四",
    class: "包退班",
    amount: "¥5980",
    status: "已签约",
    time: "2025-05-27 08:15:22",
  },
  {
    key: "3",
    orderId: "order_003",
    name: "王五",
    class: "不包退班",
    amount: "¥3980",
    status: "已支付",
    time: "2025-05-26 16:42:10",
  },
  {
    key: "4",
    orderId: "order_004",
    name: "赵六",
    class: "不包退班",
    amount: "¥3980",
    status: "待支付",
    time: "2025-05-26 14:30:55",
  },
];
const columns = [
  { title: "订单号", dataIndex: "orderId", key: "orderId" },
  { title: "学员姓名", dataIndex: "name", key: "name" },
  { title: "班型", dataIndex: "class", key: "class" },
  { title: "金额", dataIndex: "amount", key: "amount" },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => statusMap[status as StatusType] || status,
  },
  { title: "创建时间", dataIndex: "time", key: "time" },
];

export default function OrderManagePage() {
  const [page, setPage] = useState(1);

  return (
    <Main title="订单管理" isAdmin={true}>
      <div className="max-w-3xl mx-auto mt-4 mb-[46px] bg-white rounded-xl p-6 shadow-sm">
        {/* 搜索和筛选 */}
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
            style={{
              position: "absolute",
              width: "fit-content",
              top: "-8px",
              right: "0",
              scale: "0.8",
            }}
            icon={<DownloadOutlined />}
            className="w-full flex items-center justify-center"
            size="large"
          >
            导出数据
          </Button>
          <div className="font-bold mb-2">订单列表</div>
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
        {/* 订单统计 */}
        <div className="mt-8">
          <div className="font-bold mb-2">订单统计</div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">4</div>
              <div className="text-gray-500 text-xs">总订单数</div>
            </div>
            <div>
              <div className="text-xl font-bold">0</div>
              <div className="text-gray-500 text-xs">今日新增</div>
            </div>
            <div>
              <div className="text-xl font-bold">¥19920</div>
              <div className="text-gray-500 text-xs">总金额</div>
            </div>
            <div>
              <div className="text-xl font-bold">25%</div>
              <div className="text-gray-500 text-xs">完成率</div>
            </div>
          </div>
        </div>
      </div>
      {createPortal(<BottomNav />, document.body)}
    </Main>
  );
}
