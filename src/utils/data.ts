export interface classInfo {
  id: number;
  name: string;
  desc: string;
  remainAmount: number;
  price: number;
  features: string[];
}
export interface userInfo {
  username: string;
  phone: string;
  IDcard: string;
  education: string;
  enrollType: number;
  remark: string;
}
export interface orderInfo {
  orderId: string;
  classId: number;
  className: string;
  price: number;
  status: string;
  statusText: string;
  createdAt: string;
  expireAt: string;
}
import { getLocalData } from "./localApi";
export function init() {
  // 从本地存储获取班级信息
  const classInfoObj: classInfo =
    (getLocalData("classInfo") as classInfo) || null;
  // 从本地存储获取用户信息
  const userInfoObj: userInfo = (getLocalData("userInfo") as userInfo) || null;
  const orderInfoObj: orderInfo =
    (getLocalData("orderInfo") as orderInfo) || null;
  // 返回班级信息和用户信息对象
  return [classInfoObj, userInfoObj, orderInfoObj] as [
    classInfo,
    userInfo,
    orderInfo,
  ];
}
