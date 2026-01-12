
import React, { useState, useEffect } from 'react';
import { db } from './db';
import { Expense, Category, ViewMode, LegalType } from './types';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Legal from './pages/Legal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [activeLegal, setActiveLegal] = useState<LegalType>(LegalType.PRIVACY);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setExpenses(db.getExpenses().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setCategories(db.getCategories());
  };

  const handleNavigate = (newView: ViewMode, legalType?: LegalType) => {
    if (legalType) setActiveLegal(legalType);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard expenses={expenses} categories={categories} onNavigate={handleNavigate} />;
      case 'add':
        return <AddExpense categories={categories} onSave={() => { refreshData(); setView('dashboard'); }} />;
      case 'history':
        return <History expenses={expenses} onRefresh={refreshData} />;
      case 'categories':
        return <Categories categories={categories} onAdd={(cat) => { db.addCategory(cat); refreshData(); }} />;
      case 'contact':
        return <Contact />;
      case 'legal':
        return <Legal type={activeLegal} />;
      default:
        return <Dashboard expenses={expenses} categories={categories} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-50 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {view === 'dashboard' && 'SpendWise'}
          {view === 'add' && 'New Expense'}
          {view === 'history' && 'Expense History'}
          {view === 'categories' && 'Categories'}
          {view === 'contact' && 'Contact Us'}
          {view === 'legal' && 'Legal Info'}
        </h1>
        {view !== 'dashboard' && (
          <button onClick={() => setView('dashboard')} className="p-1 hover:bg-indigo-500 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 pb-24 overflow-y-auto">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around p-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')} icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Home" />
        <NavButton active={view === 'history'} onClick={() => setView('history')} icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" label="History" />
        <div className="relative -top-6">
            <button 
                onClick={() => setView('add')}
                className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg transform active:scale-95 transition-transform"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
        </div>
        <NavButton active={view === 'categories'} onClick={() => setView('categories')} icon="M4 6h16M4 10h16M4 14h16M4 18h16" label="Cats" />
        <NavButton active={view === 'contact'} onClick={() => setView('contact')} icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" label="Contact" />
      </nav>

      {/* Footer / Side Drawer Links (accessible via Dashboard) */}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${active ? 'text-indigo-600' : 'text-gray-400'}`}>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
    </svg>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;
