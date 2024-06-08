import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import useLocalStorage from '../../hooks/useLocalStorage'
import { getCoins } from '../../api/getCoins'

import DropdownList from './DropdownList'
import FavoritesToggle from './FavoritesToggle'
import SearchInput from './SearchInput'

import './SearchPopUp.css'

type Item = string

const SearchPopUp: React.FC = () => {
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
          <FavoritesToggle
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
          <DropdownList
            items={filteredItems}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      )}
    </div>
  )
}
export default SearchPopUp
