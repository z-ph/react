import React, { useEffect } from 'react';
import { Link,  } from 'react-router-dom';
import { preloadOnHover, preloadOnIdle } from '../utils/preload';
import type {LinkProps} from 'react-router-dom';
interface PreloadLinkProps extends LinkProps {
  preloadOnHover?: boolean; // 是否在悬停时预加载
  preloadOnIdle?: boolean;  // 是否在空闲时预加载
}

export const PreloadLink: React.FC<PreloadLinkProps> = ({
  to,
  preloadOnHover: enablePreloadOnHover = true,
  preloadOnIdle: enablePreloadOnIdle = false,
  children,
  ...props
}) => {
  // 确保 to 是字符串类型
  const path = typeof to === 'string' ? to : to.pathname || '/';

  // 处理鼠标进入事件
  const handleMouseEnter = () => {
    if (enablePreloadOnHover) {
      preloadOnHover(path);
    }
  };

  // 如果启用了空闲时预加载，在组件挂载时开始预加载
  useEffect(() => {
    if (enablePreloadOnIdle) {
      preloadOnIdle(path);
    }
  }, [enablePreloadOnIdle, path]);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
};