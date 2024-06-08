import DropdownItem from './DropdownItem'

interface DropdownListProps {
  items: Item[]
  favorites: Item[]
  toggleFavorite: (item: Item) => void
  scrollElementRef: React.RefObject<HTMLDivElement>
  totalListHeight: number
}

const DropdownList: React.FC<DropdownListProps> = ({
  totalListHeight,
  scrollElementRef,
  items,
  favorites,
  toggleFavorite,
}: DropdownListProps) => (
  <div
    className="dropdown dropdown-open"
    ref={scrollElementRef}
    style={{ height: totalListHeight }}
  >
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
