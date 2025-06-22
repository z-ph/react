import { Button } from "antd";
interface ButtonGroupProps {
  leftCallback: () => void;
  rightCallback: () => void;
  rightDisabled?: boolean;
  leftText: string;
  rightText: string;
  leftDisabled?: boolean;
}
export default function ButtonGroup(props: ButtonGroupProps) {
  const {
    leftCallback,
    rightCallback,
    rightDisabled = false,
    leftText,
    rightText,
    leftDisabled = false,
  } = props;
  return (
    <div className="flex gap-4 ">
      <Button
        type="primary"
        style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
        ghost
        onClick={() => leftCallback()}
        disabled={leftDisabled}
      >
        {leftText}
      </Button>
      <Button
        type="primary"
        style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
        disabled={rightDisabled}
        onClick={() => rightCallback?.()}
      >
        {rightText}
      </Button>
    </div>
  );
}
