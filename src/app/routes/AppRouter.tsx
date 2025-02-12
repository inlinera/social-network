import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
import Settings from '@/shared/store/functional/start-app'
//COMPONENTS
import { Spin } from 'antd'

import { PrivateRouter } from './routers/PrivateRouter'
import { PublicRouter } from './routers/PublicRouter'

const AppRouter = observer(() => {
  const { loading, user } = authApi
  const { start } = Settings
  start()
  if (loading) return <Spin size="large" />

  return (
    <main>
      <LayoutNav />
      <div>{user ? <PrivateRouter /> : <PublicRouter />}</div>
    </main>
  )
})

export default AppRouter
