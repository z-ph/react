import Main from "../components/Main";
import type React from 'react';
import { useNavigate } from "react-router-dom";
import { Steps, Button,Modal } from "antd";
import { MoneyCollectOutlined } from '@ant-design/icons';
import { init } from "../utils/data";
import { STATUS } from "../main";
import { removeLocalData } from "../utils/localApi";

export default function OrderPage(){
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [classInfo, userInfo,orderInfo] = init();
    if(!orderInfo){
        return (
            <Main title="订单">
                <div className="text-center mt-20">
                    <h2 className="text-xl font-bold mb-4">没有找到订单信息</h2>
                    <Button type="primary" onClick={() => navigate("/")}>返回首页</Button>
                </div>
            </Main>
        );
    }
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

    const infoList = [
      {
        //在payment页面中产生
        label: "订单编号",
        value: orderInfo.orderId,
      },
      {
        //在payment页面中产生
        label: "创建时间",
        value: orderInfo.createdAt,
      },
      {
        //在classInfo中获取
        label:'班级类型',
        value: classInfo.name ,
      },
      {
        //在userInfo中获取
        label: "学员姓名",
        value: userInfo.username,
      },
      {
        //在userInfo中获取
        label: "联系电话",
        value: userInfo.phone,
      },
      {
        //在classInfo中获取
        label: "订单金额",
        value: classInfo.price.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' }),
      },
      {
        label: "支付状态",
        value: orderInfo.statusText=== STATUS.定金待支付 ? "定金待支付" :'定金已支付',
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
      const handlePay = () => {
        navigate("/payment");
      
      }
      const handleSign = () => {
        navigate("/sign");
      }
      const handleCancel =async () => {
        // removeLocalData("orderInfo");
        // navigate("/");
        await modal.confirm({
          title: '确认取消订单',
          content: '您确定要取消此订单吗？',
          onOk: () => {
            removeLocalData("orderInfo");
            navigate("/");
          },
          onCancel() {},
        });
      };
      const stepMap = {
        [STATUS.订单创建]: 0,
        [STATUS.定金待支付]: 1,
        [STATUS.合同未签署]: 2,
        [STATUS.报名完成]: 3,
      };
    return (
      <Main title="订单">
        {contextHolder}
        <section style={section1}>
          <h2 className="font-bold mb-[1rem]">订单状态</h2>
          <Steps
            progressDot
            style={{ height: "152px", padding: "8px 16px" }}
            direction="vertical"
            size="small"
            current={stepMap[orderInfo.status]}
            items={[
              { description: <div style={underlineStyle}>订单已创建</div> },
              { description: <div style={underlineStyle}>定金待支付</div> },
              { description: <div style={underlineStyle}>合同待签署</div> },
              { description: <div>报名已完成</div> },
            ]}
          />
        </section>
        <section style={section2}>
          <h2 className="font-bold mb-[1rem]">订单详情</h2>
          {infoComponentList}
        </section>
        <section style={section3}>
          <Button 
            style={btnStyle} 
            onClick={()=>handleCancel()}
            disabled={orderInfo.status === STATUS.报名完成}
          >
            <MoneyCollectOutlined />
            取消订单
          </Button>
          <Button 
            type="primary" 
            style={btnStyle}
            onClick={() => {
              switch(orderInfo.status) {
                case STATUS.定金待支付:
                  handlePay();
                  break;
                case STATUS.合同未签署:
                  handleSign();
                  break;
                case STATUS.报名完成:
                  navigate("/");
            }}
          }
          >
            {orderInfo.status === STATUS.定金待支付 ? "去支付定金" : orderInfo.status === STATUS.合同未签署 ? "去签署合同" : "返回首页"}
          </Button>
        </section>
      </Main>
    );


  }