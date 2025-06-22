import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";

export default function LogMonitorPage() {
  return (
    <Main title="日志监控" isAdmin={true}>
      {createPortal(<BottomNav></BottomNav>, document.body as HTMLElement)}
    </Main>
  );
}
