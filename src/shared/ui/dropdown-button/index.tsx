import s from './index.module.scss'

export interface IDropdownListItem {
  icon: React.ReactNode
  content: string
}

interface DropdownMenuBtnProps {
  icon: React.ReactNode
  items: IDropdownListItem[]
}

export const DropdownMenuBtn = ({ icon, items }: DropdownMenuBtnProps) => {
  return (
    <div className={s['dropdown-ui']}>
      <button className={s.button} type="button">
        {icon}
      </button>
      <div className={`${s.list} flex fdc`}>
        {items.map(item => {
          return (
            <button className={`flex aic jcsb`}>
              <span>{item.content}</span>
              {item.icon}
            </button>
          )
        })}
      </div>
    </div>
  )
}
