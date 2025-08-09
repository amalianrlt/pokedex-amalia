export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          🎮 Pokedex Amalia
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A modern Pokedex app built with Next.js, Tailwind CSS, and TanStack Query
        </p>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Tech Stack
            </h2>
            <ul className="text-gray-600 dark:text-gray-400 space-y-1">
              <li>✅ Next.js 15 with App Router</li>
              <li>✅ Tailwind CSS v4</li>
              <li>✅ TypeScript</li>
              <li>⏳ TanStack Query + Axios (coming next)</li>
              <li>⏳ Conventional Commits (coming next)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
