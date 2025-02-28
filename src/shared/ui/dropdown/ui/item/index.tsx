import s from './index.module.scss'

interface SearchDropdownItemProps {
  item: string
  setSelectedItems: (_: string[]) => void
  selectedItems: string[]
}

export const SearchDropdownItem = ({ item, selectedItems, setSelectedItems }: SearchDropdownItemProps) => {
  const handleDelete = () => setSelectedItems(selectedItems.filter(i => i != item))

  return (
    <div className={`${s.selectedDropdownItem} flex aic jcsb`}>
      <span>{item}</span>
      <button type="button" onClick={handleDelete}>
        x
      </button>
    </div>
  )
}
