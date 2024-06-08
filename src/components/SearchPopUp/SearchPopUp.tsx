import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Search, Star } from 'lucide-react'

import useLocalStorage from '../../hooks/useLocalStorage'
import useDebounce from '../../hooks/useDebounce'
import { getCoins } from '../../api/сoins'

import FavoritesToggle from './FavoritesToggle'
import SearchInput from './SearchInput'

import './SearchPopUp.css'

type Item = string

const SearchPopUp: React.FC = () => {
  const [scrollTop, setScrollTop] = useState<number>(0)
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const [coins, setCoins] = useState<Item[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(false)
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const debouncedSearch = useDebounce<string>(inputValue)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoins()
      setCoins(data)
    }
    fetchData()
  }, [])

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current

    if (!scrollElement) {
      return
    }

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop

      setScrollTop(scrollTop)
    }

    handleScroll()

    scrollElement.addEventListener('scroll', handleScroll)

    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [scrollElementRef])

  const filteredItems = useMemo(() => {
    return (showFavorites ? favorites : coins).filter((coin: string) =>
      coin.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }, [debouncedSearch, showFavorites, favorites, coins])

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop
    const rangeEnd = scrollTop + 320

    let startIndex = Math.floor(rangeStart / 37)
    let endIndex = Math.ceil(rangeEnd / 37)

    startIndex = Math.max(0, startIndex - 3)
    endIndex = Math.min(filteredItems.length - 1, endIndex + 3)

    const virtualItems = []

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * 37,
      })
    }

    return virtualItems
  }, [scrollTop, filteredItems])
  console.log(virtualItems)

  const totalListHeight = filteredItems.length * 37

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
          <div
            ref={scrollElementRef}
            className="dropdown"
            style={{ position: 'relative', height: '20rem', overflowY: 'auto' }}
          >
            <div style={{ height: `${totalListHeight}px` }}>
              {virtualItems.map((virtualItem) => {
                const item = filteredItems[virtualItem.index]
                return (
                  <button
                    onClick={() => toggleFavorite(item)}
                    key={item}
                    className="dropdown-item"
                    style={{
                      height: '37px',
                      top: 0,
                      position: 'absolute',
                      transform: `translateY(${virtualItem.offsetTop}px)`,
                    }}
                  >
                    <Star size={18} />
                    {item}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPopUp
