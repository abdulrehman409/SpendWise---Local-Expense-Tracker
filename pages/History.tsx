
import React, { useState } from 'react';
import { Expense } from '../types';
import { db } from '../db';

interface HistoryProps {
  expenses: Expense[];
  onRefresh: () => void;
}

const History: React.FC<HistoryProps> = ({ expenses, onRefresh }) => {
  const [filter, setFilter] = useState<'all' | 'month'>('all');
  
  const filteredExpenses = filter === 'month' 
    ? expenses.filter(e => e.date.startsWith(new Date().toISOString().substring(0, 7)))
    : expenses;

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this expense?')) {
      db.deleteExpense(id);
      onRefresh();
    }
  };

  // Grouping by date
  const grouped = filteredExpenses.reduce((acc, exp) => {
    const date = exp.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exp);
    return acc;
  }, {} as Record<string, Expense[]>);

  const dates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-300">
      <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('month')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'month' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
        >
          This Month
        </button>
      </div>

      {dates.length > 0 ? (
        dates.map(date => (
          <div key={date} className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {new Date(date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
              </h3>
              <span className="text-xs font-bold text-gray-500">
                Total: ₨ {grouped[date].reduce((s, e) => s + e.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {grouped[date].map(exp => (
                <div key={exp.id} className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-lg">
                      {exp.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{exp.category}</p>
                      {exp.note && <p className="text-xs text-gray-400 line-clamp-1">{exp.note}</p>}
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <span className="font-bold text-gray-900 text-lg">₨ {exp.amount.toLocaleString()}</span>
                    <button 
                        onClick={() => handleDelete(exp.id)}
                        className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20">
          <div className="text-gray-200 mb-4 flex justify-center">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
          </div>
          <p className="text-gray-400 font-medium">No expenses found for this period.</p>
        </div>
      )}
    </div>
  );
};

export default History;
