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
  const [errors, setErrors] = useState({});
  const [showAgreeError, setShowAgreeError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
    if (name === 'prihvacamUvijete') {
      setShowAgreeError(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData((prev) => ({ ...prev, korisnikTip: type }));
    setErrors({});
    setShowAgreeError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'ime',
      'prezime',
      'email',
      'oib',
      'adresa',
      'postanskiBroj',
      'grad',
      'mobilni',
      ...(userType === 'pravne' ? ['nazivTvrtke'] : [])
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });

    if (!agree) setShowAgreeError(true);
    setErrors(newErrors);

    if (!agree || Object.keys(newErrors).length > 0) return;

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
        localStorage.setItem('registrationSuccess', JSON.stringify({
          ime: formData.ime,
          prezime: formData.prezime
        }));
        navigate('/login');
      }
    } catch (err) {
      alert('Greška na klijentu.');
    }
  };

  const renderInput = (name, placeholder, type = 'text') => (
    <div className="flex flex-col">
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`p-2 border rounded ${errors[name] ? 'border-red-500' : ''}`}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow-md p-8 w-full max-w-6xl space-y-4">
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleUserTypeChange('privatni')}
            className={`flex-1 px-4 py-2 rounded border font-medium ${userType === 'privatni' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Privatni korisnici
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange('pravne')}
            className={`flex-1 px-4 py-2 rounded border font-medium ${userType === 'pravne' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pravne osobe
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {renderInput('ime', 'Ime')}
            {renderInput('prezime', 'Prezime')}
            {renderInput('email', 'E-mail', 'email')}
            {renderInput('oib', userType === 'privatni' ? 'OIB' : 'OIB tvrtke')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {userType === 'privatni' ? (
              <div className="md:col-span-2">{renderInput('adresa', 'Adresa')}</div>
            ) : (
              <>
                {renderInput('nazivTvrtke', 'Naziv tvrtke')}
                {renderInput('adresa', 'Adresa')}
              </>
            )}
            {renderInput('postanskiBroj', 'Poštanski broj')}
            {renderInput('grad', 'Grad')}
            {renderInput('mobilni', 'Mobilni telefon')}
            {renderInput('fiksni', 'Fiksni telefon')}
          </div>

          <div className="flex flex-col text-sm">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="prihvacamUvijete"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setShowAgreeError(false);
                }}
                className={`mt-1 ${showAgreeError ? 'ring-2 ring-red-500' : ''}`}
              />
              <span>Pročitao/la sam i slažem se s uvijetima i pravilima oglašavanja na _____________ katalozima.</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Registriraj se!
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNew;
