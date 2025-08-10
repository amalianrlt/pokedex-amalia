import axios from 'axios';
import { Pokemon, PokemonListItem, PokemonListResponse, SimplifiedPokemon } from '@/types/pokemon';
import { 
  extractPokemonId,
  getPokemonImageUrl
} from './helpers';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Fetch list of Pokemon with pagination
export const fetchPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Fetch list of Pokemon with basic info including types
export const fetchPokemonListWithTypes = async (limit: number = 20, offset: number = 0) => {
  const listResponse = await fetchPokemonList(limit, offset);
  
  // Fetch basic info for each Pokemon in parallel
  const pokemonPromises = listResponse.results.map(async (pokemon) => {
    const id = extractPokemonId(pokemon.url);
    try {
      const detailResponse = await api.get<Pokemon>(`/pokemon/${id}`);
      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.other['official-artwork'].front_default || 
              detailResponse.data.sprites.front_default || 
              '/placeholder-pokemon.svg',
        types: detailResponse.data.types.map(type => type.type.name)
      };
    } catch (error) {
      // Fallback if individual Pokemon fetch fails
      return {
        id,
        name: pokemon.name,
        image: getPokemonImageUrl(id),
        types: []
      };
    }
  });

  const pokemonWithTypes = await Promise.all(pokemonPromises);
  
  return {
    ...listResponse,
    results: pokemonWithTypes
  };
};

// Fetch detailed Pokemon data by name or ID
export const fetchPokemonByName = async (nameOrId: string | number): Promise<Pokemon> => {
  const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
  return response.data;
};

// Transform detailed Pokemon data to simplified format
export const transformPokemonData = (pokemon: Pokemon): SimplifiedPokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default || 
          pokemon.sprites.front_default || 
          '/placeholder-pokemon.svg',
    types: pokemon.types.map(type => type.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    abilities: pokemon.abilities.map(ability => ability.ability.name),
    stats: pokemon.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat
    }))
  };
};

// Fetch and transform Pokemon data
export const fetchSimplifiedPokemon = async (nameOrId: string | number): Promise<SimplifiedPokemon> => {
  const pokemon = await fetchPokemonByName(nameOrId);
  return transformPokemonData(pokemon);
};

// Search Pokemon by name from all Pokemon (limited to first 1000 for performance)
export const searchPokemonByName = async (searchQuery: string, limit: number = 20, offset: number = 0) => {
  // First, get all Pokemon names (limited to reasonable amount)
  const allPokemonResponse = await api.get<PokemonListResponse>(`/pokemon?limit=1000&offset=0`);
  
  // Filter by search query
  const filteredPokemon = allPokemonResponse.data.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Apply pagination to filtered results
  const paginatedResults = filteredPokemon.slice(offset, offset + limit);
  
  // Fetch detailed info for paginated results
  const pokemonPromises = paginatedResults.map(async (pokemon) => {
    const id = extractPokemonId(pokemon.url);
    try {
      const detailResponse = await api.get<Pokemon>(`/pokemon/${id}`);
      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.other['official-artwork'].front_default || 
              detailResponse.data.sprites.front_default || 
              '/placeholder-pokemon.svg',
        types: detailResponse.data.types.map(type => type.type.name)
      };
    } catch (error) {
      return {
        id,
        name: pokemon.name,
        image: getPokemonImageUrl(id),
        types: []
      };
    }
  });

  const pokemonWithTypes = await Promise.all(pokemonPromises);
  
  return {
    count: filteredPokemon.length,
    next: offset + limit < filteredPokemon.length ? `offset=${offset + limit}` : null,
    previous: offset > 0 ? `offset=${Math.max(0, offset - limit)}` : null,
    results: pokemonWithTypes
  };
};

// Filter Pokemon by type with pagination
export const filterPokemonByType = async (type: string, limit: number = 20, offset: number = 0) => {
  // Fetch Pokemon of specific type
  const typeResponse = await api.get(`/type/${type}`);
  const allPokemonOfType = typeResponse.data.pokemon.map((p: {pokemon: PokemonListItem}) => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }));
  
  // Apply pagination
  const paginatedResults = allPokemonOfType.slice(offset, offset + limit);
  
  // Fetch detailed info for paginated results
  const pokemonPromises = paginatedResults.map(async (pokemon: {name: string, url: string}) => {
    const id = extractPokemonId(pokemon.url);
    try {
      const detailResponse = await api.get<Pokemon>(`/pokemon/${id}`);
      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image: detailResponse.data.sprites.other['official-artwork'].front_default || 
              detailResponse.data.sprites.front_default || 
              '/placeholder-pokemon.svg',
        types: detailResponse.data.types.map(type => type.type.name)
      };
    } catch (error) {
      return {
        id,
        name: pokemon.name,
        image: getPokemonImageUrl(id),
        types: []
      };
    }
  });

  const pokemonWithTypes = await Promise.all(pokemonPromises);
  
  return {
    count: allPokemonOfType.length,
    next: offset + limit < allPokemonOfType.length ? `offset=${offset + limit}` : null,
    previous: offset > 0 ? `offset=${Math.max(0, offset - limit)}` : null,
    results: pokemonWithTypes
  };
};
