import { Route, Routes } from 'react-router-dom'
import { publicRoutes, RouteT } from './routes'

export const PublicRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((r: RouteT) => (
        <Route key={r.path} path={r.path} Component={r.element} />
      ))}
    </Routes>
  )
}
