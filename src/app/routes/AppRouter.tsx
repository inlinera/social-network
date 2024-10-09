import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import AuthorizationStore from '@/shared/store/auth-api'
//COMPONENTS
import { Spin } from 'antd'
import { Content } from 'antd/es/layout/layout'
//HOOKS
import { useMobile } from '@/shared/hooks/useMobile'

import { token } from '@/shared/token/token'
import { PrivateRouter } from './routers/PrivateRouter'
import { PublicRouter } from './routers/PublicRouter'

const AppRouter = observer(() => {

  const { loading, user } = AuthorizationStore
  const isMobile = useMobile()

  if (loading) return <Spin size='large'/>

  return (
    <main>
      <BrowserRouter>
      <LayoutNav />
      <Content
        style={
          isMobile ? {margin: '10px 0 0 0'} : {margin: '80px 50px 0 210px'}
        }
        className='jcc aic flex'>
        {user || token
        ? <PrivateRouter />
        : <PublicRouter />
        }
      </Content>
      </BrowserRouter>
    </main>
  )
})

export default AppRouter