import { platforms, categories } from '../data/mockData.js';

export default function Header({ searchQuery, setSearchQuery, platformFilter, setPlatformFilter, categoryFilter, setCategoryFilter, onOpenProfile }) {
  return (
    <header className="p-4 bg-gray-900 sticky top-0 z-10 border-b border-gray-800 shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            TrendTracker 🚀
          </h1>
          {/* AQUÍ AGREGAMOS EL EVENTO onClick */}
          <div 
            onClick={onOpenProfile} 
            className="w-10 h-10 bg-gray-800 rounded-full border-2 border-purple-500 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition hover:scale-105"
            title="Mi Perfil"
          >
            👤
          </div>
        </div>
        
        <input 
          type="text" 
          placeholder="🔍 Buscar nicho, palabra clave o tendencia..." 
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-pink-500 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <select 
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select 
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </header>
  );
}