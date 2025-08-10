'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePokemon } from '@/contexts/PokemonContext';
import Navigation from '@/components/Navigation';
import PokemonCard from '@/components/PokemonCard';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function MyPokemonPage() {
  const { savedPokemon, removePokemon, clearAllPokemon } = usePokemon();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [pokemonToRemove, setPokemonToRemove] = useState<number | null>(null);

  const handleRemovePokemon = (pokemonId: number) => {
    setPokemonToRemove(pokemonId);
    setIsRemoveModalOpen(true);
  };

  const handleClearAll = () => {
    setIsClearAllModalOpen(true);
  };

  const confirmRemovePokemon = () => {
    if (pokemonToRemove !== null) {
      removePokemon(pokemonToRemove);
      setPokemonToRemove(null);
    }
  };

  const confirmClearAll = () => {
    clearAllPokemon();
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                My Pokemon Collection
              </h1>
              <p className="text-sm text-gray-600">
                You have caught {savedPokemon.length} amazing Pokemon
              </p>
            </div>
            
            {/* Clear All Button */}
            {savedPokemon.length > 0 && (
              <button
                onClick={handleClearAll}
                className="w-full sm:w-auto cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>🗑️</span>
                <span className="hidden xs:inline">Release All Pokemon</span>
                <span className="inline xs:hidden">Release All</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {savedPokemon.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🎾</div>
            <div className='flex flex-col items-center gap-2 mb-8'>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Pokemon Caught Yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your adventure by exploring and catching amazing Pokemon creatures!
              </p>
            </div>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🔍 Discover Pokemon
            </Link>
          </div>
        ) : (
          /* Pokemon Grid */
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Your Collection ({savedPokemon.length} Pokemon)
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Sorted by most recently caught
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {savedPokemon
                .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
                .map((pokemon) => (
                  <div key={pokemon.id} className="relative group">
                    <PokemonCard 
                      pokemon={{
                        id: pokemon.id,
                        name: pokemon.name,
                        image: pokemon.image,
                        types: [] // We'll need to fetch types separately or store them
                      }} 
                    />
                    {/* Release Button Overlay */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleRemovePokemon(pokemon.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                        title="Release Pokemon"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        {savedPokemon.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              Catch More Pokemon
            </Link>
          </div>
        )}
        </div>
      </div>
      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={confirmRemovePokemon}
        title="Release Pokemon"
        message="Are you sure you want to release this Pokemon? This action cannot be undone."
        confirmText="Release"
        cancelText="Cancel"
        confirmButtonColor="bg-red-500 hover:bg-red-600"
      />
      
      <ConfirmationModal
        isOpen={isClearAllModalOpen}
        onClose={() => setIsClearAllModalOpen(false)}
        onConfirm={confirmClearAll}
        title="Release All Pokemon"
        message="Are you sure you want to release all your Pokemon? This action cannot be undone."
        confirmText="Release All"
        cancelText="Cancel"
        confirmButtonColor="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}
