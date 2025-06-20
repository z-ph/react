import Main from '../components/Main';
import {InfoCard} from './PaymentPage';
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
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function SignPage() {
  const navigate = useNavigate();
    return (
      <Main title="签署合同">
        <InfoCard title="合同信息" infoList={infoList}></InfoCard>
        <InfoCard title="合同预览" infoList={[]}>
          <div data-v-c686172e="" className="bg-[#F9FAFB] p-[8px]" style={{borderRadius:"8px"}}>
            <h3
              data-v-c686172e=""
              className="text-center font-bold text-lg mb-4"
            >
              培训服务协议
            </h3>
            <p data-v-c686172e="" className="mb-2">
              甲方：Zhang Penghui（学员）
            </p>
            <p data-v-c686172e="" className="mb-4">
              乙方：公职类考试培训中心（培训机构）
            </p>
            <p data-v-c686172e="" className="mb-2 font-medium">
              一、服务内容
            </p>
            <p data-v-c686172e="" className="mb-4">
              乙方为甲方提供包退班培训服务，包括但不限于课程讲解、辅导答疑、模拟考试等内容。
            </p>
            <p data-v-c686172e="" className="mb-2 font-medium">
              二、费用及支付
            </p>
            <p data-v-c686172e="" className="mb-4">
              1. 培训费用总计：人民币5980元整。
            </p>
            <p data-v-c686172e="" className="mb-4">
              2. 甲方已支付定金：人民币1196元整。
            </p>
            <p className="mb-4" data-v-c686172e="">
              3. 剩余费用支付方式：开课前一周内支付完毕。
            </p>
            <p className="mb-2 font-medium" data-v-c686172e="">
              三、甲方权利与义务
            </p>
            <p className="mb-4" data-v-c686172e="">
              1. 甲方有权获得乙方提供的培训服务。
            </p>
            <p className="mb-4" data-v-c686172e="">
              2. 甲方应遵守乙方的课堂纪律和相关规定。
            </p>
            <p className="mb-2 font-medium" data-v-c686172e="">
              四、乙方权利与义务
            </p>
            <p className="mb-4" data-v-c686172e="">
              1. 乙方应按约定提供优质的培训服务。
            </p>
            <p className="mb-4" data-v-c686172e="">
              2. 乙方应保障培训质量，提供必要的学习资料。
            </p>
            <p className="mb-2 font-medium" data-v-c686172e="">
              五、退款条款
            </p>
            <p data-v-c686172e="" className="mb-4">
              {" "}
              包退班：若甲方参加考试未通过，乙方将全额退还培训费用。
              退款需提供准考证及成绩单原件。{" "}
            </p>
            <p data-v-c686172e="" className="mb-2 font-medium">
              六、其他条款
            </p>
            <p data-v-c686172e="" className="mb-4">
              1. 本协议自双方签字之日起生效。
            </p>
            <p data-v-c686172e="" className="mb-4">
              2. 本协议一式两份，甲乙双方各执一份。
            </p>
            <div data-v-c686172e="" className="flex justify-between mt-8">
              <div data-v-c686172e="">
                <p data-v-c686172e="" className="mb-2">
                  甲方签字：
                </p>
                <p data-v-c686172e="">日期：2025-06-20</p>
              </div>
              <div data-v-c686172e="">
                <p data-v-c686172e="" className="mb-2">
                  乙方签字：公职类考试培训中心
                </p>
                <p data-v-c686172e="">日期：2025-06-20</p>
              </div>
            </div>
          </div>
        </InfoCard>
        <div className="flex gap-[1rem] justify-center items-center p-[32px]">
          <Button
            className="flex-1/2"
            style={{ height: "44px" }}
            onClick={() => navigate(-1)}
          >
            暂不签署
          </Button>
          <Button
            className="flex-1/2"
            style={{ height: "44px" }}
            type="primary"
            onClick={() => navigate("/group")}
          >
            确认签署
          </Button>
        </div>
      </Main>
    );
}
