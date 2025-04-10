
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterNew() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('privatni');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    oib: '',
    nazivTvrtke: '',
    adresa: '',
    postanskiBroj: '',
    grad: '',
    mobitel: '',
    fiksni: '',
    prihvacamUvijete: false,
    korisnikTip: 'privatni'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.prihvacamUvijete) {
      alert('Molimo označite da se slažete s uvjetima.');
      return;
    }

    try {
      const response = await fetch('https://apartment-rental.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Neuspješna registracija.');
      } else {
        setFormData({
          ime: '',
          prezime: '',
          email: '',
          oib: '',
          nazivTvrtke: '',
          adresa: '',
          postanskiBroj: '',
          grad: '',
          mobitel: '',
          fiksni: '',
          prihvacamUvijete: false,
          korisnikTip: userType
        });
        setShowSuccessModal(true);
      }
    } catch (err) {
      alert('Greška prilikom slanja podataka.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow-md p-8 w-full max-w-6xl space-y-4">
        <div class="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => {
              setUserType('privatni');
              setFormData((prev) => ({ ...prev, korisnikTip: 'privatni' }));
            }}
            className={`flex-1 px-4 py-2 rounded border ${
              userType === 'privatni' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Privatni korisnici
          </button>
          <button
            type="button"
            onClick={() => {
              setUserType('pravne');
              setFormData((prev) => ({ ...prev, korisnikTip: 'pravne' }));
            }}
            className={`flex-1 px-4 py-2 rounded border ${
              userType === 'pravne' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pravne osobe
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input fields go here */}
          <label className="flex items-start space-x-2 text-sm">
            <input type="checkbox" name="prihvacamUvijete" checked={formData.prihvacamUvijete} onChange={handleChange} className="mt-1" />
            <span>Pročitao/la sam i slažem se s uvijetima i pravilima oglašavanja na _____________ katalozima.</span>
          </label>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Registriraj se!
          </button>
        </form>
      </div>

      {/* Custom Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-md">
            <h2 className="text-lg font-bold mb-4">Registracija uspješna!</h2>
            <button onClick={() => setShowSuccessModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              U redu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
