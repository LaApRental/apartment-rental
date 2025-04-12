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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div>Dobrodošli u korisnički panel!</div>;
      case 'listings':
        return <div>Ovdje će biti vaši oglasi.</div>;
      case 'inquiries':
        return <div>Ovdje su vaši upiti.</div>;
      case 'comments':
        return <div>Ovdje su komentari gostiju.</div>;
      case 'invite':
        return <div>Podijelite link i pozovite prijatelje.</div>;
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-semibold">Korisnički panel</h1>
          <div></div>
        </header>

        <main className="p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;

