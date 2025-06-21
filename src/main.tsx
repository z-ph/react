import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import App from './App.tsx'
import './assets/css/tailwind.css'
export const STATUS = {
  订单创建:'订单创建',
  定金待支付:'定金待支付',
  合同未签署:'合同未签署',
  报名完成:'报名完成',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)