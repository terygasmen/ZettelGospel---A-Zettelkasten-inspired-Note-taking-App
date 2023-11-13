import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const searchRef = useRef(null);

  const handleKeyPress = (event) => {
    // Check if Cmd (or Ctrl) key + K is pressed
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      // Focus the search input
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className='search'>
      <FaSearch className='search-icon' size='1.2em' />
      <input
        type='text'
        onChange={handleInputChange}
        placeholder='Cmd + K'
        ref={searchRef}
      />
    </div>
  );
};

export default Search;
