import React from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default SearchBar;
