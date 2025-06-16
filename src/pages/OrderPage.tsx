
import Main from "../components/Main";
export default function OrderPage({changePage}: {changePage: (page: string) => void}){

    return (
        <Main back={()=>changePage("Home")} title="订单"></Main>
    )



}