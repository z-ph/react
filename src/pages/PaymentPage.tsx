import { WechatFilled, CheckCircleFilled } from "@ant-design/icons";
import Main from "../components/Main"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import EnrollSteps from "../components/EnrollSteps"
import type React from "react";
export interface OrderInfo {
    title:string;
    content:string;
}
export interface tips{
    title:string;
    content:string[];
  }
  const OrderInfo = [
      {
          title:"订单编号",
          content:""
      },
      {
          title:"班型名称",
          content:"包退班"
      },
      {
          title:"定金金额",
          content:"￥1000.00"
      },
      {
          title:"有效期",
          content:""
      }
  ]
  import { init } from "../utils/data";
  const tips = {
    title: "支付须知",
    content: [
      "定金支付成功后，将进入合同签署环节",
      "定金支付后不予退还，请确认后再支付",
      "支付问题请联系客服：400-123-4567",
    ],
  };
  import { setLocalData } from "../utils/localApi";
  import { STATUS } from "../main";
export default function PaymentPage() {
    const navigate = useNavigate()
    const [classInfoObj] = init()
    const date = new Date();
    OrderInfo[1].content = classInfoObj.name;
    OrderInfo[2].content ='￥'+ (classInfoObj.price/5).toString();
    OrderInfo[3].content = date.toLocaleDateString() + '至' + new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    // 设置本地存储的订单信息
    setLocalData("orderInfo", {
      orderId: "order_" + Date.now(),
      classId: classInfoObj.id,
      className: classInfoObj.name,
      price: classInfoObj.price, 
      status: STATUS.定金待支付,
      statusText: "定金待支付",
      createdAt: date.toLocaleString(),
    });
    const handlePay = () => {
      setLocalData("orderInfo", {
        ...OrderInfo,
        status: STATUS.合同未签署,
        statusText: "合同未签署",
      });
      navigate("/sign");
    };
    return (
      <Main title="支付定金">
        <EnrollSteps currrentStep={2} />
        <OrderInfoCard title="订单信息" infoList={OrderInfo} />
        <PayWay />

        <Tip tips={tips} />
        <div className="flex gap-[1rem] justify-center items-center p-[32px]">
          <Button
            className="flex-1/2"
            style={{ height: "44px" }}
            onClick={() => navigate('/classselect')}
          >
            上一步
          </Button>
          <Button
            className="flex-1/2"
            style={{ height: "44px" }}
            type="primary"
            onClick={()=>handlePay()}
          >
            支付定金
          </Button>
        </div>
      </Main>
    );
}
export function InfoCard(props: { title: string; infoList: OrderInfo[],children?:React.ReactElement|React.ReactElement[] }) {
  return (
    <div className="p-4 ">
      <h3 className="text-xl font-bold">{props.title}</h3>
      {props.infoList.map((item, index) => (
        <div key={index} className="flex justify-between my-[1rem]">
          <div className="title text-gray-600">{item.title}:</div>
          <div className="content">{item.content}</div>
        </div>
      ))}
      {props.children}
    </div>
  );
}
function OrderInfoCard({title,infoList}:{title:string,infoList:OrderInfo[]}){
    return (
      <InfoCard title={title} infoList={infoList}></InfoCard>
    );
}
function PayWay(){
    return (
      <InfoCard infoList={[]} title='支付方式'>
        <div className="p-4 flex justify-between">
          <div>
            <WechatFilled
              style={{
                color: "#07C160",
                paddingInline: "5px",
                fontSize: "1.5rem",
              }}
            />
            微信支付
          </div>
          <div>
            <CheckCircleFilled
              style={{ color: "#1989FA", fontSize: "1.5rem" }}
            />
          </div>
        </div>
      </InfoCard>
    );
}
function Tip({tips}:{tips:tips}){

    return (
      <InfoCard title={tips.title} infoList={[]}>
        {tips.content.map((item, index) => (
          <div key={index} className="flex justify-between my-[1rem]">
            <div className="title text-gray-600">
              {index + 1}. {item}
            </div>
          </div>
        ))}
      </InfoCard>
    );
}