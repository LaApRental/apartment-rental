import React, { useState } from 'react';
import Overview from './DashboardTabs/Overview';
import Listings from './DashboardTabs/Listings';
import Inquiries from './DashboardTabs/Inquiries';
import Comments from './DashboardTabs/Comments';
import InviteFriend from './DashboardTabs/InviteFriend';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'listings': return <Listings />;
      case 'inquiries': return <Inquiries />;
      case 'comments': return <Comments />;
      case 'invite': return <InviteFriend />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">👤 Dobrodošli u korisnički panel</h1>

        <div className="flex space-x-4 mb-4 border-b pb-2">
          {[
            { id: 'overview', label: '📊 Početna' },
            { id: 'listings', label: '🏡 Oglasi' },
            { id: 'inquiries', label: '📨 Upiti' },
            { id: 'comments', label: '💬 Komentari' },
            { id: 'invite', label: '🎁 Pozovi prijatelja' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t ${
                activeTab === tab.id
                  ? 'bg-white border-b-2 border-blue-600 font-semibold text-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded shadow">{renderTab()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
