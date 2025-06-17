import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

// import HomePage from './pages/HomePage'
// import EnrollPage from './pages/EnrollPage'
const HomePage = lazy(() => import('./pages/HomePage'))
const EnrollPage = lazy(() => import('./pages/EnrollPage'))
const ManagerPage = lazy(() => import('./pages/ManagerPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const ClassSelectPage = lazy(() => import('./pages/ClassSelectPage'))
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