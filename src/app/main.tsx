import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { config } from './_providers/antd.ts'

import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter.tsx'

import './assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={{ components: config }}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ConfigProvider>
)
