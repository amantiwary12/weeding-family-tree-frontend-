// 📄 src/components/TreeLayout.jsx
import React from 'react';
import FamilyMemberCard from './FamilyMemberCard';

const TreeLayout = ({ people, side, onDelete, BACKEND_URL, compact = false }) => {
  // Group by relationship type (same as before)
  const grandparents = people.filter(p => 
    p.relation && (
      p.relation.toLowerCase().includes('grand') ||
      p.relation.toLowerCase().includes('grandfather') ||
      p.relation.toLowerCase().includes('grandmother')
    )
  );
  
  const parents = people.filter(p => 
    p.relation && (
      p.relation.toLowerCase().includes('father') ||
      p.relation.toLowerCase().includes('mother') ||
      p.relation.toLowerCase().includes('parent')
    ) && !grandparents.includes(p)
  );
  
  const children = people.filter(p => 
    p.relation && (
      p.relation.toLowerCase().includes('son') ||
      p.relation.toLowerCase().includes('daughter') ||
      p.relation.toLowerCase().includes('child')
    )
  );
  
  const siblings = people.filter(p => 
    p.relation && (
      p.relation.toLowerCase().includes('brother') ||
      p.relation.toLowerCase().includes('sister') ||
      p.relation.toLowerCase().includes('sibling')
    )
  );
  
  const spouses = people.filter(p => 
    p.relation && (
      p.relation.toLowerCase().includes('husband') ||
      p.relation.toLowerCase().includes('wife') ||
      p.relation.toLowerCase().includes('spouse')
    )
  );
  
  const others = people.filter(p => 
    !grandparents.includes(p) && 
    !parents.includes(p) && 
    !children.includes(p) && 
    !siblings.includes(p) && 
    !spouses.includes(p)
  );

  const GenerationSection = ({ title, members, showConnector = false }) => (
    <>
      {members.length > 0 && (
        <div className={`text-center ${compact ? 'mb-2' : 'mb-4'}`}>
          <h3 className={`font-semibold text-gray-700 ${
            compact ? 'text-xs mb-1 bg-white/60 px-2 py-1 rounded' : 'text-lg mb-3 bg-white/80 px-3 py-1 rounded-lg'
          } shadow-sm`}>
            {compact ? 
              (title.includes('Generation') ? title.replace(' Generation', '') : 
               title.includes('Relatives') ? 'Others' : title) 
              : title
            }
          </h3>
          <div className={`flex flex-wrap justify-center ${compact ? 'gap-1' : 'gap-3'}`}>
            {members.map(person => (
              <div key={person._id} className="transform hover:scale-105 transition-transform duration-300">
                <FamilyMemberCard
                  person={person}
                  BACKEND_URL={BACKEND_URL}
                  onDelete={onDelete}
                  showSmallDelete={true}
                  compact={compact}
                />
              </div>
            ))}
          </div>
          {showConnector && (
            <div className={`w-1 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mx-auto ${
              compact ? 'h-4 mt-1' : 'h-6 mt-2'
            }`}></div>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className={`flex flex-col items-center w-full ${
      compact ? 'space-y-2 py-2' : 'space-y-4 py-4'
    }`}>
      <GenerationSection 
        title={compact ? "Grandparents" : "Grandparents Generation"} 
        members={grandparents} 
        showConnector={parents.length > 0}
      />
      
      <GenerationSection 
        title={compact ? "Parents" : "Parents Generation"} 
        members={parents} 
        showConnector={children.length > 0 || siblings.length > 0}
      />
      
      {(children.length > 0 || siblings.length > 0) && (
        <GenerationSection 
          title={compact ? "Current" : "Current Generation"} 
          members={[...children, ...siblings]} 
        />
      )}
      
      <GenerationSection title={compact ? "Spouses" : "Spouses & Partners"} members={spouses} />
      <GenerationSection title={compact ? "Others" : "Other Relatives"} members={others} />
    </div>
  );
};

export default TreeLayout;









// // newwww one ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// v// 📄 src/components/TreeLayout.jsx
// import React from 'react';
// import FamilyMemberCard from './FamilyMemberCard';

// const TreeLayout = ({ people, side, onDelete, BACKEND_URL }) => {
//   // ... (your existing grouping logic remains the same)

//   const TreeLayout = ({ people, side, onDelete, BACKEND_URL })=> (
//     <>
//       {members.length > 0 && (
//         <div className="text-center mb-8">
//           <h3 className="text-xl font-semibold text-gray-700 mb-6 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
//             {title}
//           </h3>
//           <div className="flex flex-wrap justify-center gap-4 min-w-max">
//             {members.map(person => (
//               <div key={person._id} className="transform hover:scale-105 transition-transform duration-300">
//                 <FamilyMemberCard
//                   person={person}
//                   BACKEND_URL={BACKEND_URL}
//                   onDelete={onDelete}
//                   showSmallDelete={true}
//                 />
//               </div>
//             ))}
//           </div>
//           {showConnector && (
//             <div className="w-1 h-12 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mt-6 mx-auto"></div>
//           )}
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="flex flex-col items-center space-y-8 w-full py-8 min-w-max">
//       <GenerationSection 
//         title="Grandparents Generation" 
//         members={grandparents} 
//         showConnector={parents.length > 0 || children.length > 0 || siblings.length > 0}
//       />
      
//       <GenerationSection 
//         title="Parents Generation" 
//         members={parents} 
//         showConnector={children.length > 0 || siblings.length > 0}
//       />
      
//       {(children.length > 0 || siblings.length > 0) && (
//         <GenerationSection 
//           title="Current Generation" 
//           members={[...children, ...siblings]} 
//         />
//       )}
      
//       <GenerationSection title="Spouses & Partners" members={spouses} />
//       <GenerationSection title="Other Relatives" members={others} />
//     </div>
//   );
// };

// export default TreeLayout;