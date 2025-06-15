export default function AboutPage({changePage}: {changePage: (page: string) => void}){
    return (
        <h1 onClick={() => changePage("home")} style={{color:"gray"}}>About Page</h1>
    )
    }