import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/edit-listing">
          <div className="bg-yellow-300 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">✏️ Uređivanje oglasa</h2>
            <p>Kliknite za uređivanje oglasa</p>
          </div>
        </Link>

        <Link to="/inquiries">
          <div className="bg-blue-300 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">📨 Pregled upita</h2>
            <p>Kliknite za upravljanje svim upitima</p>
          </div>
        </Link>

        <Link to="/comments">
          <div className="bg-green-300 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">💬 Komentari gostiju</h2>
            <p>Kliknite za upravljanje komentarima gostiju</p>
          </div>
        </Link>

        <Link to="/invite">
          <div className="bg-pink-300 rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">🎁 Pozovite prijatelja</h2>
            <p>Ostvarite popuste dijeljenjem</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
