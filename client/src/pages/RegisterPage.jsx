import React, { useState } from 'react';

export function RegisterPage() {
  const [userType, setUserType] = useState('privatni');
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    email: '',
    oib: '',
    adresa: '',
    postanskiBroj: '',
    grad: '',
    mobitel: '',
    fiksni: '',
    prihvacamUvijete: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow-md p-8 w-full max-w-xl space-y-4">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setUserType('privatni')}
            className={\`px-4 py-2 rounded \${userType === 'privatni' ? 'bg-blue-600 text-white' : 'bg-gray-200'}\`}
          >
            Privatni korisnici
          </button>
          <button
            onClick={() => setUserType('pravne')}
            className={\`px-4 py-2 rounded \${userType === 'pravne' ? 'bg-blue-600 text-white' : 'bg-gray-200'}\`}
          >
            Pravne osobe
          </button>
        </div>

        {userType === 'privatni' && (
          <form className="space-y-4">
            <input type="text" name="ime" value={formData.ime} onChange={handleChange} placeholder="Ime" className="w-full p-2 border rounded" />
            <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} placeholder="Prezime" className="w-full p-2 border rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="w-full p-2 border rounded" />
            <input type="text" name="oib" value={formData.oib} onChange={handleChange} placeholder="OIB" className="w-full p-2 border rounded" />
            <input type="text" name="adresa" value={formData.adresa} onChange={handleChange} placeholder="Adresa" className="w-full p-2 border rounded" />
            <input type="text" name="postanskiBroj" value={formData.postanskiBroj} onChange={handleChange} placeholder="Poštanski broj" className="w-full p-2 border rounded" />
            <input type="text" name="grad" value={formData.grad} onChange={handleChange} placeholder="Grad" className="w-full p-2 border rounded" />
            <input type="text" name="mobitel" value={formData.mobitel} onChange={handleChange} placeholder="Mobilni telefon" className="w-full p-2 border rounded" />
            <input type="text" name="fiksni" value={formData.fiksni} onChange={handleChange} placeholder="Fiksni telefon" className="w-full p-2 border rounded" />

            <label className="flex items-start space-x-2 text-sm">
              <input type="checkbox" name="prihvacamUvijete" checked={formData.prihvacamUvijete} onChange={handleChange} className="mt-1" />
              <span>Pročitao/la sam i slažem se s uvijetima i pravilima oglašavanja na Apartmanija.hr katalozima.</span>
            </label>

            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
              Registriraj se!
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
