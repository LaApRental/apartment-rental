// pages/DashboardPage.jsx
import React, { useState } from 'react';

const tabs = [
  { key: 'overview', label: 'Početna' },
  { key: 'listings', label: 'Oglasi' },
  { key: 'inquiries', label: 'Upiti' },
  { key: 'comments', label: 'Komentari' },
  { key: 'invite', label: 'Pozovi prijatelja' }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return <p>📄 Ovdje će biti vaši oglasi za uređivanje.</p>;
      case 'inquiries':
        return <p>📬 Pregled i upravljanje upitima gostiju.</p>;
      case 'comments':
        return <p>💬 Upravljanje komentarima i recenzijama.</p>;
      case 'invite':
        return <p>🎁 Pozovite prijatelje i zaradite popuste.</p>;
      default:
        return <p>👋 Dobrodošli! Odaberite sekciju s lijeve strane.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f7f7f7] font-sans">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Korisnički panel</h1>
        </div>
        <nav className="flex md:flex-col md:space-y-1 p-4 md:p-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-left rounded-md hover:bg-gray-100 ${
                activeTab === tab.key ? 'bg-gray-200 font-semibold' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
