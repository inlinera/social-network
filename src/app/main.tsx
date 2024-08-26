import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import AppRouter from './routes/AppRouter.tsx'
import { config } from './_providers/antd.ts'
import './assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{ components: config }}>
    <AppRouter />
    </ConfigProvider>
  </React.StrictMode>,
)
