import { Suspense } from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'
//LAYOUT
import { LayoutNav } from '@/widgets/layout'
//MOBX
import authApi from '@/shared/store/api/user/auth/auth-api'
//COMPONENTS
import { Spin } from 'antd'
import { PageLoad } from './ui/loading'

import { PrivateRouter } from './routers/PrivateRouter'
import { PublicRouter } from './routers/PublicRouter'

const AppRouter = observer(() => {
  const { loading, user } = authApi
  if (loading) return <Spin size="large" />

  return (
    <>
      <LayoutNav />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <main className={'flex fdc scroll'}>
        <Suspense fallback={<PageLoad />}>{user ? <PrivateRouter /> : <PublicRouter />}</Suspense>
      </main>
    </>
  )
})

export default AppRouter
