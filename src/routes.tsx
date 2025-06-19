import type { RouteObject } from 'react-router-dom'
import  mapToRoutes from './utils/mapToRoutes'
// 路由关系映射，用于预测用户可能访问的下一个页面
export const routeRelations: Record<string, string[]> = {
  '/': ['/enroll','/404','/manager','/order'], 
  '/enroll': ['/classselect', '/order',], 
  '/classselect': ['/','payment'], 
  'payment':['sign'],
  '/order': ['/'], 
  '/manager': ['/'] 
};
const routesMap: Record<string, string> = {
  "": "HomePage",
  "enroll": "EnrollPage",
  "classselect": "ClassSelectPage",
  'payment':'PaymentPage',
  'sign':'SignPage',
  "manager": "ManagerPage",
  "order": "OrderPage",
  "*": "ErrorPage",
};

export const routes: RouteObject[] = mapToRoutes(routesMap);
