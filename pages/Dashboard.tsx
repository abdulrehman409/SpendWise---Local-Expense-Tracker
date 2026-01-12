
import React from 'react';
import { Expense, Category, ViewMode, LegalType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  expenses: Expense[];
  categories: Category[];
  onNavigate: (view: ViewMode, legalType?: LegalType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ expenses, categories, onNavigate }) => {
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = new Date().toISOString().substring(0, 7);

  const totalToday = expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalMonth = expenses
    .filter(e => e.date.startsWith(thisMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  // Group by category for the chart
  const categoryData = categories.map(cat => ({
    name: cat.name,
    value: expenses
      .filter(e => e.category === cat.name && e.date.startsWith(thisMonth))
      .reduce((sum, e) => sum + e.amount, 0)
  })).filter(d => d.value > 0);

  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-80 uppercase font-semibold">Today</p>
          <h2 className="text-2xl font-bold mt-1">₨ {totalToday.toLocaleString()}</h2>
        </div>
        <div className="bg-emerald-600 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-80 uppercase font-semibold">This Month</p>
          <h2 className="text-2xl font-bold mt-1">₨ {totalMonth.toLocaleString()}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-semibold mb-4 uppercase">Monthly Spend by Category</h3>
        {categoryData.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-400 italic">
            No data for this month yet.
          </div>
        )}
      </div>

      {/* Quick Links / Settings */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Application Links</h3>
        </div>
        <div className="divide-y divide-gray-50">
          <button onClick={() => onNavigate('legal', LegalType.PRIVACY)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 text-left">
            <span className="text-gray-700">Privacy Policy</span>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button onClick={() => onNavigate('legal', LegalType.TERMS)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 text-left">
            <span className="text-gray-700">Terms & Conditions</span>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button onClick={() => onNavigate('legal', LegalType.DISCLAIMER)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 text-left">
            <span className="text-gray-700">Disclaimer</span>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-400 mt-4 px-4">
        Everything is stored locally on your device. We never collect personal data.
      </div>
    </div>
  );
};

export default Dashboard;
