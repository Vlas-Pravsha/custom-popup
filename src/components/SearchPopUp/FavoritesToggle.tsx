import { Star } from 'lucide-react'

interface FavoritesToggleProps {
  showFavorites: boolean
  setShowFavorites: (value: boolean) => void
}

const FavoritesToggle: React.FC<FavoritesToggleProps> = ({
  setShowFavorites,
}: FavoritesToggleProps) => (
  <div className="buttons-wrapper">
    <button className="favorites-button" onClick={() => setShowFavorites(true)}>
      <Star />
      Favorites
    </button>
    <button
      className="all-coins-button"
      onClick={() => setShowFavorites(false)}
    >
      All coins
    </button>
  </div>
)

export default FavoritesToggle
