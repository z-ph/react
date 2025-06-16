import { lazy, Suspense, useState,  } from "react";
import type {ComponentType} from "react";

type Page = "Home" | "About" | "Enroll" | "Manager";

type PageComponentProps = {
  changePage: (page: Page) => void;
};
import HomePage from "./pages/HomePage";
import EnrollPage from "./pages/EnrollPage";
// const HomePage = lazy(
//   () => import("./pages/HomePage")
// ) as ComponentType<PageComponentProps>;
// const EnrollPage = lazy(
//   () => import("./pages/EnrollPage")
// ) as ComponentType<PageComponentProps>;
// const AboutPage = lazy(
//   () => import("./pages/AboutPage")
// ) as ComponentType<PageComponentProps>;
// const ManagerPage = lazy(
//   () => import("./pages/ManagerPage")
// ) as ComponentType<PageComponentProps>;
function lazyImport(pageName:Page):ComponentType<PageComponentProps>{
  return lazy(() => import(/* @vite-ignore */`./pages/${pageName}Page`))
}
function App() {
  const [page, setPage] = useState<Page>("Home"); 

  // const pages = {
  //   Home: HomePage,
  //   About: AboutPage,
  //   Enroll: EnrollPage,
  //   Manager: ManagerPage,
  // };
  // const CurrentPage = pages[page];
  
  //实现按需加载
  const [pages] = useState<Record<Page,ComponentType<PageComponentProps>>>({
    Home: HomePage,
    Enroll: EnrollPage,
  } as Record<Page,ComponentType<PageComponentProps>>);
  if(!Object.keys(pages).includes(page)){
    pages[page]=lazyImport(page);
  }

  const CurrentPage = pages[page];

  return (
    <Suspense fallback={<div style={{color:"#000",textAlign:"center",fontSize:"20px"}}>Loading...</div>}>
      <CurrentPage changePage={setPage} />
    </Suspense>
  );
}

export default App;
