import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterNew = () => {
  const navigate = useNavigate();
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
    mobilni: '',
    fiksni: '',
    korisnikTip: 'privatni'
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPrivatni = userType === 'privatni';
    const isPravne = userType === 'pravne';

    if (!agree) {
      alert("Morate prihvatiti uvjete korištenja.");
      return;
    }

    if (
      !formData.ime ||
      !formData.prezime ||
      !formData.email ||
      !formData.oib ||
      !formData.adresa ||
      !formData.postanskiBroj ||
      !formData.grad ||
      !formData.mobilni ||
      (isPravne && !formData.nazivTvrtke)
    ) {
      alert("Molimo ispunite sva obavezna polja.");
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
        alert(result.error || 'Registracija nije uspjela.');
      } else {
        alert('Registracija uspješna!');
        setFormData({
          ime: '',
          prezime: '',
          email: '',
          oib: '',
          nazivTvrtke: '',
          adresa: '',
          postanskiBroj: '',
          grad: '',
          mobilni: '',
          fiksni: '',
          korisnikTip: userType
        });
        setAgree(false);
        navigate('/login');
      }
    } catch (err) {
      alert('Greška na klijentu.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow-md p-8 w-full max-w-6xl space-y-4">
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => {
              setUserType('privatni');
              setFormData((prev) => ({ ...prev, korisnikTip: 'privatni' }));
            }}
            className={`flex-1 px-4 py-2 rounded border font-medium ${
              userType === 'privatni' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
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
            className={`flex-1 px-4 py-2 rounded border font-medium ${
              userType === 'pravne' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pravne osobe
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" name="ime" value={formData.ime} onChange={handleChange} placeholder="Ime" className="p-2 border rounded" />
            <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} placeholder="Prezime" className="p-2 border rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="p-2 border rounded" />
            <input type="text" name="oib" value={formData.oib} onChange={handleChange} placeholder={userType === 'privatni' ? 'OIB' : 'OIB tvrtke'} className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {userType === 'privatni' ? (
              <input type="text" name="adresa" value={formData.adresa} onChange={handleChange} placeholder="Adresa" className="p-2 border rounded md:col-span-2" />
            ) : (
              <>
                <input type="text" name="nazivTvrtke" value={formData.nazivTvrtke} onChange={handleChange} placeholder="Naziv tvrtke" className="p-2 border rounded" />
                <input type="text" name="adresa" value={formData.adresa} onChange={handleChange} placeholder="Adresa" className="p-2 border rounded" />
              </>
            )}
            <input type="text" name="postanskiBroj" value={formData.postanskiBroj} onChange={handleChange} placeholder="Poštanski broj" className="p-2 border rounded" />
            <input type="text" name="grad" value={formData.grad} onChange={handleChange} placeholder="Grad" className="p-2 border rounded" />
            <input type="text" name="mobilni" value={formData.mobilni} onChange={handleChange} placeholder="Mobilni telefon" className="p-2 border rounded" />
            <input type="text" name="fiksni" value={formData.fiksni} onChange={handleChange} placeholder="Fiksni telefon" className="p-2 border rounded" />
          </div>

          <label className="flex items-start space-x-2 text-sm">
            <input type="checkbox" name="prihvacamUvijete" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
            <span>Pročitao/la sam i slažem se s uvijetima i pravilima oglašavanja na _____________ katalozima.</span>
          </label>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Registriraj se!
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNew;
