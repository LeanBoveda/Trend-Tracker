import { useState } from 'react';
import { mockAudios, mockChallenges, mockHooks } from './data/mockData.js';
import Header from './components/Header.jsx';
import Navigation from './components/Navigation.jsx';
import { AudioCard, ChallengeCard, HookCard } from './components/Cards.jsx';
// IMPORTAMOS LA NUEVA VISTA
import ReportView from './components/ReportView.jsx';
import ProfileView from './components/ProfileView.jsx';
import { SkeletonCard } from './components/SkeletonLoader.jsx';
import LoginView from './components/LoginView.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [savedItems, setSavedItems] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  // NUEVO ESTADO PARA EL REPORTE
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const toggleSave = (id, type) => {
    const isSaved = savedItems.some(item => item.id === id && item.type === type);
    if (isSaved) {
      setSavedItems(savedItems.filter(item => !(item.id === id && item.type === type)));
    } else {
      setSavedItems([...savedItems, { id, type }]);
    }
  };
  
  const checkIfSaved = (id, type) => savedItems.some(item => item.id === id && item.type === type);

  const filterData = (data) => {
    return data.filter(item => {
      const matchSearch = (item.title || item.text).toLowerCase().includes(searchQuery.toLowerCase());
      const matchPlatform = platformFilter === 'Todos' || item.platform === platformFilter || item.platform === "Todos";
      const matchCategory = categoryFilter === 'Todos' || item.category === categoryFilter || item.category === "General";
      return matchSearch && matchPlatform && matchCategory;
    });
  };
const handleTabChange = (newTab) => {
    if (newTab === activeTab) return; // Si toca la misma pestaña, no hace nada
    
    setIsLoading(true);
    setActiveTab(newTab);
    
    // Simulamos que la base de datos tarda 600ms en responder
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };
  
  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }
  return (
    
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      
      <Header 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        platformFilter={platformFilter} setPlatformFilter={setPlatformFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        onOpenProfile={() => { setShowProfile(true); setShowReport(false); }}
      />

    {/* LÓGICA DE VISTAS PRINCIPALES */}
      {showProfile ? (
        <main className="max-w-4xl mx-auto p-4 pb-20">
          <ProfileView onClose={() => setShowProfile(false)} />
        </main>
      ) : showReport ? (
        <main className="max-w-4xl mx-auto p-4 pb-20">
          <ReportView onClose={() => setShowReport(false)} />
        </main>
      ) : (
        <>
          <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
          
          <main className="max-w-4xl mx-auto p-4 pb-20">
            {isLoading ? (
              <div className="space-y-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              /* ESTE FRAGMENTO <> ES LA CLAVE PARA QUE NO DE ERROR */
              <>
                {/* DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-br from-purple-900 to-gray-900 p-6 rounded-2xl border border-purple-700/50">
                      <h2 className="text-xl font-bold mb-2">🔥 Top Tendencia del Día</h2>
                      <p className="text-gray-300 text-sm mb-4">El nicho de <span className="text-pink-400 font-bold">Fitness</span> está experimentando un pico inusual en TikTok hoy. Usa sonidos tipo Phonk.</p>
                      
                      <button 
                        onClick={() => setShowReport(true)}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition cursor-pointer shadow-lg shadow-pink-600/30"
                      >
                        Ver reporte completo
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-gray-800 p-4 rounded-xl text-center">
                         <p className="text-3xl font-black text-pink-500">24</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Nuevos Audios</p>
                       </div>
                       <div className="bg-gray-800 p-4 rounded-xl text-center">
                         <p className="text-3xl font-black text-purple-500">12</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Retos en Auge</p>
                       </div>
                    </div>
                  </div>
                )}

                {/* AUDIOS */}
                {activeTab === 'audios' && (
                  <div className="space-y-4 animate-fade-in">
                    {filterData(mockAudios).map(audio => (
                      <AudioCard key={`audio-${audio.id}`} audio={audio} isSaved={checkIfSaved(audio.id, 'audio')} onToggleSave={() => toggleSave(audio.id, 'audio')} />
                    ))}
                  </div>
                )}

                {/* RETOS */}
                {activeTab === 'retos' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    {filterData(mockChallenges).map(reto => (
                      <ChallengeCard key={`reto-${reto.id}`} reto={reto} isSaved={checkIfSaved(reto.id, 'reto')} onToggleSave={() => toggleSave(reto.id, 'reto')} />
                    ))}
                  </div>
                )}

                {/* HOOKS */}
                {activeTab === 'hooks' && (
                  <div className="space-y-4 animate-fade-in">
                    {filterData(mockHooks).map(hook => (
                      <HookCard key={`hook-${hook.id}`} hook={hook} isSaved={checkIfSaved(hook.id, 'hook')} onToggleSave={() => toggleSave(hook.id, 'hook')} />
                    ))}
                  </div>
                )}

                {/* GUARDADOS */}
                {activeTab === 'guardados' && (
                  <div className="space-y-6 animate-fade-in">
                    {savedItems.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-6xl mb-4">🔖</p>
                        <h3 className="text-xl font-bold text-gray-300">Aún no has guardado nada</h3>
                        <p className="text-gray-500 text-sm mt-2">Haz clic en el corazón 🤍 de cualquier tendencia para guardarla aquí.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {savedItems.some(item => item.type === 'audio') && (
                          <div className="space-y-4">
                            <h3 className="font-bold text-pink-500 border-b border-gray-800 pb-2">Audios Guardados</h3>
                            {mockAudios.filter(a => checkIfSaved(a.id, 'audio')).map(audio => (
                              <AudioCard key={`saved-audio-${audio.id}`} audio={audio} isSaved={true} onToggleSave={() => toggleSave(audio.id, 'audio')} />
                            ))}
                          </div>
                        )}
                        {savedItems.some(item => item.type === 'reto') && (
                          <div className="space-y-4">
                            <h3 className="font-bold text-yellow-500 border-b border-gray-800 pb-2">Retos Guardados</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {mockChallenges.filter(r => checkIfSaved(r.id, 'reto')).map(reto => (
                                <ChallengeCard key={`saved-reto-${reto.id}`} reto={reto} isSaved={true} onToggleSave={() => toggleSave(reto.id, 'reto')} />
                              ))}
                            </div>
                          </div>
                        )}
                        {savedItems.some(item => item.type === 'hook') && (
                          <div className="space-y-4">
                            <h3 className="font-bold text-purple-500 border-b border-gray-800 pb-2">Ganchos Guardados</h3>
                            {mockHooks.filter(h => checkIfSaved(h.id, 'hook')).map(hook => (
                              <HookCard key={`saved-hook-${hook.id}`} hook={hook} isSaved={true} onToggleSave={() => toggleSave(hook.id, 'hook')} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            
          </main>
        </>
      )}

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}