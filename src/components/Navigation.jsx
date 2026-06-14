export default function Navigation({ activeTab, setActiveTab }) {
  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 px-2 text-sm font-semibold rounded-t-lg transition-colors cursor-pointer ${
        activeTab === id 
          ? 'bg-gray-800 text-pink-500 border-b-2 border-pink-500' 
          : 'bg-gray-900 text-gray-400 hover:text-white'
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <nav className="max-w-4xl mx-auto flex mt-2 px-2 overflow-x-auto scrollbar-hide">
      <TabButton id="dashboard" label="Dashboard" icon="📊" />
      <TabButton id="audios" label="Audios" icon="🎵" />
      <TabButton id="retos" label="Retos" icon="🏆" />
      <TabButton id="hooks" label="Ganchos" icon="🪝" />
      <TabButton id="guardados" label="Guardados" icon="🔖" />
    </nav>
  );
}