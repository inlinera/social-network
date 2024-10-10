import { Route, Routes } from 'react-router-dom'
import { privateRoutes, RouteT } from './routes'

export const PrivateRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((r: RouteT) => (
        <Route key={r.path} path={r.path} Component={r.element} />
      ))}
    </Routes>
  )
}
