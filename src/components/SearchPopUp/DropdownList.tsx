import DropdownItem from './DropdownItem'

interface DropdownListProps {
  items: Item[]
  favorites: Item[]
  toggleFavorite: (item: Item) => void
}

const DropdownList: React.FC<DropdownListProps> = ({
  items,
  favorites,
  toggleFavorite,
}: DropdownListProps) => (
  <div className="dropdown dropdown-open">
    {items.map((item: Item) => (
      <div className="dropdown-item-wrapper" key={item}>
        <DropdownItem
          item={item}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(item)}
        />
      </div>
    ))}
  </div>
)

export default DropdownList
