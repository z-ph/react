import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
// 定义带有预加载功能的组件类型
interface PreloadableComponent<T extends ComponentType<Props>>
  extends LazyExoticComponent<T> {
  preload?: () => Promise<{ default: T }>;
}
interface Props {
  props?: unknown;
}
// 增强的懒加载函数，支持预加载
const enhancedLazy = <T extends ComponentType<Props>>(
  importFunc: () => Promise<{ default: T }>,
): PreloadableComponent<T> => {
  const Component = lazy(importFunc) as PreloadableComponent<T>;
  Component.preload = importFunc;
  return Component;
};
const pageComponents = import.meta.glob([
  "../pages/*.tsx",
  "../pages/Admin/*.tsx",
]);
function mapToRoutes(map: Record<string, string>): RouteObject[] {
  return Object.entries(map).map(([path, Page]) => {
    const componentPath = `../pages/${Page}.tsx`;
    if (componentPath in pageComponents) {
      const PageComp = enhancedLazy(
        pageComponents[componentPath] as () => Promise<{
          default: ComponentType<Props>;
        }>,
      );
      return {
        path,
        element: <PageComp />,
      };
    }
    throw new Error(`Component not found: ${componentPath}`);
  });
}
export default mapToRoutes;
