import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import './App.css'
import { getCoins } from './api/getCoins'

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setLoading(true)
        const fetchedData = await getCoins()
        setData(fetchedData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchApiData()
  }, [])
  const toggleSearchVisibility = () =>
    setIsSearchVisible((prevState) => !prevState)

  return (
    <>
      <button className="search" onClick={toggleSearchVisibility}>
        <Search />
        <span className="search__text">Search</span>
      </button>
      {isSearchVisible && (
        <div className="content">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'transparent',
              outline: 'none',
              border: 'none',
            }}
          />
        </div>
      )}
      {data.map((item) => (
        <div key={item}>
          <h6>{item}</h6>
        </div>
      ))}
    </>
  )
}

export default App
