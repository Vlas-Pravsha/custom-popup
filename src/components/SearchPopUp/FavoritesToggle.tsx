import { Star } from 'lucide-react'

interface FavoritesToggleProps {
  showFavorites: boolean
  setShowFavorites: (value: boolean) => void
}

const FavoritesToggle: React.FC<FavoritesToggleProps> = ({
  showFavorites,
  setShowFavorites,
}: FavoritesToggleProps) => (
  <div className="buttons-wrapper">
    <button
      className={`favorites-button ${showFavorites ? 'active' : ''}`}
      onClick={() => setShowFavorites(true)}
    >
      <Star />
      Favorites
    </button>
    <button
      className={`all-coins-button ${showFavorites ? '' : 'active'}`}
      onClick={() => setShowFavorites(false)}
    >
      All coins
    </button>
  </div>
)

export default FavoritesToggle
