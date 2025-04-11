import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('oglasi');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'oglasi':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/edit-listing">
              <div className="bg-yellow-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-2">✏️ Uređivanje oglasa</h2>
                <p>Kliknite za uređivanje oglasa</p>
              </div>
            </Link>
          </div>
        );
      case 'upiti':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/inquiries">
              <div className="bg-blue-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-2">📨 Pregled upita</h2>
                <p>Kliknite za upravljanje svim upitima</p>
              </div>
            </Link>
          </div>
        );
      case 'komentari':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/comments">
              <div className="bg-green-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-2">💬 Komentari gostiju</h2>
                <p>Kliknite za upravljanje komentarima gostiju</p>
              </div>
            </Link>
          </div>
        );
      case 'prijatelji':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/invite">
              <div className="bg-pink-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-2">🎁 Pozovite prijatelja</h2>
                <p>Ostvarite popuste dijeljenjem</p>
              </div>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('oglasi')}
            className={`px-4 py-2 rounded-t ${activeTab === 'oglasi' ? 'bg-white shadow font-bold' : 'bg-gray-300'}`}
          >
            Oglasi
          </button>
          <button
            onClick={() => setActiveTab('upiti')}
            className={`px-4 py-2 rounded-t ${activeTab === 'upiti' ? 'bg-white shadow font-bold' : 'bg-gray-300'}`}
          >
            Upiti
          </button>
          <button
            onClick={() => setActiveTab('komentari')}
            className={`px-4 py-2 rounded-t ${activeTab === 'komentari' ? 'bg-white shadow font-bold' : 'bg-gray-300'}`}
          >
            Komentari
          </button>
          <button
            onClick={() => setActiveTab('prijatelji')}
            className={`px-4 py-2 rounded-t ${activeTab === 'prijatelji' ? 'bg-white shadow font-bold' : 'bg-gray-300'}`}
          >
            Pozovi prijatelja
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
