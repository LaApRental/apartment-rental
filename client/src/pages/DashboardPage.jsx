import React, { useState, useEffect, useRef } from 'react';
import {
  FaHome,
  FaListAlt,
  FaEnvelope,
  FaCommentDots,
  FaUserFriends,
  FaBars,
  FaUserCircle,
  FaSignOutAlt
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  // Auto-close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleSidebarClickOutside = (e) => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleSidebarClickOutside);
    return () => document.removeEventListener('mousedown', handleSidebarClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div onClick={() => setActiveTab('listings')} className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition">
              <h2 className="text-lg font-semibold mb-2">✏️ Uređivanje oglasa</h2>
              <p className="text-sm text-gray-600">Kliknite za uređivanje svojih oglasa.</p>
            </div>
            <div onClick={() => setActiveTab('inquiries')} className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition">
              <h2 className="text-lg font-semibold mb-2">📨 Pregled upita</h2>
              <p className="text-sm text-gray-600">Upravljajte svim upitima svojih gostiju.</p>
            </div>
            <div onClick={() => setActiveTab('comments')} className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition">
              <h2 className="text-lg font-semibold mb-2">💬 Komentari gostiju</h2>
              <p className="text-sm text-gray-600">Pogledajte i odgovorite na komentare gostiju.</p>
            </div>
            <div onClick={() => setActiveTab('invite')} className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg p-5 transition">
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
      {/* Backdrop for sidebar on mobile */}
      {sidebarOpen && (
          <div
            className={`fixed inset-0 z-30 md:hidden transition-opacity duration-300 ease-in-out 
              ${sidebarOpen ? 'opacity-100 pointer-events-auto bg-black bg-opacity-30' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setSidebarOpen(false)}
          />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
      >
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
        {/* Top Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
              <FaBars size={20} />
            </button>
            <h1 className="text-xl font-semibold">Korisnički panel</h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <FaUserCircle size={24} />
              <span className="font-medium">Profil</span>
            </button>

            {dropdownOpen && (
              <ul
                className={`z-50 text-sm shadow-lg border bg-white 
                  fixed left-0 right-0 top-[60px] w-full rounded-none
                  md:absolute md:top-full md:mt-2 md:w-64 md:right-0 md:left-auto md:rounded-md
                  divide-y divide-gray-200`}
              >
                <li className="px-4 py-3 hover:bg-gray-50 transition flex items-center">
                  <i className="fa-regular fa-user fa-fw fa-lg mr-3 text-gray-600" />
                  <a href="/profil" className="flex-1 text-gray-800">Profil domaćina</a>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition flex items-center">
                  <i className="fa-regular fa-phone fa-fw fa-lg mr-3 text-gray-600" />
                  <a href="/osobni-podaci" className="flex-1 text-gray-800">Osobni podaci i primanje uplata</a>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition flex items-center">
                  <i className="fa-regular fa-lock fa-fw fa-lg mr-3 text-gray-600" />
                  <a href="/lozinka" className="flex-1 text-gray-800">Promjena lozinke</a>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition flex items-center">
                  <i className="fa-regular fa-mobile fa-fw fa-lg mr-3 text-gray-600" />
                  <a href="/sms" className="flex-1 text-gray-800">Viber obavijesti</a>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition flex justify-between items-center">
                  <div className="flex items-center">
                    <i className="fa-regular fa-credit-card fa-fw fa-lg mr-3 text-gray-600" />
                    <a href="/saldo" className="text-gray-800">Saldo</a>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">0,00 EUR</span>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition flex items-center">
                  <FaSignOutAlt className="text-red-500 mr-3" />
                  <a href="/logout" className="text-red-600 font-semibold">Odjava</a>
                </li>
              </ul>
            )}
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
