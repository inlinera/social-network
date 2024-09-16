import { HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const getUser = localStorage.getItem('token-wunderkids')

export const sidebarInfo = [
    {
        title: 'My profile',
        icon: UserOutlined,
        path: `user/${getUser}`
      },
      {
        title: 'Home',
        icon: HomeOutlined,
        path: '/'
      },
      {
        title: 'Teams',
        icon: TeamOutlined,
        path: '/teams'
      },
]