import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import { useState } from "react";
function App(){
  const [pageState, setPageState] = useState<string>('home');
  const changePage = (page: string) => {
    setPageState(page);
  };
  const allPages ={
    home: <HomePage changePage={changePage}/>,
    about: <AboutPage changePage={changePage}/>,
  }

  return allPages[pageState as keyof typeof allPages];
}
export default App;