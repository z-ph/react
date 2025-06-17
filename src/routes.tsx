import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { ComponentType } from 'react'
const pages = ["","Home", "Enroll", "Manager", "Order", "ClassSelect","Error", '*'] as const;
type Page = typeof pages[number];
const pageComponents = import.meta.glob("./pages/*Page.tsx");
function lazyImport(pageName: Page): ComponentType {
  const componentPath = `./pages/${pageName}Page.tsx`;
  return lazy(
    pageComponents[componentPath] as () => Promise<{ default: ComponentType }>
  );
}
function routesAdd(pageName: Page,Page: ComponentType) {
  if(pageName === '*'){
    Page = lazyImport('Error')
  }
  if(pageName === ''){
    Page = lazyImport('Home')
  }
  routes.push({
    path: `/${pageName}`,
    element: <Page />,
  });
}
const routes: RouteObject[] = [];
pages.forEach(page => {
  const Page = lazyImport(page);
  routesAdd(page, Page);
});
export { routes }