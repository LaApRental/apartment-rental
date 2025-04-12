import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  // ✅ Show welcome message after registration
  useEffect(() => {
    const success = localStorage.getItem('registrationSuccess');
    if (success) {
      const data = JSON.parse(success);
      setMessage(`Poštovanje ${data.ime} ${data.prezime}, zahvaljujemo na registraciji! Podaci za prijavu su poslani na vašu e-mail adresu. Molimo provjerite i Vaš "Spam" pretinac!`);
      localStorage.removeItem('registrationSuccess');
    }
  }, []);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const res = await fetch('https://apartment-rental.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      setMessage(result.error || 'Neuspješna prijava.');
      setLoading(false);
      return;
    }

    setMessage('Uspješna prijava! Preusmjeravanje...');
    localStorage.setItem('user', JSON.stringify(result.user || { email }));
    setTimeout(() => navigate('/dashboard'), 1000);

  } catch (err) {
    console.error('💥 Network error:', err);
    setMessage('Greška na mreži!');
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Prijava</h2>

            {message && (
              <div
                className={`text-sm p-3 rounded border ${
                  message.includes('Uspješna')
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : 'bg-red-100 border-red-400 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

<button
  type="submit"
  disabled={loading}
  className={`w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
    loading ? 'opacity-70 cursor-not-allowed' : ''
  }`}
>
  {loading ? (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16z" />
    </svg>
  ) : (
    'Prijavi se'
  )}
</button>
      </form>
    </div>
  );
}
