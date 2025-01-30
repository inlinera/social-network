import { HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import authApi from '../store/api/user/auth/auth-api'

export const sidebarInfo = () => {
  const { user } = authApi
  return [
    {
      title: 'Profile',
      icon: <UserOutlined />,
      path: `user/${user?.displayName}`,
    },
    {
      title: 'Home',
      icon: <HomeOutlined />,
      path: '/',
    },
    {
      title: 'Chats',
      icon: <MessageOutlined />,
      path: '/chats',
    },
  ]
}
