
import React, { useState } from 'react';
import { Category } from '../types';

interface CategoriesProps {
  categories: Category[];
  onAdd: (category: Category) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, onAdd }) => {
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('📌');
  const [showAdd, setShowAdd] = useState(false);

  const icons = ['🛒', '🍔', '💸', '🚗', '🏠', '🎬', '💊', '🎓', '🎁', '🔌', '⚽', '✈️', '💻', '🎨'];

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAdd({
      id: Date.now().toString(),
      name: newName.trim(),
      icon: newIcon,
    });
    setNewName('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold text-gray-800">Your Categories</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-indigo-600 text-white p-2 rounded-full shadow-lg"
        >
          {showAdd ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          )}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
            <input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="e.g., Gym"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pick Icon</label>
            <div className="grid grid-cols-7 gap-2">
              {icons.map(icon => (
                <button 
                  key={icon}
                  onClick={() => setNewIcon(icon)}
                  className={`text-xl p-2 rounded-lg transition-colors ${newIcon === icon ? 'bg-indigo-100 ring-2 ring-indigo-600' : 'bg-gray-50'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={handleAdd}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
          >
            Add Category
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
            <span className="text-2xl">{cat.icon}</span>
            <span className="font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
