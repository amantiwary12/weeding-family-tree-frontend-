


// 📄 src/components/SidePanel.jsx
import React, { forwardRef } from 'react';

const SidePanel = forwardRef(({ 
  side, 
  title, 
  icon, 
  count, 
  children, 
  gradientFrom, 
  gradientTo, 
  borderColor 
}, ref) => {
  // Use actual color classes instead of dynamic strings
  const getBorderColor = () => {
    if (borderColor === 'blue') return 'border-blue-200';
    if (borderColor === 'pink') return 'border-pink-200';
    return 'border-gray-200';
  };

  const getGradientClasses = () => {
    if (gradientFrom === 'blue' && gradientTo === 'cyan') 
      return 'from-blue-50 to-cyan-50';
    if (gradientFrom === 'pink' && gradientTo === 'rose') 
      return 'from-pink-50 to-rose-50';
    return 'from-gray-50 to-gray-100';
  };

  const getHeaderGradient = () => {
    if (borderColor === 'blue') return 'from-blue-500/10 to-cyan-500/10';
    if (borderColor === 'pink') return 'from-pink-500/10 to-rose-500/10';
    return 'from-gray-500/10 to-gray-500/10';
  };

  const getCountColor = () => {
    if (borderColor === 'blue') return 'bg-blue-500';
    if (borderColor === 'pink') return 'bg-pink-500';
    return 'bg-gray-500';
  };

  return (
    <div 
      ref={ref}
      className={`flex-1 flex flex-col border-r ${getBorderColor()} bg-gradient-to-br ${getGradientClasses()} relative overflow-hidden`}
    >
      {/* HEADER - This part will NOT zoom */}
      <div className={`text-center py-4 bg-gradient-to-r ${getHeaderGradient()} backdrop-blur-sm border-b ${getBorderColor()}/30 sticky top-0 z-10 shrink-0`}>
        <h2 className="text-2xl font-bold text-gray-800 font-serif flex items-center justify-center space-x-3">
          <span className="animate-bounce">{icon}</span>
          <span>{title}</span>
          <span className={`text-xl ${getCountColor()} text-white px-3 py-1 rounded-full`}>
            {count}
          </span>
        </h2>
      </div>

      {/* CONTENT AREA - This is where children (with zoom) will be placed */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
});

SidePanel.displayName = 'SidePanel'; // Add this for better dev tools

export default SidePanel;



