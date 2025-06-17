import { lazy, } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

// 定义预加载方法
// 定义带有预加载功能的组件类型
interface PreloadableComponent<T extends ComponentType<void>> extends LazyExoticComponent<T> {
  preload?: () => Promise<{ default: T }>;
}

// 定义模块导入类型
type ModuleImport<T> = Promise<{ default: T }>;

// 预加载组件的映射
const preloadMap = new Map<string, ModuleImport<ComponentType<void>>>();

// 获取路由组件的映射
const getRouteComponentMap = () => {
  // 动态导入路由组件
  const HomePage = lazy(() => import('../pages/HomePage')) as PreloadableComponent<ComponentType<void>>;
  const EnrollPage = lazy(() => import('../pages/EnrollPage')) as PreloadableComponent<ComponentType<void>>;
  const ClassSelectPage = lazy(() => import('../pages/ClassSelectPage')) as PreloadableComponent<ComponentType<void>>;
  const ManagerPage = lazy(() => import('../pages/ManagerPage')) as PreloadableComponent<ComponentType<void>>;
  const OrderPage = lazy(() => import('../pages/OrderPage')) as PreloadableComponent<ComponentType<void>>;
  const ErrorPage = lazy(() => import('../pages/ErrorPage')) as PreloadableComponent<ComponentType<void>>;

  return {
    '/': HomePage,
    '/enroll': EnrollPage,
    '/classselect': ClassSelectPage,
    '/manager': ManagerPage,
    '/order': OrderPage,
    '*': ErrorPage
  };
};

// 定义路由组件映射类型
type RouteComponentMap = {
  [key: string]: PreloadableComponent<ComponentType<void>>;
} & {
  '*': PreloadableComponent<ComponentType<void>>;
};

// 路由组件映射
const routeComponentMap: RouteComponentMap = getRouteComponentMap();

// 预加载指定路径的组件
export const preloadComponent = (path: string): ModuleImport<ComponentType<void>> | undefined => {
  // 如果已经预加载过，直接返回缓存的 Promise
  if (preloadMap.has(path)) {
    return preloadMap.get(path);
  }

  // 获取对应路径的组件
  const component = routeComponentMap[path as keyof RouteComponentMap] || routeComponentMap['*'];
  
  // 获取组件的预加载方法
  const preloadMethod = component.preload;
  
  // 如果组件有预加载方法，则使用它
  let componentPromise: ModuleImport<ComponentType<void>>;
  if (preloadMethod) {
    componentPromise = preloadMethod();
  } else {
    // 否则，根据路径直接导入组件
    switch (path) {
      case '/':
        componentPromise = import('../pages/HomePage');
        break;
      case '/enroll':
        componentPromise = import('../pages/EnrollPage');
        break;
      case '/classselect':
        componentPromise = import('../pages/ClassSelectPage');
        break;
      case '/manager':
        componentPromise = import('../pages/ManagerPage');
        break;
      case '/order':
        componentPromise = import('../pages/OrderPage');
        break;
      default:
        componentPromise = import('../pages/ErrorPage');
    }
  }

  // 缓存预加载的 Promise
  preloadMap.set(path, componentPromise);
  return componentPromise;
};

// 在浏览器空闲时预加载组件
export const preloadOnIdle = (path: string): void => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(
      () => preloadComponent(path),
      { timeout: 1000 }
    );
  } else {
    // 降级处理：使用 setTimeout
    setTimeout(() => preloadComponent(path), 1000);
  }
};

// 在鼠标悬停时预加载组件
export const preloadOnHover = (path: string): void => {
  preloadComponent(path);
};