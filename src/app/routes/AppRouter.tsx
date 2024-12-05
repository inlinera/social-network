import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
//COMPONENTS
import { Spin } from 'antd'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'

import { token } from '@/shared/token/token'
import { PrivateRouter } from './routers/PrivateRouter'
import { PublicRouter } from './routers/PublicRouter'

const AppRouter = observer(() => {
  const { loading, user } = authApi
  const isMobile = useMobile()

  if (loading) return <Spin size="large" />

  return (
    <main>
      <LayoutNav />
      <div
        style={isMobile ? { margin: '10px 0 0 0' } : { margin: '80px 50px 0 210px' }}
        className="jcc aic flex"
      >
        {user || token ? <PrivateRouter /> : <PublicRouter />}
      </div>
    </main>
  )
})

export default AppRouter
