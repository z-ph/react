import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { preloadOnIdle } from '../utils/preload';

import {routeRelations} from '../routes'

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