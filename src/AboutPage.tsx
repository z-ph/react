
export default function AboutPage({changePage}: {changePage: (page: string) => void}){
    
    return (
        <h1 onClick={() => changePage("Home")} style={{color:"gray"}}>About Page</h1>
    )
    }