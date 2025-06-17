import Main from "../components/Main";
import type React from 'react';

import { Steps,Button } from "antd";
import {MoneyCollectOutlined} from '@ant-design/icons';


export default function OrderPage({changePage}: {changePage: (page: string) => void}){
    const underlineStyle :React.CSSProperties={
        borderBottom: "1px solid var(--border-color)",
        paddingBottom:'12px'
    }
    const section1:React.CSSProperties={
        padding:"16px",
        marginBottom:"12px"
    }
    const section2:React.CSSProperties={
        ...section1,
        marginTop:"16px"
    }
    const currentOrder = {
      orderId: "order_1750064528153",
      userId: "user_1750055116024",
      classId: "class_1",
      userName: "Zhang Penghui",
      userPhone: "15215215225",
      userIdCard: "115226333748583991",
      examType: "other",
      className: "包退班",
      price: 5980,
      status: "pending",
      statusText: "待支付",
      createdAt: "2025-06-16 09:02:08",
    };
    const infoList = [
      {
        label: "订单编号",
        value: currentOrder.orderId,
      },
      {
        label: "创建时间",
        value: currentOrder.createdAt,
      },
      {
        label:'班级类型',
        value: currentOrder.className,
      },
      {
        label: "学员姓名",
        value: currentOrder.userName,
      },
      {
        label: "联系电话",
        value: currentOrder.userPhone,
      },
      {
        label: "订单金额",
        value: currentOrder.price,
      },
      {
        label: "支付状态",
        value: currentOrder.statusText,
      },
      ];
      const infoStyle :React.CSSProperties={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"20px"
      }
      const infoComponentList = infoList.map((item) => (
        <div key={item.label} style={infoStyle}>
          <span>{item.label}</span>
          <span>{item.value}</span>
        </div>
      ));

      const btnStyle :React.CSSProperties={
        flexGrow:1,
        flexBasis:0,
        height:"44px"
      }
      const section3 :React.CSSProperties={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"1rem",
        // marginBottom:"20px"
        ...section2
        }
    return (
      <Main back={() => changePage("Home")} title="订单">
        <section style={section1}>
          <h2 className="font-bold mb-[1rem]">订单状态</h2>
          <Steps
            progressDot
            style={{ height: "152px", padding: "8px 16px" }}
            direction="vertical"
            size="small"
            current={1}
            items={[
              { description: <div style={underlineStyle}>订单已创建</div> },
              { description: <div style={underlineStyle}>订单处理中</div> },
              { description: <div style={underlineStyle}>订单已发货</div> },
              { description: <div>订单已完成</div> },
            ]}
          />
        </section>
        <section style={section2}>
          <h2 className="font-bold mb-[1rem]">订单详情</h2>
          {infoComponentList}
        </section>
        <section style={section3}>
          <Button style={btnStyle}>
            <MoneyCollectOutlined />
            取消订单
          </Button>
          <Button type="primary" style={btnStyle}>
            去支付
          </Button>
        </section>
      </Main>
    );



}