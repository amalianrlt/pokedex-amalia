# Pokedex Helper Functions

This directory contains utility functions and API functions for the Pokedex application.

## Helper Functions (`helpers.ts`)

### String Utilities
- **`capitalizeFirstLetter(str: string)`** - Capitalizes the first letter of a string
- **`formatPokemonName(name: string)`** - Formats Pokemon names (capitalizes, replaces hyphens with spaces)
- **`truncateString(str: string, maxLength: number, suffix?: string)`** - Truncates strings with optional suffix

### Pokemon Utilities
- **`extractPokemonId(url: string)`** - Extracts Pokemon ID from PokeAPI URLs
- **`formatPokemonId(id: number)`** - Formats Pokemon ID with leading zeros (e.g., 25 → "025")
- **`padNumber(num: number, size: number)`** - Pads numbers with leading zeros

### Date Utilities
- **`formatDate(dateString: string)`** - Formats dates to readable format (e.g., "Dec 25, 2023, 02:30 PM")
- **`formatShortDate(dateString: string)`** - Formats dates to short format (e.g., "Dec 25, 2023")

### Utility Functions
- **`generateId(length?: number)`** - Generates random ID strings

## API Functions (`api.ts`)

### Pokemon Data
- **`fetchPokemonList(limit, offset)`** - Fetches paginated Pokemon list
- **`fetchPokemonListWithTypes(limit, offset)`** - Fetches Pokemon list with type information
- **`fetchPokemonByName(nameOrId)`** - Fetches detailed Pokemon data
- **`fetchSimplifiedPokemon(nameOrId)`** - Fetches and transforms Pokemon data
- **`searchPokemonByName(query, limit, offset)`** - Searches Pokemon by name
- **`filterPokemonByType(type, limit, offset)`** - Filters Pokemon by type

### Utilities
- **`getPokemonImageUrl(id)`** - Gets Pokemon image URL by ID
- **`getTypeColor(type)`** - Gets color for Pokemon types
- **`transformPokemonData(pokemon)`** - Transforms detailed Pokemon data to simplified format

## Usage

### Import from index (recommended)
```typescript
import { formatPokemonName, extractPokemonId, fetchPokemonList } from '@/lib';
```

### Import from specific files
```typescript
import { formatPokemonName } from '@/lib/helpers';
import { fetchPokemonList } from '@/lib/api';
```

## Examples

```typescript
// Format Pokemon names
formatPokemonName('charizard'); // "Charizard"
formatPokemonName('mega-charizard-x'); // "Mega Charizard X"

// Extract Pokemon ID
extractPokemonId('https://pokeapi.co/api/v2/pokemon/25/'); // 25

// Format Pokemon ID
formatPokemonId(25); // "025"

// Format dates
formatDate('2023-12-25T14:30:00Z'); // "Dec 25, 2023, 02:30 PM"
formatShortDate('2023-12-25T14:30:00Z'); // "Dec 25, 2023"

