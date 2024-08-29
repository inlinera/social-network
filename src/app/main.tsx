import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import AppRouter from './routes/AppRouter.tsx'
import { config } from './_providers/antd.ts'
import './assets/styles/global.scss'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <ConfigProvider theme={{ components: config }}>
    <AppRouter />
    </ConfigProvider>
    </SkeletonTheme>
  </React.StrictMode>,
)
