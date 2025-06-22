import Main from "../components/Main";
import InfoCard from "../components/InfoCard";
import { Button } from "antd";
const groupInfo = [
  {
    title: "群组名称",
    content: "2025考公群",
  },
  {
    title: "群组类型",
    content: "公务员备考班",
  },
  {
    title: "开课时间",
    content: "2025-09-01", // 开课时间
  },
  {
    title: "班主任",
    content: "张三",
  },
];
const laterSteps = [
  {
    title: "加入学习群",
    content: "扫码加入学习群",
  },
  {
    title: "完成剩余缴费",
    content: "开课前一周内完成剩余学费缴纳",
  },
  {
    title: "领学习资料",
    content: "按班主任通知领取教材和学习资料",
  },
];
import { init } from "../utils/data";
import { useNavigate } from "react-router-dom";
export default function GroupResultPage() {
  const [, userInfo] = init();
  groupInfo[1].content = userInfo.enrollType + "备考班";
  const navigate = useNavigate();
  return (
    <Main title="分组结果">
      <Header />
      <InfoCard title="群组信息" infoList={groupInfo}></InfoCard>
      <InfoCard title="扫码加入学习群" infoList={[]}>
        <div className="w-[100%] flex flex-col gap-[0.5rem]">
          <div className="img p-[1rem] text-center">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
            />
            <p>请使用微信扫描上方二维码加入学习群</p>
          </div>
          <Button type="primary">加入群聊</Button>
          <Button ghost type="primary">
            复制群号
          </Button>
        </div>
      </InfoCard>
      <InfoCard title="后续步骤" infoList={[]}>
        <div className="mt-[2rem]">
          {laterSteps.map((item, index) => (
            <div key={index} className="relative pl-[2rem]">
              <div
                style={{
                  borderRadius: "50%",
                  height: "1.5rem",
                  width: "1.5rem",
                  fontSize: "14px",
                  backgroundColor: "#1677FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  position: "absolute",
                  left: "0px",
                  top: "-14px",
                }}
              >
                {index}
              </div>
              <h2 className="my-[1rem]">{item.title}</h2>
              <p className="text-gray-600 my-[1rem]">{item.title}</p>
            </div>
          ))}
        </div>
      </InfoCard>
      <div className="flex gap-[1rem] justify-center items-center p-[32px]">
        <Button
          className="flex-1/2"
          style={{ height: "44px" }}
          onClick={() => navigate(-1)}
        >
          返回首页
        </Button>
        <Button
          className="flex-1/2"
          style={{ height: "44px" }}
          type="primary"
          onClick={() => navigate("/order")}
        >
          查看订单
        </Button>
      </div>
    </Main>
  );
}
function Header() {
  return (
    <div className="text-center">
      <h2>恭喜你</h2>
      <p className="text-gray-600">您已成功报名</p>
    </div>
  );
}
