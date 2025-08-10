/**
 * Helper utility functions for the Pokedex application
 */

/**
 * Extracts Pokemon ID from a PokeAPI URL
 * @param url - The PokeAPI URL (e.g., "https://pokeapi.co/api/v2/pokemon/25/")
 * @returns The Pokemon ID as a number
 */
export const extractPokemonId = (url: string): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
};

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats Pokemon name for display (capitalizes first letter, replaces hyphens with spaces)
 * @param name - The Pokemon name to format
 * @returns The formatted Pokemon name
 */
export const formatPokemonName = (name: string): string => {
  if (!name) return name;
  return name
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Dec 25, 2023, 02:30 PM")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formats a date string to a short format
 * @param dateString - ISO date string
 * @returns Short formatted date string (e.g., "Dec 25, 2023")
 */
export const formatShortDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Generates a random ID string
 * @param length - The length of the ID (default: 8)
 * @returns A random ID string
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param maxLength - The maximum length
 * @param suffix - The suffix to add if truncated (default: "...")
 * @returns The truncated string
 */
export const truncateString = (str: string, maxLength: number, suffix: string = "..."): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Converts a number to a string with leading zeros
 * @param num - The number to pad
 * @param size - The desired length of the string
 * @returns The padded string
 */
export const padNumber = (num: number, size: number): string => {
  let str = num.toString();
  while (str.length < size) {
    str = '0' + str;
  }
  return str;
};

/**
 * Formats Pokemon ID with leading zeros (e.g., 25 -> "025")
 * @param id - The Pokemon ID
 * @returns The formatted ID string
 */
export const formatPokemonId = (id: number): string => {
  return padNumber(id, 3);
};

// Get Pokemon image URL by ID (for list view)
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// Get type color for styling
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  
  return typeColors[type] || '#68A090';
};
