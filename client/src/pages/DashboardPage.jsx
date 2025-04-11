import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Moja kontrolna ploča</h1>
          <Link to="/logout" className="text-sm text-blue-600 hover:underline">Odjava</Link>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            to="/edit-listing"
            title="Uređivanje oglasa"
            description="Kliknite za uređivanje oglasa"
            emoji="✏️"
          />
          <Card
            to="/inquiries"
            title="Pregled upita"
            description="Kliknite za upravljanje upitima"
            emoji="📨"
          />
          <Card
            to="/comments"
            title="Komentari gostiju"
            description="Upravljajte komentarima gostiju"
            emoji="💬"
          />
          <Card
            to="/invite"
            title="Pozovite prijatelja"
            description="Ostvarite popuste dijeljenjem"
            emoji="🎁"
          />
        </div>
      </main>
    </div>
  );
};

const Card = ({ to, title, description, emoji }) => (
  <Link to={to} className="transform hover:scale-105 transition-transform">
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
      <div className="text-3xl mb-2">{emoji}</div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </Link>
);

export default DashboardPage;
