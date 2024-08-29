//PAGES
import { AuthPage } from "@/pages/authorization"
import { PostsPage } from "@/pages/posts/index"
import { UserPage } from "@/pages/user"

export const publicRoutes = [
    {path: '/auth', element: AuthPage}
]

export const privateRoutes = [
    {path: '/', element: PostsPage},
    {path: '/user/:userId', element: UserPage}
    
]