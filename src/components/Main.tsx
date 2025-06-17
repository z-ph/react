import React from "react";
import Nav from "./Nav";
interface MainProps {
  children?: React.ReactNode | string;
  title: string;
}
export default function Main({children,title}: MainProps) {
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
      <Nav title={title}  />
      {children}
    </main>
  );
}
