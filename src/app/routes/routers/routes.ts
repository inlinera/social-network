import { FunctionComponent } from 'react'
//PAGES
import { AuthPage } from '@/pages/auth'
import { PostsPage } from '@/pages/posts/index'
import { UserPage } from '@/pages/user'
import { PostPage } from '@/pages/post'
import { SettingsPage } from '@/pages/settings'

export type RouteT = {
  path: string
  element: FunctionComponent
}

export const publicRoutes: RouteT[] = [{ path: '*', element: AuthPage }]

export const privateRoutes: RouteT[] = [
  { path: '/', element: PostsPage },
  { path: '/user/:userId', element: UserPage },
  { path: '/posts/:postId', element: PostPage },
  { path: '/settings', element: SettingsPage },
]
