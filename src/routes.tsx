import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { ComponentType, LazyExoticComponent } from 'react'

// 定义带有预加载功能的组件类型
interface PreloadableComponent<T extends ComponentType<void>> extends LazyExoticComponent<T> {
  preload?: () => Promise<{ default: T }>;
}

// 增强的懒加载函数，支持预加载
const enhancedLazy = <T extends ComponentType<void>>(
  importFunc: () => Promise<{ default: T }>
): PreloadableComponent<T> => {
  const Component = lazy(importFunc) as PreloadableComponent<T>;
  Component.preload = importFunc;
  return Component;
};

// 使用增强的懒加载函数定义组件
const HomePage = enhancedLazy(() => import('./pages/HomePage'));
const EnrollPage = enhancedLazy(() => import('./pages/EnrollPage'));
const ManagerPage = enhancedLazy(() => import('./pages/ManagerPage'));
const OrderPage = enhancedLazy(() => import('./pages/OrderPage'));
const ErrorPage = enhancedLazy(() => import('./pages/ErrorPage'));
const ClassSelectPage = enhancedLazy(() => import('./pages/ClassSelectPage'));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/enroll",
    element: <EnrollPage />,
  },
  {
    path: "/classselect",
    element: <ClassSelectPage />,
  },
  {
    path: "/manager",
    element: <ManagerPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "*",
    element: <ErrorPage />
  },
];