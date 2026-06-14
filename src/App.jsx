import { useState, useEffect } from 'react'; // Agregamos useEffect
import Header from './components/Header.jsx';
import Navigation from './components/Navigation.jsx';
import { AudioCard, ChallengeCard, HookCard } from './components/Cards.jsx';
import ReportView from './components/ReportView.jsx';
import ProfileView from './components/ProfileView.jsx';
import { SkeletonCard } from './components/SkeletonLoader.jsx';
import LoginView from './components/LoginView.jsx';
import { supabase } from './supabaseClient.js'; 
import RegisterView from './components/RegisterView.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [savedItems, setSavedItems] = useState([]);
  const [audios, setAudios] = useState([]);
  const [retos, setRetos] = useState([]);
  const [hooks, setHooks] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authScreen, setAuthScreen] = useState('login');
  // --- ESCUCHA DE SESIÓN EN TIEMPO REAL ---
 useEffect(() => {
    // 1. Revisar sesión al inicio
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) fetchTrends(); // Si hay sesión, descargamos los datos
    });

    // 2. Escuchar cuando el usuario hace login
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) fetchTrends(); // Si entró, descargamos los datos
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- NUEVA FUNCIÓN QUE HABLA CON SUPABASE ---
  const fetchTrends = async () => {
    setIsLoading(true);
    
    // Descargamos tablas
    const { data: audiosData } = await supabase.from('audios').select('*');
    if (audiosData) setAudios(audiosData);
    
    const { data: retosData } = await supabase.from('retos').select('*');
    if (retosData) setRetos(retosData);
    
    const { data: hooksData } = await supabase.from('hooks').select('*');
    if (hooksData) setHooks(hooksData);
    
    setIsLoading(false);
  };

  if (!isAuthenticated) {
      if (authScreen === 'register') {
        return <RegisterView onBackToLogin={() => setAuthScreen('login')} />;
      }
      return <LoginView onNavigateToRegister={() => setAuthScreen('register')} />;
    }
    
  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setIsLoading(true);
    setActiveTab(newTab);
    setTimeout(() => { setIsLoading(false); }, 600);
  };

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
    // SALVAVIDAS 1: Si los datos aún no llegaron de Supabase, devuelve un arreglo vacío en vez de romper la app
    if (!data || !Array.isArray(data)) return [];

    return data.filter(item => {
      // SALVAVIDAS 2: Evita errores si 'title' o 'text' vienen vacíos de la base de datos
      const textToSearch = item.title || item.text || "";
      const matchSearch = textToSearch.toLowerCase().includes(searchQuery.toLowerCase());
      
      const itemPlatform = item.platform || "Todos";
      const matchPlatform = platformFilter === 'Todos' || itemPlatform === platformFilter || itemPlatform === "Todos";
      
      const itemCategory = item.category || "General";
      const matchCategory = categoryFilter === 'Todos' || itemCategory === categoryFilter || itemCategory === "General";
      
      return matchSearch && matchPlatform && matchCategory;
    });
  };

  // SI NO ESTÁ AUTENTICADO, MUESTRA EL LOGIN
  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Header 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        platformFilter={platformFilter} setPlatformFilter={setPlatformFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        onOpenProfile={() => { setShowProfile(true); setShowReport(false); }}
      />

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
              <>
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

                {activeTab === 'audios' && (
                  <div className="space-y-4 animate-fade-in">
                    {filterData(audios).map(audio => (
                      <AudioCard key={`audio-${audio.id}`} audio={audio} isSaved={checkIfSaved(audio.id, 'audio')} onToggleSave={() => toggleSave(audio.id, 'audio')} />
                    ))}
                  </div>
                )}

                {activeTab === 'retos' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    {filterData(retos).map(reto => (
                      <ChallengeCard 
                        key={`reto-${reto.id}`} 
                        reto={reto} // <--- Asegúrate que diga 'reto' aquí
                        isSaved={checkIfSaved(reto.id, 'reto')} 
                        onToggleSave={() => toggleSave(reto.id, 'reto')} 
                      />
                    ))}
                  </div>
                )}

                {activeTab === 'hooks' && (
                  <div className="space-y-4 animate-fade-in">
                    {filterData(hooks).map(hook => (
                      <HookCard key={`hook-${hook.id}`} hook={hook} isSaved={checkIfSaved(hook.id, 'hook')} onToggleSave={() => toggleSave(hook.id, 'hook')} />
                    ))}
                  </div>
                )}

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
                            {audios.filter(a => checkIfSaved(a.id, 'audio')).map(audio => (
                              <AudioCard key={`saved-audio-${audio.id}`} audio={audio} isSaved={true} onToggleSave={() => toggleSave(audio.id, 'audio')} />
                            ))}
                          </div>
                        )}
                        {savedItems.some(item => item.type === 'reto') && (
                          <div className="space-y-4">
                            <h3 className="font-bold text-yellow-500 border-b border-gray-800 pb-2">Retos Guardados</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {retos.filter(r => checkIfSaved(r.id, 'reto')).map(reto => (
                                <ChallengeCard key={`saved-reto-${reto.id}`} reto={reto} isSaved={true} onToggleSave={() => toggleSave(reto.id, 'reto')} />
                              ))}
                            </div>
                          </div>
                        )}
                        {savedItems.some(item => item.type === 'hook') && (
                          <div className="space-y-4">
                            <h3 className="font-bold text-purple-500 border-b border-gray-800 pb-2">Ganchos Guardados</h3>
                            {hooks.filter(h => checkIfSaved(h.id, 'hook')).map(hook => (
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