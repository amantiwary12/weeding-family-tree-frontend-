// 📄 src/components/CompactTreeLayout.jsx
import React from 'react';
import FamilyMemberCard from './FamilyMemberCard';

const CompactTreeLayout = ({ people, side, onDelete, BACKEND_URL }) => {
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
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 bg-white/80 px-3 py-1 rounded-lg shadow-sm">
            {title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {members.map(person => (
              <div key={person._id} className="transform hover:scale-105 transition-transform duration-300">
                <FamilyMemberCard
                  person={person}
                  BACKEND_URL={BACKEND_URL}
                  onDelete={onDelete}
                  showSmallDelete={true}
                  compact={true} // Use compact mode
                />
              </div>
            ))}
          </div>
          {showConnector && (
            <div className="w-1 h-8 bg-gradient-to-b from-rose-300 to-amber-300 rounded-full mt-3 mx-auto"></div>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col items-center space-y-4 w-full py-4 px-2">
      <GenerationSection 
        title="Grandparents" 
        members={grandparents} 
        showConnector={parents.length > 0}
      />
      
      <GenerationSection 
        title="Parents" 
        members={parents} 
        showConnector={children.length > 0 || siblings.length > 0}
      />
      
      {(children.length > 0 || siblings.length > 0) && (
        <GenerationSection 
          title="Current Gen" 
          members={[...children, ...siblings]} 
        />
      )}
      
      <GenerationSection title="Spouses" members={spouses} />
      <GenerationSection title="Others" members={others} />
    </div>
  );
};

export default CompactTreeLayout;