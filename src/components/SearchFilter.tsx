'use client';

import React from 'react';
import { useState } from 'react';
import { getTypeColor } from '@/lib/helpers';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string) => void;
  searchQuery: string;
  selectedType: string;
  onClearAll: () => void;
}

const pokemonTypes = [
  'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];



function SearchFilter({ onSearch, onFilterType, searchQuery, selectedType, onClearAll }: SearchFilterProps) {
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const hasActiveSearch = searchQuery.trim() !== '';
  const hasActiveFilter = selectedType !== 'all';

  const handleSearchClick = () => {
    const query = searchInput.trim();
    if (query === '') return;
    
    // Clear any active filter when searching
    if (hasActiveFilter) {
      onFilterType('all');
    }
    onSearch(query);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    onSearch('');
  };

  const handleFilterType = (type: string) => {
    // If selecting a filter, clear any active search
    if (type !== 'all' && hasActiveSearch) {
      onSearch('');
      setSearchInput('');
    }
    onFilterType(type);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={hasActiveFilter ? "Clear filter to search..." : "Type Pokemon name..."}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={hasActiveFilter}
            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm ${
              hasActiveFilter ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          {hasActiveFilter && (
            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
              <span className="text-xs sm:text-sm text-gray-500 italic hidden sm:inline">Filter mode active</span>
              <span className="text-xs text-gray-500 italic sm:hidden">Filter active</span>
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          disabled={hasActiveFilter || searchInput.trim() === ''}
          className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-200 ${
            hasActiveFilter || searchInput.trim() === ''
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          Search
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter by Type</h3>
          {hasActiveSearch && (
            <span className="text-sm text-gray-500 italic">(Clear search to use filters)</span>
          )}
        </div>
        <button
          onClick={() => setShowTypeFilter(!showTypeFilter)}
          disabled={hasActiveSearch}
          className={`font-medium ${
            hasActiveSearch 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {showTypeFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Type Filter Pills */}
      {showTypeFilter && !hasActiveSearch && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {pokemonTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleFilterType(type)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                selectedType === type
                  ? 'text-white shadow-lg transform scale-105'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedType === type ? getTypeColor(type) : undefined
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Active Filters */}
      {(searchQuery || selectedType !== 'all') && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active mode:</span>
          {searchQuery && (
            // eslint-disable-next-line react/no-unescaped-entities
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
              🔍 Search: &quot;{searchQuery}&quot;
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {selectedType !== 'all' && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2 capitalize">
              🏷️ Filter: {selectedType}
              <button
                onClick={() => onFilterType('all')}
                className="text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {(searchQuery || selectedType !== 'all') && (
            <button
              onClick={onClearAll}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchFilter);
