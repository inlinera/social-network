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
import { Content } from 'antd/es/layout/layout'

const AppRouter = observer(() => {
  const { loading, user } = AuthorizationStore

  return (
    <main>
      <BrowserRouter>
      <LayoutNav />
      <Content style={{margin: '10px 50px 0 210px'}} className='jcc'>
        {
        loading
            ?
             <Spin size='large'/>
            :
             user || token ? 
              <Routes>
                <Route path='*' element={<Navigate to="/"/>} />
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
      </Content>
      </BrowserRouter>
    </main>
  )
})

export default AppRouter