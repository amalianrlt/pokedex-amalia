'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SavedPokemon } from '@/types/pokemon';

interface PokemonContextType {
  savedPokemon: SavedPokemon[];
  addPokemon: (pokemon: SavedPokemon) => void;
  removePokemon: (pokemonId: number) => void;
  isPokemonSaved: (pokemonId: number) => boolean;
  getPokemonSavedDate: (pokemonId: number) => string | null;
  clearAllPokemon: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'pokedex-saved-pokemon';

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [savedPokemon, setSavedPokemon] = useState<SavedPokemon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved Pokemon from localStorage on component mount
  useEffect(() => {
    const loadSavedPokemon = () => {
      try {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsedPokemon = JSON.parse(saved) as SavedPokemon[];
            setSavedPokemon(parsedPokemon);
          }
        }
      } catch (error) {
        console.error('Error loading saved Pokemon from localStorage:', error);
        // Clear corrupted data
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
        }
      } finally {
        setIsLoaded(true);
      }
    };

    loadSavedPokemon();
  }, []);

  // Save to localStorage whenever savedPokemon changes (but only after initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPokemon));
      } catch (error) {
        console.error('Error saving Pokemon to localStorage:', error);
      }
    }
  }, [savedPokemon, isLoaded]);

  const addPokemon = (pokemon: SavedPokemon) => {
    setSavedPokemon(prev => {
      // Check if Pokemon is already saved
      if (prev.some(p => p.id === pokemon.id)) {
        return prev;
      }
      return [...prev, { ...pokemon, savedAt: new Date().toISOString() }];
    });
  };

  const removePokemon = (pokemonId: number) => {
    setSavedPokemon(prev => prev.filter(p => p.id !== pokemonId));
  };

  const isPokemonSaved = (pokemonId: number): boolean => {
    return savedPokemon.some(p => p.id === pokemonId);
  };

  const getPokemonSavedDate = (pokemonId: number): string | null => {
    const pokemon = savedPokemon.find(p => p.id === pokemonId);
    return pokemon ? pokemon.savedAt : null;
  };

  const clearAllPokemon = () => {
    setSavedPokemon([]);
  };

  const value: PokemonContextType = {
    savedPokemon,
    addPokemon,
    removePokemon,
    isPokemonSaved,
    getPokemonSavedDate,
    clearAllPokemon,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
