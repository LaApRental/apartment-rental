import React, { useState } from 'react';

const HostProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLang, setSelectedLang] = useState('hr');
  const [descriptions, setDescriptions] = useState({ hr: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescriptions({ ...descriptions, [lang]: value });
  };

  const languages = [
    { code: 'hr', label: 'Hrvatski' },
    { code: 'en', label: 'Engleski' },
    { code: 'de', label: 'Njemački' },
    { code: 'it', label: 'Talijanski' },
    { code: 'fr', label: 'Francuski' },
    { code: 'pl', label: 'Poljski' },
    { code: 'cs', label: 'Češki' },
    { code: 'sl', label: 'Slovenski' },
    { code: 'hu', label: 'Mađarski' },
    { code: 'es', label: 'Španjolski' },
    { code: 'ro', label: 'Rumunjski' },
    { code: 'nl', label: 'Nizozemski' },
    { code: 'da', label: 'Danski' },
    { code: 'ru', label: 'Ruski' }
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded mt-6">
      <h2 className="text-xl font-bold mb-4">👤 Profil domaćina</h2>

      {/* Upload image */}
      <div className="mb-6 text-center">
        {imagePreview ? (
          <img src={imagePreview} alt="Profil" className="w-32 h-32 object-cover rounded-full mx-auto" />
        ) : (
          <img src="/static/img/no_usr_img_big.png" alt="No profile" className="w-32 h-32 mx-auto" />
        )}
        <div className="mt-2">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Ime</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Prezime</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Description + language */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Jezik opisa</label>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Opis ({selectedLang.toUpperCase()})</label>
        <textarea
          rows={6}
          className="w-full p-2 border rounded"
          value={descriptions[selectedLang] || ''}
          onChange={(e) => handleDescriptionChange(selectedLang, e.target.value)}
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Spremi</button>
    </div>
  );
};

export default HostProfile;
