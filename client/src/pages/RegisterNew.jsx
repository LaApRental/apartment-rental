import React, { useState } from 'react';

export function RegisterNew() {
  const [userType, setUserType] = useState('privatni');
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
      <div className="bg-white rounded shadow-md p-8 w-full max-w-6xl space-y-4">
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType('privatni')}
            className={`flex-1 px-4 py-2 rounded border ${
              userType === 'privatni' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Privatni korisnici
          </button>
          <button
            type="button"
            onClick={() => setUserType('pravne')}
            className={`flex-1 px-4 py-2 rounded border ${
              userType === 'pravne' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pravne osobe
          </button>
        </div>

        <form className="space-y-6">
          {/* Row 1: 4 fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" name="ime" value={formData.ime} onChange={handleChange} placeholder="Ime" className="p-2 border rounded" />
            <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} placeholder="Prezime" className="p-2 border rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="p-2 border rounded" />
            <input
              type="text"
              name="oib"
              value={formData.oib}
              onChange={handleChange}
              placeholder={userType === 'privatni' ? 'OIB' : 'OIB tvrtke'}
              className="p-2 border rounded"
            />
          </div>

          {/* Row 2: 6 fixed grid columns */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Column 1 */}
            {userType === 'pravne' ? (
              <input
                type="text"
                name="nazivTvrtke"
                value={formData.nazivTvrtke}
                onChange={handleChange}
                placeholder="Naziv tvrtke"
                className="p-2 border rounded"
              />
            ) : (
              <div className="p-2"></div>
            )}

            {/* Column 2-3: Adresa */}
            <input
              type="text"
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
              placeholder="Adresa"
              className="p-2 border rounded md:col-span-2"
            />

            {/* Column 4 */}
            <input
              type="text"
              name="postanskiBroj"
              value={formData.postanskiBroj}
              onChange={handleChange}
              placeholder="Poštanski broj"
              className="p-2 border rounded"
            />

            {/* Column 5 */}
            <input
              type="text"
              name="grad"
              value={formData.grad}
              onChange={handleChange}
              placeholder="Grad"
              className="p-2 border rounded"
            />

            {/* Column 6 */}
            <input
              type="text"
              name="mobitel"
              value={formData.mobitel}
              onChange={handleChange}
              placeholder="Mobilni telefon"
              className="p-2 border rounded"
            />
          </div>

          {/* Fiksni telefon - always below in its own line */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-5 hidden md:block" />
            <input
              type="text"
              name="fiksni"
              value={formData.fiksni}
              onChange={handleChange}
              placeholder="Fiksni telefon"
              className="p-2 border rounded"
            />
          </div>

          <label className="flex items-start space-x-2 text-sm">
            <input type="checkbox" name="prihvacamUvijete" checked={formData.prihvacamUvijete} onChange={handleChange} className="mt-1" />
            <span>Pročitao/la sam i slažem se s uvijetima i pravilima oglašavanja na _____________ katalozima.</span>
          </label>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Registriraj se!
          </button>
        </form>
      </div>
    </div>
  );
}
