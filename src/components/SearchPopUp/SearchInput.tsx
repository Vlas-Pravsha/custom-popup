import { Search } from 'lucide-react'

interface SearchInputProps {
  inputValue: string
  setInputValue: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
}: SearchInputProps) => (
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

export default SearchInput
