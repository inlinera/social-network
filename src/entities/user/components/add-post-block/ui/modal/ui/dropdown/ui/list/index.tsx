import { TagT } from '@/shared/interfaces/IPost'
import s from './index.module.scss'

interface SearchDropdownListProps {
  items: TagT[]
  selectedItems: TagT[]
  setSelectedItems: (_: TagT[]) => void
  isOpened: boolean
  closeList: () => void
}

export const SearchDropdownList = ({
  items,
  isOpened,
  closeList,
  selectedItems,
  setSelectedItems,
}: SearchDropdownListProps) => {
  const handleSelect = (item: TagT) => {
    closeList()

    const isExists = selectedItems.includes(item)

    if (selectedItems.length >= 3 && !isExists) return alert('Max: 3 tags')
    if (isExists) {
      return setSelectedItems(selectedItems.filter(i => i != item))
    }

    setSelectedItems([...selectedItems, item])
  }

  return (
    isOpened && (
      <ul className={`${s.dropdownList} scroll`}>
        {items.length == 0 && <p>Sorry we can't found this tag</p>}
        {items.map(item => {
          return (
            <li key={item}>
              <button
                onClick={() => handleSelect(item)}
                type="button"
                className={selectedItems.includes(item) ? s.selected : ''}
              >
                {item}
              </button>
            </li>
          )
        })}
      </ul>
    )
  )
}
