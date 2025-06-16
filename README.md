# react + ant design + tailwindcss 
[toc]

## 1. 创建react项目
> pnpm create vite@latest
## 2. 安装ant design 及其icon
> pnpm install antd --save @ant-design/icons@5.x
安装好后直接在tsx中import {...} from 'antd'或'@ant-design/icons' 即可使用组件

> ant design官方文档:https://ant-design.antgroup.com/components/

## 3. 安装tailwindcss
- 第一步
  > pnpm install tailwindcss @tailwindcss/vite
- 第二步
  在vite.config.js中配置
 ![配置](image.png)
- 第三步
  创建一个css文件写入
  > @import 'tailwindcss';
- 第四步
  在index.html页面中引入
  ![引入](image-1.png)
> tailwindcss官方文档:https://tailwindcss.com/docs/installation

