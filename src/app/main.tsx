import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { config } from './_providers/antd.ts'

import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter.tsx'

import './assets/styles/global.scss'
import '@/shared/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={{ components: config }}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRouter />
    </BrowserRouter>
  </ConfigProvider>
)
