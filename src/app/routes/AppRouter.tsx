import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import AuthorizationStore from '@/shared/store/auth-api'
//COMPONENTS
import { Spin } from 'antd'

import { privateRoutes, publicRoutes } from './routes'
import { token } from '@/shared/token/token'
import { useEffect } from 'react'

const AppRouter = observer(() => {
  const { loading, initializeAuth } = AuthorizationStore

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <main className='flex jcc aic'>
      <BrowserRouter>
        <LayoutNav />
        {loading
          ? <Spin size='large' className='z-3'/>
          : token ? 
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              {privateRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path}/>
              ))}
            </Routes>
          
          :
            <Routes>
              <Route path='*' element={<Navigate to="/auth" />}/>
              {publicRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path} />
              ))}
            </Routes>
        }
      </BrowserRouter>
    </main>
  )
})

export default AppRouter