import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function LoginPage() {
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
            try {
              const res = await fetch('https://apartment-rental.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
              });
          
              const result = await res.json();
          
              if (!res.ok) {
                console.error('❌ Login failed:', result);
                return alert(result.error || 'Neuspješna prijava.');
              }
          
              console.log('✅ Login successful. Redirecting to dashboard...');
              localStorage.setItem('user', JSON.stringify(result.user || { email }));
              alert('Uspješna prijava!');
              navigate('/dashboard');
          
            } catch (err) {
              console.error('💥 Network or redirect error:', err);
              alert('Greška na mreži!');
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
          <div className="bg-green-100 border border-green-400 text-green-700 text-sm p-3 rounded">
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

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Prijavi se
        </button>
      </form>
    </div>
  );
}
