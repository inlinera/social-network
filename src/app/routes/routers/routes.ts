import { FunctionComponent } from "react"
//PAGES
import { AuthPage } from "@/pages/authorization"
import { PostsPage } from "@/pages/posts/index"
import { UserPage } from "@/pages/user"

export type RouteT = {
    path: string
    element: FunctionComponent
}

export const publicRoutes: RouteT[] = [
    {path: '/auth', element: AuthPage}
]

export const privateRoutes: RouteT[] = [
    {path: '/', element: PostsPage},
    {path: '/user/:userId', element: UserPage},
]