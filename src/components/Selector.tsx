import React, { useEffect, useState } from 'react'
import { Search, Star } from 'lucide-react'

import useLocalStorage from '../hooks/useLocalStorage'
import { getCoins } from '../api/getCoins'

import './Selector.css'

type Item = string

interface DropdownItemProps {
  item: Item
  isSelected: boolean
  isVisible: boolean
  toggleFavorite: (item: Item) => void
  isFavorite: boolean
}

interface SearchInputProps {
  inputValue: string
  setInputValue: (value: string) => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  isVisible,
  toggleFavorite,
  isFavorite,
}) => (
  <li>
    <button
      className={`dropdown-item ${isVisible ? 'visible' : 'hidden'}`}
      onClick={() => toggleFavorite(item)}
    >
      <Star size={18} style={{ color: isFavorite ? 'gold' : 'inherit' }} />
      <span>{item}</span>
    </button>
  </li>
)

const SearchInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
}) => (
  <div className="search-container">
    <Search size={18} className="search-icon" />
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value.toLowerCase())}
      placeholder="Search..."
      className="search-input"
    />
  </div>
)

const Selector: React.FC = () => {
  const [coins, setCoins] = useState<Item[]>([])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [inputValue, setInputValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  useEffect(() => {
    const fetchedData = getCoins()
    fetchedData.then((data) => setCoins(data))
  }, [])

  const removeFromFavorites = (item: Item, prevFavorites: Item[]) => {
    return prevFavorites.filter((fav) => fav !== item)
  }

  const addToFavorites = (item: Item, prevFavorites: Item[]) => {
    return [...prevFavorites, item]
  }

  const toggleFavorite = (item: Item) => {
    setFavorites((prevFavorites: Item[]) => {
      const updatedFavorites = prevFavorites.includes(item)
        ? removeFromFavorites(item, prevFavorites)
        : addToFavorites(item, prevFavorites)

      return updatedFavorites
    })
  }

  const filteredItems = (showFavorites ? favorites : coins).filter(
    (coin: string) => coin.toLowerCase().includes(inputValue.toLowerCase()),
  )

  return (
    <div className="wrapper">
      <button onClick={() => setOpen(!open)} className="search-button">
        Search
        <Search size={20} />
      </button>
      {open && (
        <div className="selector-container">
          <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
          <div className="buttons-wrapper">
            <button
              className="favorites-button"
              onClick={() => setShowFavorites(true)}
            >
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
          <ul
            className={`dropdown ${open ? 'dropdown-open' : 'dropdown-closed'}`}
          >
            {filteredItems.map((item: Item) => (
              <div className="dropdown-item-wrapper" key={item}>
                <DropdownItem
                  item={item}
                  isSelected={false}
                  isVisible={true}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(item)}
                />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Selector
