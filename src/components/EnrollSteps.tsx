import { Steps } from "antd";

export default function EnrollSteps({
  currrentStep,
}: {
  currrentStep: number;
}) {
  return (
    <Steps
      type="inline"
      style={{
        margin: "16px 0",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
      progressDot
      direction="horizontal"
      labelPlacement="horizontal"
      current={currrentStep}
    >
      <Steps.Step
        style={{ flex: "1 0 0", display: "flex", flexDirection: "row" }}
        title={<span className="text-[12px]">填写信息</span>}
      />
      <Steps.Step
        style={{ flex: "1 0 0" }}
        title={<span className="text-[12px]">选择班型</span>}
      />
      <Steps.Step
        style={{ flex: "1 0 0" }}
        title={<span className="text-[12px]">支付定金</span>}
      />
      <Steps.Step
        style={{ flex: "1 0 0" }}
        title={<span className="text-[12px]">签署合同</span>}
      />
    </Steps>
  );
}
