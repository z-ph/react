import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface NavProps {
  rightHidden?: boolean;
  title: string;
  backPath?:string;
}
function Nav(props: NavProps) {
  const navigate = useNavigate();
  const { title, rightHidden = true,backPath  } = props;
  const style: React.CSSProperties = {
    borderBottom: "0.5px solid #ebedf0",
    alignItems: "center",
    userSelect: "none",
  };

  return (
    <nav style={style} className="relative flex text-[#000] w-[100%] h-[46px] ">
      <div
        onClick={()=>backPath ? navigate(backPath) : navigate(-1)}
        className="absolute left-[1rem] text-[#1989fa] cursor-pointer"
      >
        <LeftOutlined />
        返回
      </div>
      <div
        style={{
          display: rightHidden ? "none" : "block",
        }}
        onClick={() => navigate("/")}
        className="absolute right-[1rem] text-[#1989fa] cursor-pointer"
      >
        退出
      </div>
      <div className="text-[16px] m-0 mx-auto">{title}</div>
    </nav>
  );
}

export default Nav;
