'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchSimplifiedPokemon, getTypeColor, formatPokemonName, formatPokemonId } from '@/lib';
import { usePokemon } from '@/contexts/PokemonContext';
import Navigation from '@/components/Navigation';

export default function PokemonDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pokemonName = searchParams.get('name');
  const { addPokemon, removePokemon, isPokemonSaved } = usePokemon();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon-detail', pokemonName],
    queryFn: () => fetchSimplifiedPokemon(pokemonName!),
    enabled: !!pokemonName,
  });

  const handleSavePokemon = () => {
    if (pokemon) {
      if (isPokemonSaved(pokemon.id)) {
        removePokemon(pokemon.id);
      } else {
        addPokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          savedAt: new Date().toISOString(),
        });
      }
    }
  };

  if (!pokemonName) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Pokemon Specified</h2>
              <p className="text-gray-600 mb-8">
                Please provide a Pokemon name to view details.
              </p>
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Browse Pokemon
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Pokemon details...</h3>
                <p className="text-gray-500">Discovering amazing creature for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😞</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pokemon Not Found</h2>
              <p className="text-gray-600 mb-8">
                The Pokemon &quot;{pokemonName}&quot; could not be found.
              </p>
              <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Back to Pokemon List
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = isPokemonSaved(pokemon.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="group cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-transparent  rounded-lg transition-all duration-200 ease-in-out"
            >
              <svg 
                className="w-4 h-4 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          {/* Pokemon Details Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              {/* Pokemon Image */}
              <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="aspect-square relative w-full h-full">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-pokemon.svg';
                    }}
                  />
                </div>
              </div>

              {/* Pokemon Info */}
              <div className="md:w-1/2 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      #{formatPokemonId(pokemon.id)}
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {formatPokemonName(pokemon.name)}
                    </h1>
                  </div>
                  
                  {/* Save/Remove Button */}
                  <button
                    onClick={handleSavePokemon}
                    className={`w-full sm:w-auto px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm sm:text-base ${
                      isSaved
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSaved ? 'Release Pokemon' : 'Catch Pokemon'}
                  </button>
                </div>

                {/* Types */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Types</h2>
                  <div className="flex space-x-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {formatPokemonName(type)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Physical Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {pokemon.height / 10} m
                    </p>
                    <p className="text-sm text-gray-600">Height</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">
                      {pokemon.weight / 10} kg
                    </p>
                    <p className="text-sm text-gray-600">Weight</p>
                  </div>
                </div>

                {/* Abilities */}
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">Abilities</h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {formatPokemonName(ability)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base Stats */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Base Stats</h2>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat) => {
                      const getStatColor = (statName: string) => {
                        const colors: Record<string, string> = {
                          hp: '#FF5959',
                          attack: '#F5AC78',
                          defense: '#FAE078',
                          'special-attack': '#9DB7F5',
                          'special-defense': '#A7DB8D',
                          speed: '#FA92B2'
                        };
                        return colors[statName] || '#8B5CF6';
                      };

                      return (
                        <div key={stat.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              {formatPokemonName(stat.name)}
                            </span>
                            <span className="font-medium text-gray-900">
                              {stat.value}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                                backgroundColor: getStatColor(stat.name)
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}