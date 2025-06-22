import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";

export default function GroupConfigPage() {
  return (
    <Main title="订单管理" isAdmin={true}>
      {createPortal(<BottomNav></BottomNav>, document.body as HTMLElement)}
    </Main>
  );
}
