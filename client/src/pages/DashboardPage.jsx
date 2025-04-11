import React, { useState } from 'react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div>Dobrodošli! Ovo je pregled vašeg računa.</div>;
      case 'listings':
        return <div>Ovdje ćete uređivati vaše oglase.</div>;
      case 'inquiries':
        return <div>Ovdje možete pregledati i upravljati upitima.</div>;
      case 'comments':
        return <div>Ovdje vidite komentare vaših gostiju.</div>;
      case 'invite':
        return <div>Pozovite prijatelja i ostvarite pogodnosti!</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-6 shadow md:min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Korisnički panel</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              🏠 Pregled
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('listings')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'listings' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              📄 Oglasi
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              📬 Upiti
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('comments')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'comments' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              💬 Komentari
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('invite')}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === 'invite' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              🎁 Pozovi prijatelja
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DashboardPage;

