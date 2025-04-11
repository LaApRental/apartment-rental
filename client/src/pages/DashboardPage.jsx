// src/pages/DashboardPage.jsx
import React, { useState } from 'react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Pregled' },
    { key: 'listings', label: 'Moji Oglasi' },
    { key: 'inquiries', label: 'Upiti' },
    { key: 'comments', label: 'Komentari' },
    { key: 'invite', label: 'Pozovi prijatelja' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r">
        <div className="p-6 font-bold text-lg">Korisnički Panel</div>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 ${
                activeTab === tab.key ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'listings' && <Listings />}
        {activeTab === 'inquiries' && <Inquiries />}
        {activeTab === 'comments' && <Comments />}
        {activeTab === 'invite' && <Invite />}
      </main>
    </div>
  );
};

// Dummy content components (we’ll improve each next)
const Overview = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Dobrodošli natrag 👋</h2>
    <p className="text-gray-600">Ovdje možete pregledati sažetak svog računa.</p>
  </div>
);

const Listings = () => <div>📝 Ovdje će biti vaši oglasi.</div>;
const Inquiries = () => <div>📩 Ovdje pregledavate upite.</div>;
const Comments = () => <div>💬 Ovdje su komentari gostiju.</div>;
const Invite = () => <div>🎁 Pozovite prijatelje i ostvarite pogodnosti.</div>;

export default DashboardPage;
