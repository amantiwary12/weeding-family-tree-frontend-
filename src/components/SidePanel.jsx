// // 📄 src/components/SidePanel.jsx
// import React, { forwardRef } from 'react';

// const SidePanel = forwardRef(({ 
//   side, 
//   title, 
//   icon, 
//   count, 
//   children, 
//   gradientFrom, 
//   gradientTo, 
//   borderColor 
// }, ref) => {
//   return (
//     <div 
//       ref={ref}
//       className={`flex-1 flex flex-col border-r border-${borderColor}/50 bg-gradient-to-br from-${gradientFrom}/80 to-${gradientTo}/60 relative overflow-y-auto`}
//     >
//       <div className={`text-center py-4 bg-gradient-to-r from-${borderColor}-500/10 to-${gradientTo}-500/10 backdrop-blur-sm border-b border-${borderColor}-200/30 sticky top-0 z-10`}>
//         <h2 className="text-3xl font-bold text-gray-800 font-serif flex items-center justify-center space-x-3">
//           <span className="animate-bounce">{icon}</span>
//           <span>{title}</span>
//           <span className={`text-2xl bg-${borderColor}-500 text-white px-3 py-1 rounded-full`}>
//             {count}
//           </span>
//         </h2>
//       </div>

//       <div className="flex-1">
//         {children}
//       </div>
//     </div>
//   );
// });

// export default SidePanel;




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

export default SidePanel;





// // new one //////////////////////////////////////////////////////////////////////////////////////////////////////
// // 📄 src/components/SidePanel.jsx
// import React from 'react';

// const SidePanel = ({ 
//   ref, 
//   side, 
//   title, 
//   icon, 
//   count, 
//   children, 
//   gradientFrom, 
//   gradientTo, 
//   borderColor 
// }) => {
//   const colorConfig = {
//     blue: {
//       gradientFrom: 'from-blue-50',
//       gradientTo: 'to-cyan-50',
//       borderColor: 'border-blue-200',
//       bgColor: 'bg-blue-500',
//       headerGradientFrom: 'from-blue-500',
//       headerGradientTo: 'to-cyan-500'
//     },
//     pink: {
//       gradientFrom: 'from-pink-50',
//       gradientTo: 'to-rose-50',
//       borderColor: 'border-pink-200',
//       bgColor: 'bg-pink-500',
//       headerGradientFrom: 'from-pink-500',
//       headerGradientTo: 'to-rose-500'
//     }
//   };

//   const colors = colorConfig[borderColor] || colorConfig.blue;

//   return (
//     <div 
//       ref={ref}
//       className={`flex-1 flex flex-col border-r ${colors.borderColor}/50 bg-gradient-to-br ${colors.gradientFrom}/80 ${colors.gradientTo}/60 relative overflow-hidden min-w-[50vw]`}
//     >
//       <div className={`text-center py-4 bg-gradient-to-r ${colors.headerGradientFrom}/10 ${colors.headerGradientTo}/10 backdrop-blur-sm border-b ${colors.borderColor}/30 sticky top-0 z-10`}>
//         <h2 className="text-3xl font-bold text-gray-800 font-serif flex items-center justify-center space-x-3">
//           <span className="animate-bounce">{icon}</span>
//           <span>{title}</span>
//           <span className={`text-2xl ${colors.bgColor} text-white px-3 py-1 rounded-full`}>
//             {count}
//           </span>
//         </h2>
//       </div>

//       <div className="flex-1 overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default SidePanel;