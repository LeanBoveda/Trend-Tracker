export default function ReportView({ onClose }) {
  return (
    <div className="animate-fade-in">
      <button 
        onClick={onClose} 
        className="mb-6 text-pink-500 hover:text-pink-400 font-bold flex items-center gap-2 transition cursor-pointer"
      >
        ← Volver al Dashboard
      </button>

      {/* CABECERA DEL REPORTE */}
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black mb-1">Tendencia: Fitness Phonk</h2>
            <p className="text-gray-400 text-sm">Nicho: Fitness • Plataforma: TikTok</p>
          </div>
          <span className="bg-pink-900/50 text-pink-400 border border-pink-500/50 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            🔥 En su pico
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-900 p-3 rounded-lg text-center border border-gray-700">
            <p className="text-xs text-gray-500 uppercase">Visualizaciones</p>
            <p className="text-xl font-bold text-white">12.4M</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center border border-gray-700">
            <p className="text-xs text-gray-500 uppercase">Crecimiento</p>
            <p className="text-xl font-bold text-green-400">+350%</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center border border-gray-700">
            <p className="text-xs text-gray-500 uppercase">Competencia</p>
            <p className="text-xl font-bold text-yellow-400">Media</p>
          </div>
        </div>
      </div>

      {/* GRÁFICO SIMULADO (Tailwind) */}
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-6">
        <h3 className="font-bold mb-6 text-gray-200">Curva de Crecimiento (Últimos 7 días)</h3>
        <div className="flex items-end justify-between h-40 gap-2">
          {/* Barras del gráfico */}
          <div className="w-1/7 bg-purple-900/40 rounded-t-md h-[10%] group hover:bg-purple-500 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D1</span></div>
          <div className="w-1/7 bg-purple-900/50 rounded-t-md h-[20%] group hover:bg-purple-500 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D2</span></div>
          <div className="w-1/7 bg-purple-900/60 rounded-t-md h-[25%] group hover:bg-purple-500 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D3</span></div>
          <div className="w-1/7 bg-purple-900/70 rounded-t-md h-[40%] group hover:bg-purple-500 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D4</span></div>
          <div className="w-1/7 bg-purple-800/80 rounded-t-md h-[60%] group hover:bg-purple-500 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D5</span></div>
          <div className="w-1/7 bg-purple-700 rounded-t-md h-[80%] group hover:bg-purple-400 transition-colors relative"><span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-xs w-full text-center text-gray-300">D6</span></div>
          <div className="w-1/7 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-md h-[100%] shadow-[0_0_15px_rgba(236,72,153,0.5)] relative">
            <span className="absolute -top-6 text-xs font-bold text-pink-400 w-full text-center">Hoy</span>
          </div>
        </div>
      </div>

      {/* TOP CREADORES */}
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="font-bold mb-4 text-gray-200">Creadores rompiéndola con esto</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-900 p-3 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center font-bold text-sm">G</div>
              <div>
                <p className="font-bold text-sm">@GymBroOficial</p>
                <p className="text-xs text-gray-400">1.2M vistas</p>
              </div>
            </div>
            <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition cursor-pointer">Ver Video</button>
          </div>
          <div className="flex items-center justify-between bg-gray-900 p-3 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center font-bold text-sm">F</div>
              <div>
                <p className="font-bold text-sm">@FitLifeAnna</p>
                <p className="text-xs text-gray-400">850K vistas</p>
              </div>
            </div>
            <button className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition cursor-pointer">Ver Video</button>
          </div>
        </div>
      </div>
    </div>
  );
}