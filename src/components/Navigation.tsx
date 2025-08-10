'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePokemon } from '@/contexts/PokemonContext';
import { useIsClient } from '@/hooks/useIsClient';

function Navigation() {
  const pathname = usePathname();
  const { savedPokemon } = usePokemon();
  const isClient = useIsClient();

  // Prevent hydration mismatch by not showing count until client-side
  const pokemonCount = isClient ? savedPokemon.length : 0;

  const navItems = [
    { href: '/', label: 'All Pokemon', icon: '📋' },
    { href: '/my-collection', label: `My Collection${isClient ? ` (${pokemonCount})` : ''}`, icon: '⭐' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl">⚡</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              <span className="hidden sm:inline">Pokedex Amalia</span>
              <span className="sm:hidden">Pokedex</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="inline-block mr-1">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">
                    {item.href === '/' ? 'All' : `Collection${isClient ? ` (${pokemonCount})` : ''}`}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Navigation);
