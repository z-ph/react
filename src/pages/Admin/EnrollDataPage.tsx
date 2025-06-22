import { createPortal } from "react-dom";
import Main from "../../components/Main";
import { BottomNav } from "./AdminHome";

export default function EnrollDataPage() {
  return (
    <Main title="报名数据" isAdmin={true}>
      {createPortal(<BottomNav></BottomNav>, document.body as HTMLElement)}
    </Main>
  );
}
