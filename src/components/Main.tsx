import React from "react";
import Nav from "./Nav";
export default function Main({children,title,back}:{children?:React.ReactNode|string,title:string,back:()=>void}) {
  const mainStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "750px",
    minHeight: "100vh",
    background: "#fff",
    padding: 0,
    boxSizing: "border-box",
  };

  return (
    <main style={mainStyle}>
      <Nav title={title} changePage={back}  />
      {children}
    </main>
  );
}
