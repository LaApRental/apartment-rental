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
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '✏️ Uređivanje oglasa', desc: 'Kliknite za uređivanje svojih oglasa.' },
              { title: '📨 Pregled upita', desc: 'Upravljajte svim upitima svojih gostiju.' },
              { title: '💬 Komentari gostiju', desc: 'Pogledajte i odgovorite na komentare gostiju.' },
              { title: '🎁 Pozovite prijatelja', desc: 'Preporučite nas i ostvarite popuste!' }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        );

      case 'listings':
        return <div>📋 Ovdje ide pregled i uređivanje oglasa.</div>;

      case 'inquiries':
        return <div>📨 Ovdje ide pregled i upravljanje upitima.</div>;

      case 'comments':
        return <div>💬 Ovdje možete upravljati komentarima gostiju.</div>;

      case 'invite':
        return <div>🎁 Pozovite prijatelja za dodatne pogodnosti!</div>;

      default:
        return <div>Dobrodošli u korisnički panel.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 sm:px-8 py-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">👋 Dobrodošli u korisnički panel</h1>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
