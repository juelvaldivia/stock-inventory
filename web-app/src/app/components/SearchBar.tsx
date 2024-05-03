import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.trim();

    onSearch(search);
  };

  return (
    <form className="search-container">
      <input
        id="search-box"
        type="text"
        className="search-box placeholder-center"
        onChange={handleChange}
        placeholder={placeholder ?? ''}
      />
      <label htmlFor="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </label>
      <input type="submit" id="search-submit" />
    </form>
  );
};

export default SearchBar;
