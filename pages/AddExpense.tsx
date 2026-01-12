
import React, { useState } from 'react';
import { db } from '../db';
import { Category } from '../types';

interface AddExpenseProps {
  categories: Category[];
  onSave: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ categories, onSave }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setError('Please enter a valid amount');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }

    db.saveExpense({
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount),
      date,
      category,
      note,
      createdAt: Date.now(),
    });

    onSave();
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Amount (₨)</label>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full text-3xl font-bold border-b-2 border-gray-100 focus:border-indigo-600 outline-none pb-2 transition-colors"
              autoFocus
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Note Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Notes (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What was this for?"
              rows={3}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
      >
        SAVE EXPENSE
      </button>
    </div>
  );
};

export default AddExpense;
