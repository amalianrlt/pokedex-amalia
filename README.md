# 🎯 Pokedex Amalia

A modern, feature-rich Pokedex application built with Next.js 15, React 19, and TypeScript. This application provides an interactive way to explore, search, and collect Pokemon with a beautiful, responsive design.

![Pokedex Amalia](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 **Pokemon Discovery**
- **Browse Pokemon**: Paginated list of all Pokemon with beautiful cards
- **Search Functionality**: Search Pokemon by name with real-time results
- **Type Filtering**: Filter Pokemon by type (Fire, Water, Grass, etc.)
- **Advanced Pagination**: Navigate through Pokemon with previous/next controls

### 📱 **Pokemon Details**
- **Comprehensive Information**: View detailed stats, abilities, and characteristics
- **Visual Stats**: Beautiful stat bars with color-coded representations
- **Type Information**: Display Pokemon types with appropriate color coding
- **Physical Attributes**: Height, weight, and base experience details

### 🎯 **Collection Management**
- **Catch Pokemon**: Add Pokemon to your personal collection
- **Personal Collection**: View all caught Pokemon in a dedicated page
- **Release Pokemon**: Remove individual Pokemon from your collection
- **Bulk Management**: Clear entire collection with confirmation
- **Local Storage**: Persistent collection data using browser storage

### 🎨 **User Experience**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Beautiful gradients, shadows, and hover effects
- **Loading States**: Elegant loading spinners and skeleton screens
- **Error Handling**: Graceful error states with retry options
- **Confirmation Modals**: Safe actions with confirmation dialogs

## 🚀 Technology Stack

### **Frontend Framework**
- **Next.js 15**: App Router with server-side rendering
- **React 19**: Latest React features with hooks and context
- **TypeScript**: Full type safety and better development experience

### **Styling & UI**
- **Tailwind CSS 4**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Custom Components**: Reusable, accessible UI components

### **State Management**
- **React Context**: Pokemon collection state management
- **React Query**: Server state management with caching
- **Local Storage**: Persistent data storage

### **API Integration**
- **PokeAPI**: Official Pokemon data source
- **Axios**: HTTP client for API requests
- **Optimized Fetching**: Smart caching and error handling

## 📁 Project Structure

```
pokedex-amalia/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page - Pokemon discovery
│   │   ├── my-collection/     # Personal collection page
│   │   └── pokemon-detail/    # Individual Pokemon details
│   ├── components/             # Reusable UI components
│   │   ├── PokemonCard.tsx    # Pokemon display card
│   │   ├── Navigation.tsx     # Main navigation
│   │   ├── SearchFilter.tsx   # Search and filter controls
│   │   ├── ConfirmationModal.tsx # Action confirmation
│   │   └── LoadingSpinner.tsx # Loading states
│   ├── contexts/               # React Context providers
│   │   └── PokemonContext.tsx # Pokemon collection state
│   ├── hooks/                  # Custom React hooks
│   │   └── useIsClient.ts     # Client-side rendering hook
│   ├── lib/                    # Utility functions and API
│   │   ├── api.ts             # PokeAPI integration
│   │   ├── helpers.ts         # Helper functions
│   │   └── index.ts           # Main exports
│   ├── providers/              # App providers
│   │   └── QueryProvider.tsx  # React Query provider
│   └── types/                  # TypeScript type definitions
│       └── pokemon.ts         # Pokemon data types
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amalianrlt/pokedex-amalia
   cd pokedex-amalia
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint

## 🌟 Key Features in Detail

### **Smart Pokemon Fetching**
- Efficient API calls with React Query caching
- Parallel data fetching for better performance
- Fallback images and error handling
- Optimized pagination with type filtering

### **Collection Persistence**
- Local storage integration for Pokemon collection
- Automatic data persistence across sessions
- Safe data handling with error recovery
- Collection sorting by catch date

### **Responsive Design**
- Mobile-first responsive layout
- Adaptive grid systems for different screen sizes
- Touch-friendly interactions
- Optimized for all device types

### **Performance Optimizations**
- Image optimization with Next.js Image component
- Lazy loading for Pokemon images
- Efficient re-rendering with React.memo
- Smart caching strategies

## 🔧 API Integration

The application integrates with the [PokeAPI](https://pokeapi.co/) to provide:
- Complete Pokemon database
- Type information and statistics
- Official artwork and sprites
- Abilities and move data

## 🎨 Design Philosophy

- **Clean & Modern**: Minimalist design with beautiful gradients
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Performance**: Fast loading times and smooth interactions
- **User-Centric**: Intuitive navigation and clear feedback

## 🚀 Deployment

This application is ready for deployment on:
- **Netlify**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing comprehensive Pokemon data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Query](https://tanstack.com/query) for efficient server state management

---

**Built with ❤️ by Amalia** - A modern Pokedex experience for Pokemon enthusiasts!
