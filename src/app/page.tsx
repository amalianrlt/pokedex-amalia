'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonListWithTypes, searchPokemonByName, filterPokemonByType } from '@/lib';
import Navigation from '@/components/Navigation';
import SearchFilter from '@/components/SearchFilter';
import PokemonCard from '@/components/PokemonCard';

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const limit = 20;

  // Determine which API to use based on active filters
  const getQueryFunction = () => {
    if (searchQuery.trim() !== '') {
      return () => searchPokemonByName(searchQuery, limit, offset);
    } else if (selectedType !== 'all') {
      return () => filterPokemonByType(selectedType, limit, offset);
    } else {
      return () => fetchPokemonListWithTypes(limit, offset);
    }
  };

  const getQueryKey = () => {
    if (searchQuery.trim() !== '') {
      return ['pokemon-search', searchQuery, offset];
    } else if (selectedType !== 'all') {
      return ['pokemon-filter', selectedType, offset];
    } else {
      return ['pokemon-list-with-types', offset];
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: getQueryKey(),
    queryFn: getQueryFunction(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    if (data?.next) {
      setOffset(offset + limit);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setOffset(0); // Reset pagination when searching
  };

  const handleFilterType = (type: string) => {
    setSelectedType(type);
    setOffset(0); // Reset pagination when filtering
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedType('all');
    setOffset(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Pokemon...</h3>
              <p className="text-gray-500">Discovering amazing creatures for you</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t load the Pokemon data. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Discover Pokemon
        </h1>
          <p className="text-sm text-gray-600">
            Explore the wonderful world of Pokemon creatures
          </p>
        </div>

        {/* Search and Filter */}
        <SearchFilter
          onSearch={handleSearch}
          onFilterType={handleFilterType}
          searchQuery={searchQuery}
          selectedType={selectedType}
          onClearAll={handleClearAll}
        />

      {/* Results Info */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {data?.results && data.results.length > 0 ? `Showing ${data.results.length} Pokemon` : 'No Pokemon Found'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {searchQuery.trim() !== '' ? (
                `Search results for "${searchQuery}" (${data?.count || 0} total)`
              ) : selectedType !== 'all' ? (
                `Filtered by ${selectedType} type (${data?.count || 0} total)`
              ) : (
                `Showing ${offset + 1} - ${Math.min(offset + limit, data?.count || 0)} of ${data?.count || 0} total`
              )}
            </p>
          </div>
          
          {/* Pagination always shows when there are results */}
          {data?.results && data.results.length > 0 && (
            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-end">
              <button
                onClick={handlePrevious}
                disabled={offset === 0}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 rounded-md transition-colors duration-200 text-sm sm:text-base"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!data?.next}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 text-sm sm:text-base"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Pokemon Grid */}
        {data?.results && data.results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data.results.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Pokemon Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery.trim() !== '' ? (
                `No Pokemon found matching "${searchQuery}". Try different search terms.`
              ) : selectedType !== 'all' ? (
                `No Pokemon found with ${selectedType} type. Try a different type.`
              ) : (
                'Try adjusting your search terms or filters to find Pokemon.'
              )}
            </p>
            {(searchQuery.trim() !== '' || selectedType !== 'all') && (
              <button
                onClick={handleClearAll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
