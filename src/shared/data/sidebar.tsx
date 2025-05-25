import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface IItem {
  title: string
  icon: React.ReactNode
  path: string
}

export const useSidebar = (displayName?: string): IItem[] => {
  const { t } = useTranslation()

  return [
    {
      title: t('sidebar.profile'),
      icon: <UserOutlined />,
      path: displayName ? `user/${displayName}` : `/auth`,
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
