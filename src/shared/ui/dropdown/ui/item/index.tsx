import s from './index.module.scss'

import { IDropdownListItem } from '@/entities/posts/components/post/ui/dropdown/constants'

interface DropdownItemProps {
  item: IDropdownListItem
  onClick: () => void
}

export const DropdownItem = ({ item, onClick }: DropdownItemProps) => {
  return (
    <li className={s.item}>
      <button className={`flex aic jcsb`} onClick={onClick}>
        <span>{item.content}</span>
        {item.icon}
      </button>
    </li>
  )
}
