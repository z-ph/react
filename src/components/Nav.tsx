import React from "react";
import {LeftOutlined } from "@ant-design/icons";
function Nav({ title, changePage }: { title: string, changePage: (page: string) => void }) {
    const style: React.CSSProperties = {
      borderBottom: "0.5px solid #ebedf0",
      alignItems:'center',
      userSelect: "none",
    }; 
  return (
    <nav style={style} className="relative flex text-[#000] w-[100%] h-[46px] ">
      <div
        onClick={() => changePage("Home")}
        style={{
          cursor: "pointer",
        }}
        className="absolute left-[1rem] text-[#1989fa]"
      >
        <LeftOutlined />
        {"返回"}
      </div>
      <div className="text-[16px] m-0 mx-auto">{title}</div>
    </nav>
  );
}
export default Nav;