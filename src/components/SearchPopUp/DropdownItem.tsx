import { Star } from 'lucide-react'

interface DropdownItemProps {
  item: Item
  toggleFavorite: (item: Item) => void
  isFavorite: boolean
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  toggleFavorite,
  isFavorite,
}: DropdownItemProps) => (
  <li>
    <button className="dropdown-item" onClick={() => toggleFavorite(item)}>
      <Star size={18} style={{ color: isFavorite ? 'gold' : 'inherit' }} />
      <span>{item}</span>
    </button>
  </li>
)

export default DropdownItem
