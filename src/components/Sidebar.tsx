'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePokemon } from '@/contexts/PokemonContext';
import { useIsClient } from '@/hooks/useIsClient';

export default function Sidebar() {
  const pathname = usePathname();
  const { savedPokemon } = usePokemon();
  const isClient = useIsClient();

  const pokemonCount = isClient ? savedPokemon.length : 0;

  const navItems = [
    { 
      href: '/', 
      label: 'All Pokemon', 
      icon: '🏠',
      description: 'Browse all Pokemon'
    },
    { 
      href: '/my-pokemon', 
      label: 'My Pokemon', 
      icon: '⭐',
      description: `${pokemonCount} Pokemon caught`,
      count: pokemonCount
    },
    { 
      href: '/favorites', 
      label: 'Favorites', 
      icon: '❤️',
      description: 'Your favorite Pokemon'
    },
    { 
      href: '/stats', 
      label: 'Statistics', 
      icon: '📊',
      description: 'Pokemon statistics'
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r border-gray-100 z-40">
      <div className="p-8">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pokedex</h1>
              <p className="text-sm text-gray-500">Amalia</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    isActive ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Stats Card */}
        <div className="mt-12 p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-lg">🏆</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Your Progress</h3>
              <p className="text-sm text-gray-600">Keep collecting!</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pokemon Caught</span>
              <span className="font-bold text-gray-900">{pokemonCount}</span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (pokemonCount / 20) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              {pokemonCount < 20 ? `${20 - pokemonCount} more to reach next milestone` : 'Amazing collection!'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
