import s from './_styles/index.module.scss'
import { LayoutHeader } from "./header"
import { LayoutSidebar } from "./sidebar"


export const LayoutNav = () => {
  return (
    <div className={s.layout}>
        <LayoutHeader />
        <LayoutSidebar />
    </div>
  )
}
