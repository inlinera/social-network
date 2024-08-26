//PAGES
import { AuthPage } from "@/pages/authorization"
import { PostsPage } from "@/pages/posts/posts"
import { UserPage } from "@/pages/user"

export const publicRoutes = [
    {path: '/', element: AuthPage}
]

export const privateRoutes = [
    {path: '/', element: PostsPage},
    {path: '/user/:userId', element: UserPage}
]