import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
//COMPONENTS
import { Spin } from 'antd'

import { PrivateRouter } from './routers/PrivateRouter'
import { PublicRouter } from './routers/PublicRouter'

const AppRouter = observer(() => {
  const { loading, user } = authApi
  if (loading) return <Spin size="large" />

  return (
    <>
      <LayoutNav />
      <main>{user ? <PrivateRouter /> : <PublicRouter />}</main>
    </>
  )
})

export default AppRouter
