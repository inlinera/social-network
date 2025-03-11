import { useCallback, useEffect, useRef, useState } from 'react'
import s from './index.module.scss'

import { IDropdownListItem } from '@/entities/posts/components/post/ui/dropdown/constants'
import { DropdownList } from './ui/list'

interface DropdownMenuBtnProps extends React.PropsWithChildren {
  items: IDropdownListItem[]
}

export const DropdownUi = ({ children, items }: DropdownMenuBtnProps) => {
  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsActive(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className={s['dropdown-ui']} ref={dropdownRef}>
      <button onClick={() => setIsActive(!isActive)} className={s.btn}>
        {children}
      </button>
      {isActive && <DropdownList items={items} setIsActive={setIsActive} />}
    </div>
  )
}
