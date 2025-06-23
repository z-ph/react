import { Button, Tag, Tooltip, Card, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";

const groupList = [
  {
    id: 1,
    name: "2025 公务员考试备考群",
    type: "公务员备考班",
    leader: "王老师",
    startDate: "2025-06-15",
    count: 32,
    max: 50,
    status: "可加入",
  },
  {
    id: 2,
    name: "事业单位考试精英班",
    type: "事业单位备考班",
    leader: "李老师",
    startDate: "2025-07-01",
    count: 30,
    max: 30,
    status: "已满",
  },
  {
    id: 3,
    name: "教师资格证考试群",
    type: "教师资格证备考班",
    leader: "张老师",
    startDate: "2025-08-10",
    count: 25,
    max: 40,
    status: "可加入",
  },
];

const statusTag = (status: string) =>
  status === "可加入" ? (
    <Tag color="green">{status}</Tag>
  ) : (
    <Tag color="red">{status}</Tag>
  );

export default function GroupConfigPage() {
  return (
    <Main title="群组配置" isAdmin={true}>
      <div className="max-w-3xl mx-auto mt-4 mb-[46px] bg-white rounded-xl p-6 shadow-sm pb-[46px]">
        {/* 顶部操作 */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg">群组列表</div>
          <Button type="primary" icon={<PlusOutlined />}>
            新建群组
          </Button>
        </div>
        {/* 群组卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {groupList.map((g) => (
            <Card
              key={g.id}
              title={
                <div className="flex items-center justify-between">
                  <span className="font-medium">{g.name}</span>
                  <Space>
                    <Tooltip title="编辑">
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="删除">
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                      />
                    </Tooltip>
                  </Space>
                </div>
              }
              className="mb-2"
              styles={{body:{
                paddingBottom: 12
              }}}
            >
              <div className="text-sm mb-1">群组类型：{g.type}</div>
              <div className="text-sm mb-1">班主任：{g.leader}</div>
              <div className="text-sm mb-1">开课时间：{g.startDate}</div>
              <div className="text-sm mb-2 flex items-center gap-2">
                人数：{g.count}/{g.max} {statusTag(g.status)}
              </div>
              <Space>
                <Button size="small">查看成员</Button>
                <Button size="small">查看二维码</Button>
              </Space>
            </Card>
          ))}
        </div>
        {/* 群组统计 */}
        <div className="mt-8">
          <div className="font-bold mb-2">群组统计</div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">3</div>
              <div className="text-gray-500 text-xs">群组数</div>
            </div>
            <div>
              <div className="text-xl font-bold">87</div>
              <div className="text-gray-500 text-xs">成员数</div>
            </div>
            <div>
              <div className="text-xl font-bold">73%</div>
              <div className="text-gray-500 text-xs">满员率</div>
            </div>
            <div>
              <div className="text-xl font-bold">1</div>
              <div className="text-gray-500 text-xs">可加入群</div>
            </div>
          </div>
        </div>
      </div>
      {createPortal(<BottomNav />, document.body)}
    </Main>
  );
}
