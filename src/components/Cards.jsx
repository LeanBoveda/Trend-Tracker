export const Badge = ({ children, colorClass }) => (
  <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorClass}`}>
    {children}
  </span>
);

export const AudioCard = ({ audio, isSaved, onToggleSave }) => (
  <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between border border-gray-700 hover:border-gray-600 transition">
    <div className="flex items-center gap-4">
      <button className="w-12 h-12 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center text-xl transition-colors cursor-pointer shrink-0">
        ▶️
      </button>
      <div>
        <h3 className="font-bold text-md flex items-center gap-2">
          {audio.title} {audio.isHot && <span title="¡Creciendo rápido!">🔥</span>}
        </h3>
        <p className="text-xs text-gray-400">{audio.artist}</p>
        <div className="flex gap-2 mt-2">
          <Badge colorClass="bg-gray-700 text-gray-300">{audio.platform}</Badge>
          <Badge colorClass="bg-gray-700 text-gray-300">{audio.category}</Badge>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between h-full gap-2">
      <button onClick={onToggleSave} className="text-xl cursor-pointer hover:scale-110 transition-transform" title="Guardar">
        {isSaved ? '💖' : '🤍'}
      </button>
      <div className="text-right">
        <span className="text-green-400 font-black text-lg">{audio.growth}</span>
        <p className="text-[10px] text-gray-500 uppercase">En 24h</p>
      </div>
    </div>
  </div>
);

export const ChallengeCard = ({ reto, isSaved, onToggleSave }) => (
  <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 flex flex-col justify-between relative">
    <button onClick={onToggleSave} className="absolute top-4 right-4 text-xl cursor-pointer hover:scale-110 transition-transform z-10" title="Guardar">
      {isSaved ? '💖' : '🤍'}
    </button>
    <div>
      <div className="flex justify-between items-start mb-2 pr-8">
        <h3 className="font-bold text-lg">{reto.title}</h3>
      </div>
      <Badge colorClass={
        reto.competition === 'Bajo' ? 'bg-green-900/50 text-green-400 border border-green-500/50 mb-3 inline-block' : 
        reto.competition === 'Medio' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/50 mb-3 inline-block' : 
        'bg-red-900/50 text-red-400 border border-red-500/50 mb-3 inline-block'
      }>
        Comp: {reto.competition}
      </Badge>
      <div className="flex gap-2 mb-4">
        <span className="text-xs text-gray-400">📍 {reto.platform}</span>
        <span className="text-xs text-gray-400">📂 {reto.category}</span>
      </div>
      <p className="text-sm text-gray-300 bg-gray-900 p-3 rounded-lg border border-gray-700 border-l-4 border-l-purple-500">
        <span className="block text-xs font-bold text-purple-400 mb-1">CÓMO ADAPTARLO:</span>
        {reto.guide}
      </p>
    </div>
  </div>
);

export const HookCard = ({ hook, isSaved, onToggleSave }) => (
  <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 relative group pr-24">
    <p className="text-lg font-medium">"{hook.text}"</p>
    <div className="mt-3 flex gap-2">
      <Badge colorClass="bg-purple-900/50 text-purple-300">💡 {hook.concept}</Badge>
    </div>
    <div className="absolute top-4 right-4 flex gap-2">
      <button onClick={onToggleSave} className="text-xl cursor-pointer hover:scale-110 transition-transform" title="Guardar">
        {isSaved ? '💖' : '🤍'}
      </button>
      <button 
        className="text-gray-400 hover:text-white bg-gray-700 p-1.5 rounded-lg opacity-80 hover:opacity-100 transition cursor-pointer"
        onClick={() => alert('¡Gancho copiado al portapapeles!')}
        title="Copiar gancho"
      >
        📋
      </button>
    </div>
  </div>
);