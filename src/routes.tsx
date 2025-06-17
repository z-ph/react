import type { RouteObject } from 'react-router-dom'
// import type { ComponentType, LazyExoticComponent } from 'react'
import  mapToRoutes from './utils/mapToRoutes'

const routesMap: Record<string, string> = {
  "": "HomePage",
  "enroll": "EnrollPage",
  "classselect": "ClassSelectPage",
  "manager": "ManagerPage",
  "order": "OrderPage",
  "*": "ErrorPage",
};
// 使用增强的懒加载函数定义组件
// const HomePage = enhancedLazy(() => import('./pages/HomePage'));
// const EnrollPage = enhancedLazy(() => import('./pages/EnrollPage'));
// const ManagerPage = enhancedLazy(() => import('./pages/ManagerPage'));
// const OrderPage = enhancedLazy(() => import('./pages/OrderPage'));
// const ErrorPage = enhancedLazy(() => import('./pages/ErrorPage'));
// const ClassSelectPage = enhancedLazy(() => import('./pages/ClassSelectPage'));

export const routes: RouteObject[] = mapToRoutes(routesMap);
// [
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/enroll",
//     element: <EnrollPage />,
//   },
//   {
//     path: "/classselect",
//     element: <ClassSelectPage />,
//   },
//   {
//     path: "/manager",
//     element: <ManagerPage />,
//   },
//   {
//     path: "/order",
//     element: <OrderPage />,
//   },
//   {
//     path: "*",
//     element: <ErrorPage />
//   },
// ];