import React, { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Početna' },
  { id: 'listings', label: 'Oglasi' },
  { id: 'inquiries', label: 'Upiti' },
  { id: 'comments', label: 'Komentari' },
  { id: 'invite', label: 'Pozovi prijatelja' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Korisnički panel</h1>
        <div className="text-sm text-gray-500">Dobrodošli natrag!</div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'overview' && <p>Dobrodošli u korisnički panel. Ovdje možete upravljati svojim oglasima.</p>}
        {activeTab === 'listings' && <p>Ovdje će biti prikazani vaši oglasi.</p>}
        {activeTab === 'inquiries' && <p>Svi vaši upiti gostiju bit će ovdje.</p>}
        {activeTab === 'comments' && <p>Pregledajte komentare svojih gostiju.</p>}
        {activeTab === 'invite' && <p>Pošaljite pozivnicu prijateljima i ostvarite popuste!</p>}
      </div>
    </div>
  );
}
