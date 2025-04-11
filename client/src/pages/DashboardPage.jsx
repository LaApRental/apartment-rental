import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { key: 'overview', label: 'Početna' },
  { key: 'listings', label: 'Oglasi' },
  { key: 'inquiries', label: 'Upiti' },
  { key: 'comments', label: 'Komentari' },
  { key: 'invite', label: 'Pozovi prijatelja' }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link to="#" onClick={() => setActiveTab('listings')}>
        <div className="bg-white rounded-lg shadow hover:shadow-md p-5 transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">✏️ Uređivanje oglasa</h2>
          <p className="text-sm text-gray-600">Kliknite za uređivanje svojih oglasa.</p>
        </div>
      </Link>

      <Link to="#" onClick={() => setActiveTab('inquiries')}>
        <div className="bg-white rounded-lg shadow hover:shadow-md p-5 transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">📨 Pregled upita</h2>
          <p className="text-sm text-gray-600">Upravljajte upitima svojih gostiju.</p>
        </div>
      </Link>

      <Link to="#" onClick={() => setActiveTab('comments')}>
        <div className="bg-white rounded-lg shadow hover:shadow-md p-5 transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">💬 Komentari gostiju</h2>
          <p className="text-sm text-gray-600">Odgovorite na komentare i recenzije.</p>
        </div>
      </Link>

      <Link to="#" onClick={() => setActiveTab('invite')}>
        <div className="bg-white rounded-lg shadow hover:shadow-md p-5 transition cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">🎁 Pozovite prijatelja</h2>
          <p className="text-sm text-gray-600">Zaradite popuste pozivom prijatelja.</p>
        </div>
      </Link>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return <div>📝 Ovdje dolazi popis i uređivanje oglasa.</div>;
      case 'inquiries':
        return <div>📬 Ovdje su svi vaši upiti.</div>;
      case 'comments':
        return <div>💬 Ovdje možete pregledavati i odgovarati na komentare.</div>;
      case 'invite':
        return <div>🎉 Podijelite svoj referral link i ostvarite popuste!</div>;
      default:
        return renderOverview();
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

        <div className="bg-white rounded-lg shadow p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
