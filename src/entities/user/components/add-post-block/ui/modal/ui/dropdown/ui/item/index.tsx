import { TagT } from '@/shared/interfaces/IPost'
import s from './index.module.scss'

interface SearchDropdownItemProps {
  item: TagT
  setSelectedItems: (_: TagT[]) => void
  selectedItems: TagT[]
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
