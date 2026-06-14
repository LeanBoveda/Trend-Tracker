import { useState } from 'react';
import { supabase } from '../supabaseClient.js';

export default function RegisterView({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setIsLoading(false);

    if (error) {
      alert(`Error al registrarse: ${error.message}`);
    } else {
      alert('¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
      onBackToLogin(); // Lo mandamos de vuelta al login
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Únete al Radar 🚀
          </h1>
          <p className="text-gray-400 text-sm">Crea tu cuenta para empezar a trackear tendencias.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="tu-email@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Contraseña (mínimo 6 caracteres)</label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex justify-center items-center shadow-lg shadow-pink-500/25 mt-6 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Registrarse Gratis ✨'
            )}
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <button 
            onClick={onBackToLogin} 
            className="text-sm text-gray-400 hover:text-white font-semibold transition-colors cursor-pointer"
          >
            ← Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
}