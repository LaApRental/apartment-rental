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
      case 'overview':
        return <div className="p-4">Dobrodošli u korisnički panel!</div>;
      case 'listings':
        return <div className="p-4">Ovdje će biti prikaz Vaših oglasa.</div>;
      case 'inquiries':
        return <div className="p-4">Svi pristigli upiti gostiju.</div>;
      case 'comments':
        return <div className="p-4">Komentari gostiju o vašim oglasima.</div>;
      case 'invite':
        return <div className="p-4">Pozovite prijatelja i zaradite popuste.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Korisnički panel</h1>

        <div className="flex space-x-4 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-black font-semibold text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
