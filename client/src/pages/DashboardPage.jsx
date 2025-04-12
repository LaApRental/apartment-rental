import React, { useState } from 'react';
import {
  FaHome,
  FaListAlt,
  FaEnvelope,
  FaCommentDots,
  FaUserFriends,
  FaBars
} from 'react-icons/fa';

const tabs = [
  { key: 'overview', label: 'Početna', icon: <FaHome /> },
  { key: 'listings', label: 'Oglasi', icon: <FaListAlt /> },
  { key: 'inquiries', label: 'Upiti', icon: <FaEnvelope /> },
  { key: 'comments', label: 'Komentari', icon: <FaCommentDots /> },
  { key: 'invite', label: 'Pozovi prijatelja', icon: <FaUserFriends /> }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('listings')}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition"
            >
              <h2 className="text-lg font-semibold mb-2">✏️ Uređivanje oglasa</h2>
              <p className="text-sm text-gray-600">Kliknite za uređivanje svojih oglasa.</p>
            </div>

            <div
              onClick={() => setActiveTab('inquiries')}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition"
            >
              <h2 className="text-lg font-semibold mb-2">📨 Pregled upita</h2>
              <p className="text-sm text-gray-600">Upravljajte svim upitima svojih gostiju.</p>
            </div>

            <div
              onClick={() => setActiveTab('comments')}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition"
            >
              <h2 className="text-lg font-semibold mb-2">💬 Komentari gostiju</h2>
              <p className="text-sm text-gray-600">Pogledajte i odgovorite na komentare gostiju.</p>
            </div>

            <div
              onClick={() => setActiveTab('invite')}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition"
            >
              <h2 className="text-lg font-semibold mb-2">🎁 Pozovite prijatelja</h2>
              <p className="text-sm text-gray-600">Preporučite nas i ostvarite popuste!</p>
            </div>
          </div>
        );

      case 'listings':
        return <div>📋 Ovdje će biti vaši oglasi.</div>;

      case 'inquiries':
        return <div>📨 Ovdje su vaši upiti.</div>;

      case 'comments':
        return <div>💬 Ovdje su komentari gostiju.</div>;

      case 'invite':
        return <div>🎁 Podijelite link i pozovite prijatelje.</div>;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}>
        <div className="p-4 text-xl font-bold border-b">📋 Panel</div>
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-200 transition ${
                activeTab === tab.key ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-white p-4 shadow flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-semibold">Korisnički panel</h1>
          <div></div>
        </header>

        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
