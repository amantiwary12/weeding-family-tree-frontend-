import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DownloadPDFButton from '../components/DownloadPDFButton';

const BACKEND = 'https://wedding-family-tree-backend.onrender.com';

export default function TreeView() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND}/api/people`)
      .then(res => setPeople(res.data))
      .catch(err => console.error(err));
  }, []);

  const getParents = (person) => person.parent_ids.map(pid => people.find(p => p._id === pid)?.name).join(', ');

  return (
    <div className="min-h-screen bg-rose-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8" id="family-tree">
        <h1 className="text-3xl font-bold text-center text-rose-600 mb-6">Family Tree</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {people.map(person => (
            <div key={person._id} className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-4 shadow-md">
              {person.photo_url ? (
                <img src={`${BACKEND}${person.photo_url}`} alt={person.name} className="w-16 h-16 rounded-full object-cover"/>
              ) : (
                <div className="w-16 h-16 rounded-full bg-rose-200 flex items-center justify-center text-white font-bold">{person.name[0]}</div>
              )}
              <div>
                <p className="font-semibold">{person.name}</p>
                <p className="text-sm text-gray-600">{person.relation_label} ({person.gender})</p>
                {person.parent_ids.length > 0 && (
                  <p className="text-xs text-gray-500">Parents: {getParents(person)}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <DownloadPDFButton targetId="family-tree" fileName="family_tree.pdf" />
        </div>
      </div>
    </div>
  );
}
