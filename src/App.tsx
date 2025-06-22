import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { routes } from "./routes";
import { Skeleton } from "antd";
import { RouteChangeListener } from "./components/RouteChangeListener";

const App: React.FC = () => {
  const routeElements = useRoutes(routes) as React.ReactElement<RouteObject>;

  return (
    <div className="App">
      {/* 添加路由监听器，用于预加载可能的下一个页面 */}
      <RouteChangeListener />

      <Suspense fallback={<Skeleton active />}>{routeElements}</Suspense>
    </div>
  );
};

export default App;
