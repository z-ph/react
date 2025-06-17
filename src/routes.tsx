import { lazy } from 'react'
import type { RouteObject } from "react-router-dom";
import type { ComponentType } from "react";
const routes: RouteObject[] = [];

const map= {
  "": "Home",
  "*": "Error",
  Enroll: "Enroll",
  Manager: "Manager",
  Order: "Order",
  ClassSelect: "ClassSelect",
};
type Page = keyof typeof map;
const pages = Object.keys(map) as Page[];
const pageComponents = import.meta.glob("./pages/*Page.tsx");
function lazyImport(pageName: Page): ComponentType {
  const componentPath = `./pages/${pageName}Page.tsx`;
  return lazy(
    pageComponents[componentPath] as () => Promise<{ default: ComponentType }>
  );
}
function pageNameToComponentType(pageName: Page): ComponentType {
  return lazyImport(pageName);
}
function routesAdd(pageName: Page, Page: ComponentType) {
  if (Object.keys(map).includes(pageName)) {
    Page = pageNameToComponentType(map[pageName] as Page);
  }
  routes.push({
    path: `/${pageName}`,
    element: <Page />,
  });
}
pages.forEach(page => {
  const Page = lazyImport(page);
  routesAdd(page, Page);
});
export { routes }