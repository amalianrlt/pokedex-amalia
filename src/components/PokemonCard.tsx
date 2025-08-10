'use client';

import React, { useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPokemonName, formatDate, getTypeColor } from '@/lib/helpers';
import { usePokemon } from '@/contexts/PokemonContext';
import { useIsClient } from '@/hooks/useIsClient';

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    types?: string[];
  };
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isPokemonSaved, getPokemonSavedDate } = usePokemon();
  const isClient = useIsClient();
  const isChecked = isClient ? isPokemonSaved(pokemon.id) : false;
  const savedDate = isClient ? getPokemonSavedDate(pokemon.id) : null;

  const primaryType = pokemon.types?.[0] || 'normal';
  const typeColor = useMemo(() => getTypeColor(primaryType), [primaryType]);



  return (
    <Link href={`/pokemon-detail?name=${pokemon.name}`}>
      <div 
        className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-100"
        style={{
          background: `linear-gradient(135deg, ${typeColor}15 0%, ${typeColor}05 100%)`
        }}
      >
        {/* Saved indicator */}
        {isChecked && (
          <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10 shadow-lg">
            ✓
          </div>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
            style={{ backgroundColor: typeColor }}
          ></div>
          <div 
            className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full"
            style={{ backgroundColor: typeColor }}
          ></div>
        </div>

        <div className="relative p-6">
          {/* Pokemon Number */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-gray-400">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
            {pokemon.types && (
              <div className="flex gap-1">
                {pokemon.types.slice(0, 2).map((type) => (
                  <div
                    key={type}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTypeColor(type) }}
                    title={type}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Pokemon Image */}
          <div className="relative h-32 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 rounded-xl"></div>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={120}
              height={120}
              priority={pokemon.id <= 6} // Priority for first 6 Pokemon only
              loading={pokemon.id <= 6 ? "eager" : "lazy"}
              className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              onError={useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-pokemon.svg';
              }, [])}
            />
          </div>

          {/* Pokemon Info */}
          <div className="text-center flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {formatPokemonName(pokemon.name)}
            </h3>
            
            {/* Types */}
            {pokemon.types && (
              <div className="flex justify-center gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize shadow-sm"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile Button - Always visible at bottom */}
            <div className="md:hidden mt-4">
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm border border-gray-200 hover:border-gray-300 shadow-sm">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Overlay Button - Only on hover */}
        <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 font-medium py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm border border-white/20 pointer-events-auto">
            View Details
          </button>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Caught Date Badge - Only show if Pokemon is saved */}
        {savedDate && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <p className="text-xs text-gray-600 font-medium">
              Caught {formatDate(savedDate)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default React.memo(PokemonCard);
