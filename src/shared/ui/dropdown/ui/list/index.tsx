import { IDropdownListItem } from '@/entities/posts/components/post/ui/dropdown/constants'
import s from './index.module.scss'
import { useCallback } from 'react'
import { DropdownItem } from '../item'

interface DropdownListProps {
  items: IDropdownListItem[]
  isActive: boolean
  setIsActive: (_: boolean) => void
}

export const DropdownList = ({ items, isActive, setIsActive }: DropdownListProps) => {
  const handleItemClick = useCallback((func: () => void) => {
    func()
    setIsActive(false)
  }, [])

  return (
    <ul className={`${s.list} ${isActive && s.active}`}>
      {items.map((item, id) => (
        <DropdownItem item={item} onClick={handleItemClick} key={id} />
      ))}
    </ul>
  )
}
