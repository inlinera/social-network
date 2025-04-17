import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import authApi from '../store/api/user/auth/auth-api'
import { useTranslation } from 'react-i18next'

interface IItem {
  title: string
  icon: React.ReactNode
  path: string
}

export const useSidebar = (): IItem[] => {
  const { user } = authApi
  const { t } = useTranslation()

  return [
    {
      title: t('sidebar.profile'),
      icon: <UserOutlined />,
      path: user ? `user/${user?.displayName}` : `/auth`,
    },
    {
      title: t('sidebar.home'),
      icon: <HomeOutlined />,
      path: '/',
    },
    {
      title: t('sidebar.chats'),
      icon: <MessageOutlined />,
      path: '/chats',
    },
  ]
}
