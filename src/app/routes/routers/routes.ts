import { FunctionComponent, lazy } from 'react'

// PAGES
import PostsPage from '@/pages/posts'
// LAZY
const AuthPage = lazy(() => import('@/pages/auth'))
const UserPage = lazy(() => import('@/pages/user'))
const PostPage = lazy(() => import('@/pages/post'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const ChatsPage = lazy(() => import('@/pages/chats'))

export type RouteT = {
  path: string
  element: FunctionComponent
}

export const publicRoutes: RouteT[] = [
  { path: '*', element: AuthPage },
  { path: '/', element: PostsPage },
  { path: '/posts/:postId', element: PostPage },
  { path: '/user/:userId', element: UserPage },
]

export const privateRoutes: RouteT[] = [
  { path: '*', element: PostsPage },
  { path: '/', element: PostsPage },
  { path: '/user/:userId', element: UserPage },
  { path: '/chats', element: ChatsPage },
  { path: '/posts/:postId', element: PostPage },
  { path: '/settings', element: SettingsPage },
]
