import Main from "../components/Main";
import InfoCard from "../components/InfoCard";
const infoList = [
  {
    title: "合同编号",
    content: "202109010001",
  },
  {
    title: "学员名称",
    content: "张三",
  },
  {
    title: "班型名称",
    content: "包退班",
  },
  {
    title: "合同金额",
    content: "￥1000.00",
  },
];
import { init, type orderInfo } from "../utils/data";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { setLocalData, getLocalData } from "../utils/localApi";
import { STATUS } from "../main";
export default function SignPage() {
  //每次重新渲染时都重新获取用户信息和班级信息
  const [classInfo, userInfo] = init();
  infoList[1].content = userInfo.username;
  infoList[2].content = classInfo.name;
  infoList[3].content = "￥" + classInfo.price.toString();
  const navigate = useNavigate();

  const contract = {
    title: [
      {
        tag: "h3",
        content: "培训服务协议",
      },
      {
        tag: "p",
        content: "甲方：Zhang Penghui（学员）",
      },
      {
        tag: "p",
        content: "乙方：公职类考试培训中心（培训机构）",
      },
    ],
    content: [
      {
        subtitle: "一、服务内容",
        text: [
          "乙方为甲方提供包退班培训服务，包括但不限于课程讲解、辅导答疑、模拟考试等内容。",
        ],
      },
      {
        subtitle: "二、费用及支付",
        text: [
          "1. 培训费用总计：人民币5980元整。",
          "2. 甲方已支付定金：人民币1196元整。",
          "3. 剩余费用支付方式：开课前一周内支付完毕。",
        ],
      },
      {
        subtitle: "三、甲方权利与义务",
        text: [
          "1. 甲方有权获得乙方提供的培训服务。",
          "2. 甲方应遵守乙方的课堂纪律和相关规定。",
        ],
      },
      {
        subtitle: "四、乙方权利与义务",
        text: [
          "1. 乙方应按约定提供优质的培训服务。",
          "2. 乙方应保障培训质量，提供必要的学习资料。",
        ],
      },
      {
        subtitle: "五、退款条款",
        text: [
          "包退班：若甲方参加考试未通过，乙方将全额退还培训费用。退款需提供准考证及成绩单原件。",
        ],
      },
      {
        subtitle: "六、其他条款",
        text: [
          "1. 本协议自甲方支付定金之日起生效。",
          "2. 本协议一式两份，甲乙双方各执一份，具有同等法律效力。",
        ],
      },
    ],
  };
  const contractContentList = contract.content.map((item) => (
    <div key={item.subtitle} className="mb-4">
      <p className="mb-2 font-medium">{item.subtitle}</p>
      {item.text.map((text, index) => (
        <p key={index} className="mb-4">
          {text}
        </p>
      ))}
    </div>
  ));

  return (
    <Main title="签署合同">
      <InfoCard title="合同信息" infoList={infoList}></InfoCard>
      <InfoCard title="合同预览" infoList={[]}>
        <div
          data-v-c686172e=""
          className="bg-[#F9FAFB] p-[8px]"
          style={{ borderRadius: "8px" }}
        >
          <h3 data-v-c686172e="" className="text-center font-bold text-lg mb-4">
            培训服务协议
          </h3>
          <p data-v-c686172e="" className="mb-2">
            甲方：{userInfo.username}（学员）
          </p>
          <p data-v-c686172e="" className="mb-4">
            乙方：公职类考试培训中心（培训机构）
          </p>
          {contractContentList}
          <div data-v-c686172e="" className="flex justify-between mt-8">
            <div data-v-c686172e="">
              <p data-v-c686172e="" className="mb-2">
                甲方签字：
              </p>
              <p data-v-c686172e="">日期：{new Date().toLocaleDateString()}</p>
            </div>
            <div data-v-c686172e="">
              <p data-v-c686172e="" className="mb-2">
                乙方签字：公职类考试培训中心
              </p>
              <p data-v-c686172e="">日期：{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </InfoCard>
      <div className="flex gap-[1rem] justify-center items-center p-[32px]">
        <Button
          className="flex-1/2"
          style={{ height: "44px" }}
          onClick={() => navigate("/order")}
        >
          暂不签署
        </Button>
        <Button
          className="flex-1/2"
          style={{ height: "44px" }}
          type="primary"
          onClick={() => {
            setLocalData("orderInfo", {
              ...((getLocalData("orderInfo") as object) || {}),
              status: STATUS.报名完成,
              statusText: "报名完成",
            });
            //加入历史订单列表
            const historyOrders =
              (getLocalData("historyOrders") as Array<orderInfo>) || [];
            historyOrders.push({
              ...((getLocalData("orderInfo") as object) || {}),
              status: STATUS.报名完成,
              statusText: "报名完成",
            } as orderInfo);
            navigate("/group");
          }}
        >
          确认签署
        </Button>
      </div>
    </Main>
  );
}
