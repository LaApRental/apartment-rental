import React, { useState } from 'react';
import OverviewTab from '../components/dashboard/OverviewTab';
import ListingsTab from '../components/dashboard/ListingsTab';
import InquiriesTab from '../components/dashboard/InquiriesTab';
import CommentsTab from '../components/dashboard/CommentsTab';
import InviteTab from '../components/dashboard/InviteTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'listings': return <ListingsTab />;
      case 'inquiries': return <InquiriesTab />;
      case 'comments': return <CommentsTab />;
      case 'invite': return <InviteTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">👤 Korisnički Panel</h1>
        <div className="space-x-4">
          <button onClick={() => setActiveTab('overview')} className={tabStyle(activeTab, 'overview')}>Pregled</button>
          <button onClick={() => setActiveTab('listings')} className={tabStyle(activeTab, 'listings')}>Oglasi</button>
          <button onClick={() => setActiveTab('inquiries')} className={tabStyle(activeTab, 'inquiries')}>Upiti</button>
          <button onClick={() => setActiveTab('comments')} className={tabStyle(activeTab, 'comments')}>Komentari</button>
          <button onClick={() => setActiveTab('invite')} className={tabStyle(activeTab, 'invite')}>Pozovi prijatelja</button>
        </div>
      </header>

      <main className="p-6">
        {renderTab()}
      </main>
    </div>
  );
};

const tabStyle = (current, tab) =>
  `px-4 py-2 rounded ${current === tab
    ? 'bg-blue-600 text-white'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`;

export default Dashboard;
