import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import AppRouter from './routes/AppRouter.tsx'
import { config } from './_providers/antd.ts'
import './assets/styles/global.scss'
import { SkeletonTheme } from 'react-loading-skeleton'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <ConfigProvider theme={{ components: config }}>
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
    </ConfigProvider>
    </SkeletonTheme>
)