import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import AuthorizationStore from '@/shared/store/auth-api'
//COMPONENTS
import { Spin } from 'antd'

import { privateRoutes, publicRoutes } from './routes'

const AppRouter = observer(() => {
  const { loading } = AuthorizationStore
  const token = localStorage.getItem('token-wunderkids')

  return (
    <main>
      <BrowserRouter>
        <LayoutNav />
        {loading 
        ? <Spin size='large'/>
        : 
          token ? (
            <Routes>
              <Route path="/auth" element={<Navigate to="/" />} />
              {privateRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path}/>
              ))}
            </Routes>
          )
          :
          (
            <Routes>
              <Route path="*" element={<Navigate to="/auth" />} />
              {publicRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path} />
              ))}
            </Routes>
          )
        
        }
      </BrowserRouter>
    </main>
  )
})

export default AppRouter