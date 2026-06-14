export const SkeletonCard = () => (
  <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-between border border-gray-700 animate-pulse">
    <div className="flex items-center gap-4 w-full">
      {/* Círculo del botón Play */}
      <div className="w-12 h-12 bg-gray-700 rounded-full shrink-0"></div>
      
      {/* Textos y Badges */}
      <div className="w-full space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-gray-700 rounded-full w-16"></div>
          <div className="h-5 bg-gray-700 rounded-full w-16"></div>
        </div>
      </div>
    </div>
    
    {/* Columna derecha (Corazón y métrica) */}
    <div className="flex flex-col items-end gap-3 shrink-0">
      <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
      <div className="h-5 bg-gray-700 rounded w-12 mt-2"></div>
    </div>
  </div>
);