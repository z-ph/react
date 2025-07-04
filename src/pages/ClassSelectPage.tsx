import EnrollSteps from "../components/EnrollSteps";
import Main from "../components/Main";
import React from "react";
import cardcss from "../assets/css/class-select-page.module.css";
import ButtonGroup from "../components/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { MoneyCollectTwoTone, CheckOutlined } from "@ant-design/icons";
import { setLocalData } from "../utils/localApi";
import { STATUS } from "../main";

interface ClassTypeCardProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: (id: number) => void;
  id: number;
}
export function ClassTypeCard({
  children,
  active,
  id,
  onClick: notify,
}: ClassTypeCardProps) {
  function handleClick(id: number) {
    if (active) {
      return;
    }
    notify(id);
  }
  const selected = active ? cardcss.classCardSelected : "";
  return (
    <>
      <div
        className={`${cardcss.classCard} ${selected}`}
        style={{ marginBottom: "16px", position: "relative" }}
        onClick={() => handleClick(id)}
      >
        {children}
      </div>
    </>
  );
}
const classTypeList = [
  {
    id: 1,
    name: "包退班",
    desc: "承诺未通过考试全额退款",
    remainAmount: 10,
    price: 1000,
    features: ["专业教材", "1对1辅导"],
  },
  {
    id: 2,
    name: "非包退班",
    desc: "性价比之选，无退款承诺",
    remainAmount: 10,
    price: 1000,
    features: ["专业教材", "1对1辅导"],
  },
];
classTypeList.forEach((item) => {
  item.toString = function () {
    return JSON.stringify(item);
  };
});
const CLASS_ID = "classId";
export default function ClassSelectPage() {
  let classId: string | number | null = localStorage.getItem(CLASS_ID);
  if (classId !== null) {
    classId = parseInt(classId);
  }
  const [activeClassId, setActiveClassId] = React.useState<number | null>(
    classId,
  );

  function handleClassTypeClick(id: number) {
    setActiveClassId(id);
  }
  const date = new Date();
  const navigate = useNavigate();
  function handleFinish() {
    // 设置本地存储的订单信息
    setLocalData("orderInfo", {
      orderId: "order_" + Date.now(),
      classId: activeClassId,
      className: classTypeList.find((item) => item.id === activeClassId)?.name,
      price: classTypeList.find((item) => item.id === activeClassId)?.price,
      status: STATUS.定金待支付,
      statusText: "定金待支付",
      createdAt: date.toLocaleString(),
      expireAt: new Date(
        date.getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toLocaleString(),
    });
    if (activeClassId === null) {
      return;
    }
    localStorage.setItem(CLASS_ID, activeClassId.toString());
    localStorage.setItem(
      "classInfo",
      classTypeList.find((item) => item.id === activeClassId)?.toString() || "",
    );
    navigate("/payment");
  }
  return (
    <Main title="选择班型">
      <EnrollSteps currrentStep={1} />
      <h2 className="mx-[0.5rem] mb-0 font-medium">请选择班型</h2>
      {classTypeList.map((item) => (
        <ClassTypeCard
          key={item.id}
          id={item.id}
          active={item.id === activeClassId}
          onClick={() => handleClassTypeClick(item.id)}
        >
          <h3 className="font-medium">{item.name}</h3>
          <div className="text-[#1989fa] font-bold text-xl my-1">
            <MoneyCollectTwoTone />
            {item.price}
          </div>
          <div className="text-gray-600">{item.desc}</div>
          <div className="bg-[#07C160] inline-block text-[#fff] text-[0.5rem] rounded-[1rem] px-[0.25rem] absolute top-[1rem] right-[1rem]">
            剩余名额:{item.remainAmount}
          </div>
          {item.features.map((feature) => (
            <p key={feature}>
              <CheckOutlined style={{ color: "#52c41a" }} />{" "}
              <span className="text-gray-600">{feature}</span>
            </p>
          ))}
        </ClassTypeCard>
      ))}
      <div className="px-[32px] pb-[16px]">
        <ButtonGroup
          leftText="上一步"
          rightText="确定"
          leftCallback={() => navigate("/enroll")}
          rightCallback={handleFinish}
          rightDisabled={activeClassId === null}
        />
      </div>
    </Main>
  );
}
