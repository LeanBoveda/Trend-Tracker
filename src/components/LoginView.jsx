import { useState } from 'react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setIsLoading(true);
    
    // Simulamos un retraso de red para darle realismo a la autenticación
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Llamamos a la función que nos deja entrar a la app
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
      
      {/* Tarjeta de Login */}
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Decoración de fondo */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            TrendTracker 🚀
          </h1>
          <p className="text-gray-400 text-sm">Surfea el algoritmo antes que los demás.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Email o Usuario</label>
            <input 
              type="text" 
              placeholder="creador@viral.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-950 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-bold text-gray-300">Contraseña</label>
              <a href="#" className="text-xs text-pink-500 hover:text-pink-400 transition-colors">¿Olvidaste tu clave?</a>
            </div>
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
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex justify-center items-center shadow-lg shadow-purple-500/25 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Ingresar al Radar'
            )}
          </button>
        </form>

        <div className="mt-8 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-800 w-full"></div>
            <span className="bg-gray-900 px-3 text-xs text-gray-500 absolute">O continúa con</span>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-gray-950 border border-gray-800 hover:border-gray-600 text-gray-300 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex justify-center items-center gap-2">
              🎵 TikTok
            </button>
            <button className="flex-1 bg-gray-950 border border-gray-800 hover:border-gray-600 text-gray-300 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex justify-center items-center gap-2">
              📸 Instagram
            </button>
          </div>
        </div>

      </div>
      
      <p className="text-gray-500 text-xs mt-8">
        ¿No tienes cuenta? <a href="#" className="text-purple-400 hover:text-purple-300 font-bold ml-1">Regístrate</a>
      </p>

    </div>
  );
}