import { Button } from "antd";
interface ButtonGroupProps {
  leftCallback: () => void;
  rightDisabled: boolean;
  leftText: string;
  rightText: string;
}
export default function ButtonGroup({leftCallback,rightDisabled,leftText,rightText}: ButtonGroupProps) {
  return (
    <div className="flex gap-4 ">
      <Button
        type="primary"
        style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
        ghost
        onClick={() => leftCallback()}
      >
        {leftText}
      </Button>
      <Button
        type="primary"
        style={{ height: "44px", flexGrow: 1, flexBasis: 0 }}
        htmlType="submit"
        disabled={rightDisabled}
      >
        {rightText}
      </Button>
    </div>
  );
}