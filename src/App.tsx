import { lazy, Suspense, useState,  } from "react";
import type {ComponentType} from "react";
type Page = "Home"  | "Enroll" | "Manager"| "Order";

type PageComponentProps = {
  changePage: (page: Page) => void;
};
import HomePage from "./pages/HomePage";
import EnrollPage from "./pages/EnrollPage";

const pageComponents = import.meta.glob("./pages/*Page.tsx");

function lazyImport(pageName: Page): ComponentType<PageComponentProps> {
  const componentPath = `./pages/${pageName}Page.tsx`;
  return lazy(
    pageComponents[componentPath] as () => Promise<{ default: ComponentType }>
  );
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
  const [pages] = useState<Record<Page, ComponentType<PageComponentProps>>>({
    Home: HomePage,
    Enroll: EnrollPage,
  } as Record<Page, ComponentType<PageComponentProps>>);
  if (!Object.keys(pages).includes(page)) {
    pages[page] = lazyImport(page);
  }

  const CurrentPage = pages[page];

  return (
    <Suspense
      fallback={
        <div style={{ color: "#000", textAlign: "center", fontSize: "20px" }}>
          Loading...
        </div>
      }
    >
      <CurrentPage changePage={setPage} />
    </Suspense>
  );
}

export default App;
