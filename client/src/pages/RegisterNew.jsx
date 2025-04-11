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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Registracija</h2>
        {/* form inputs go here */}
        <div className="my-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            <span>Pročitao/la sam i slažem se s uvjetima i pravilima oglašavanja</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Registriraj se
        </button>
      </form>
    </div>
  );
};

export default RegisterNew;
