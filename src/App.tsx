import { lazy, Suspense, useState,  } from "react";
import type {ComponentType} from "react";



type PageComponentProps = {
  changePage: (page: "Home" | "About") => void;
};

const HomePage = lazy(
  () => import("./HomePage")
) as ComponentType<PageComponentProps>;
const AboutPage = lazy(
  () => import("./AboutPage")
) as ComponentType<PageComponentProps>;

function App() {
  const [page, setPage] = useState<"Home" | "About">("Home");

  const pages = {
    Home: HomePage,
    About: AboutPage,
  };

  const CurrentPage = pages[page];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurrentPage changePage={setPage} />
    </Suspense>
  );
}

export default App;
