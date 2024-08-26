import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import AuthorizationStore from '@/shared/store/auth-api'

import { privateRoutes, publicRoutes } from './routes'

const AppRouter = observer(() => {
  const { user } = AuthorizationStore;

  return (
    <div>
      <BrowserRouter>
        <LayoutNav />
        {
          !user ? (
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              {publicRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path} />
              ))}
            </Routes>
          ) : (
            <Routes>
              {privateRoutes.map((r) => (
                <Route path={r.path} element={<r.element />} key={r.path} />
              ))}
            </Routes>
          )
        }
      </BrowserRouter>
    </div>
  )
})

export default AppRouter