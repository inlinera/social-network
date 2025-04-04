import { useCallback, useRef, useState, useEffect } from 'react'
import s from './index.module.scss'

import { useDebounce } from '@/shared/hooks/useDebounce'

import { SearchDropdownItem } from './ui/item'
import { SearchDropdownList } from './ui/list'

interface SearchDropdownUiProps {
  items: string[]
  selectedItems: string[]
  setSelectedItems: (_: string[]) => void
}

export const SearchDropdownUi = ({ items, selectedItems, setSelectedItems }: SearchDropdownUiProps) => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')
  const [filteredItems, setFilteredItems] = useState<string[]>(items)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const debouncedSearch = useDebounce((query: string) => {
    if (query) {
      setFilteredItems(items.filter(item => item.toLowerCase().includes(query.toLowerCase())))
    } else {
      setFilteredItems(items)
    }
    if (inputRef.current?.focus) {
      return setIsActive(true)
    }
    setIsActive(false)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSearch(newValue)
  }

  const handleClose = useCallback(() => {
    setValue('')
    setIsActive(false)
  }, [items])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      handleClose()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <div className={`${s['dropdown-ui']} flex aic`}>
        {selectedItems.map(item => (
          <SearchDropdownItem
            key={item}
            item={item}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter something..."
          ref={inputRef}
          onFocus={() => setIsActive(true)}
        />
      </div>
      {isActive && (
        <SearchDropdownList
          items={filteredItems}
          isOpened={isActive}
          closeList={handleClose}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}
    </div>
  )
}
