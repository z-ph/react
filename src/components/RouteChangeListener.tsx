import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadOnIdle } from '../utils/preload';

// 路由关系映射，用于预测用户可能访问的下一个页面
const routeRelations: Record<string, string[]> = {
  '/': ['/enroll','/404'], // 从首页可能去报名页
  '/enroll': ['/classselect', '/order','404'], // 从报名页可能去选课页或订单页
  '/classselect': ['/','404'], // 从选课页可能去订单页或首页
  '/order': [ '/','404'], // 从订单页可能去管理页或首页
  '/manager': ['/','404'] // 从管理页可能去订单页或首页
};

export const RouteChangeListener: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 获取当前路径
    const currentPath = location.pathname;
    
    // 获取可能的下一个路径
    const possibleNextPaths = routeRelations[currentPath] || [];
    
    // 在浏览器空闲时预加载可能的下一个页面
    possibleNextPaths.forEach(path => {
      preloadOnIdle(path);
    });
  }, [location.pathname]);

  // 这个组件不渲染任何内容
  return null;
};