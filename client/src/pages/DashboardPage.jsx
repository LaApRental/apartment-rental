import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Pregled', href: '/dashboard' },
  { name: 'Oglasi', href: '/dashboard/listings' },
  { name: 'Upiti', href: '/dashboard/inquiries' },
  { name: 'Komentari', href: '/dashboard/comments' },
  { name: 'Pozovi prijatelja', href: '/dashboard/invite' }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Pregled');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Korisnički panel</h1>
          <Link to="/logout" className="text-blue-600 hover:underline text-sm">Odjava</Link>
        </div>
        <nav className="border-t border-gray-200 mt-2">
          <div className="max-w-7xl mx-auto flex space-x-4 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-2 px-3 text-sm font-medium ${
                  activeTab === tab.name ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dobrodošli natrag!</h2>
          <p>Ovdje možete upravljati svojim oglasima, vidjeti upite i komentare gostiju.</p>
          {/* 🔁 We'll swap this content dynamically later based on activeTab */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
