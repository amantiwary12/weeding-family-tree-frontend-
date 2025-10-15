// 📄 src/components/SidePanel.jsx
import React from 'react';

const SidePanel = ({ 
  ref, 
  side, 
  title, 
  icon, 
  count, 
  children, 
  gradientFrom, 
  gradientTo, 
  borderColor 
}) => {
  return (
    <div 
      ref={ref}
      className={`flex-1 flex flex-col border-r border-${borderColor}/50 bg-gradient-to-br from-${gradientFrom}/80 to-${gradientTo}/60 relative overflow-y-auto`}
    >
      <div className={`text-center py-4 bg-gradient-to-r from-${borderColor}-500/10 to-${gradientTo}-500/10 backdrop-blur-sm border-b border-${borderColor}-200/30 sticky top-0 z-10`}>
        <h2 className="text-3xl font-bold text-gray-800 font-serif flex items-center justify-center space-x-3">
          <span className="animate-bounce">{icon}</span>
          <span>{title}</span>
          <span className={`text-2xl bg-${borderColor}-500 text-white px-3 py-1 rounded-full`}>
            {count}
          </span>
        </h2>
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SidePanel;