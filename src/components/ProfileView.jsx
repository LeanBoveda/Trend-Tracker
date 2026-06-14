import { useState } from 'react';
// IMPORTAMOS SUPABASE
import { supabase } from '../supabaseClient.js';

export default function ProfileView({ onClose }) {
  const [name, setName] = useState('Creador Pro');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['TikTok', 'Instagram']);
  const [selectedNiches, setSelectedNiches] = useState(['Fitness', 'Lifestyle']);

  const platforms = ['TikTok', 'Instagram', 'YouTube'];
  const niches = ['Humor', 'Lifestyle', 'Fitness', 'Cocina', 'Emprendimiento', 'Gaming'];

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = () => {
    alert('¡Preferencias guardadas con éxito!');
    onClose();
  };

  // --- LÓGICA DE CERRAR SESIÓN REAL ---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`Error al cerrar sesión: ${error.message}`);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <button 
        onClick={onClose} 
        className="mb-6 text-pink-500 hover:text-pink-400 font-bold flex items-center gap-2 transition cursor-pointer"
      >
        ← Volver
      </button>

      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
        {/* Cabecera del Perfil */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Mi Perfil</h2>
            <p className="text-gray-400 text-sm mt-1">Configura tu radar de tendencias</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Nombre o Username</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Redes Principales</label>
            <div className="flex flex-wrap gap-3">
              {platforms.map(p => (
                <button 
                  key={p} 
                  onClick={() => toggleSelection(p, selectedPlatforms, setSelectedPlatforms)} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    selectedPlatforms.includes(p) 
                      ? 'bg-pink-600/20 border-pink-500 text-pink-400' 
                      : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">Tus Nichos de Contenido</label>
            <div className="flex flex-wrap gap-3">
              {niches.map(n => (
                <button 
                  key={n} 
                  onClick={() => toggleSelection(n, selectedNiches, setSelectedNiches)} 
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    selectedNiches.includes(n) 
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400' 
                      : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACCIONES DEL PIE DE TARJETA */}
        <div className="mt-10 pt-6 border-t border-gray-700 flex justify-between items-center gap-4">
          
          {/* BOTÓN DE LOG OUT */}
          <button 
            onClick={handleLogout} 
            className="border border-red-500/40 hover:bg-red-500/10 text-red-400 font-bold py-3 px-6 rounded-xl transition cursor-pointer flex items-center gap-2 text-sm"
          >
            Cerrar Sesión 🚪
          </button>

          <button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-xl transition cursor-pointer shadow-lg shadow-purple-500/30 text-sm"
          >
            Guardar Configuración
          </button>
          
        </div>
      </div>
    </div>
  );
}