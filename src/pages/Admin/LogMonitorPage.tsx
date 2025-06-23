import { Button, Tag, Progress, DatePicker } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";
import { useState } from "react";

const logTypes = [
  { label: "全部", value: "all" },
  { label: "错误", value: "error" },
  { label: "警告", value: "warn" },
  { label: "信息", value: "info" },
  { label: "调试", value: "debug" },
];

const statusList = [
  { label: "CPU 使用率", value: 45, color: "#1677ff", unit: "%" },
  { label: "内存使用率", value: 62, color: "#1677ff", unit: "%" },
  { label: "磁盘使用率", value: 38, color: "#1677ff", unit: "%" },
  { label: "平均响应时间", value: 120, color: "#1677ff", unit: "ms" },
];

const logs = [
  {
    type: "error",
    tag: <Tag color="red">错误</Tag>,
    title: "数据库连接失败：Connection refused",
    desc: "Database",
    time: "2025-05-27 11:42:15",
  },
  {
    type: "warn",
    tag: <Tag color="orange">警告</Tag>,
    title: "用户尝试访问未授权页面：/admin/settings",
    desc: "",
    time: "2025-05-27 10:35:22",
  },
];

export default function LogMonitorPage() {
  const [activeType, setActiveType] = useState("all");

  return (
    <Main title="日志监控" isAdmin={true}>
      <div className="max-w-3xl mx-auto mt-4 mb-[46px] bg-white rounded-xl p-6 shadow-sm">
        {/* 日志筛选 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="font-bold mb-2">日志筛选</div>
            <div className="flex gap-2 mb-2">
              {logTypes.map((item) => (
                <Button
                  key={item.value}
                  type={activeType === item.value ? "primary" : "default"}
                  size="small"
                  onClick={() => setActiveType(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="text-xs text-gray-500">日期范围 全部时间</div>
          </div>
          <div className="flex gap-2 items-center">
            <DatePicker.RangePicker size="small" />
            <Button icon={<ReloadOutlined />} size="small">
              刷新
            </Button>
          </div>
        </div>
        {/* 系统状态 */}
        <div className="mb-6">
          <div className="font-bold mb-2">系统状态</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusList.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-lg p-4 flex flex-col items-center"
              >
                <div
                  className="text-xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                  {item.unit}
                </div>
                <div className="text-xs text-gray-500 mb-2">{item.label}</div>
                <Progress
                  percent={item.unit === "%" ? item.value : 100}
                  showInfo={false}
                  strokeColor={item.color}
                  trailColor="#e5e7eb"
                  size="small"
                  style={{ width: "90%" }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 系统日志 */}
        <div>
          <div className="font-bold mb-2">系统日志</div>
          <div>
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between py-3 border-b last:border-b-0"
              >
                <div>
                  {log.tag}
                  <span className="ml-2 font-medium">{log.title}</span>
                  {log.desc && (
                    <div className="text-xs text-gray-400 mt-1">{log.desc}</div>
                  )}
                </div>
                <div className="text-xs text-gray-400 text-right min-w-[120px]">
                  {log.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {createPortal(<BottomNav />, document.body)}
    </Main>
  );
}
