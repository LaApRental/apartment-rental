import React, { useState } from 'react';

const languages = [
  { code: 'hr', label: 'Hrvatski' },
  { code: 'en', label: 'Engleski' },
  { code: 'de', label: 'Njemački' },
  { code: 'it', label: 'Talijanski' },
  { code: 'fr', label: 'Francuski' },
  { code: 'sl', label: 'Slovenski' },
  { code: 'pl', label: 'Poljski' },
  { code: 'cs', label: 'Češki' },
  { code: 'hu', label: 'Mađarski' },
  { code: 'ro', label: 'Rumunjski' },
  { code: 'nl', label: 'Nizozemski' },
  { code: 'es', label: 'Španjolski' },
  { code: 'da', label: 'Danski' },
  { code: 'ru', label: 'Ruski' }
];

const HostProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLang, setSelectedLang] = useState('hr');
  const [descriptions, setDescriptions] = useState({});
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescriptions({
      ...descriptions,
      [selectedLang]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTranslate = () => {
    alert('🟡 Integracija Google Translate API će biti dodana ovdje.');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">🧑‍💼 Profil domaćina</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Ime:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Prezime:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Fotografija domaćina:</label>
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />}
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Odaberite jezik opisa:</label>
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="w-full border p-2 rounded">
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Opis:</label>
        <textarea
          rows={6}
          value={descriptions[selectedLang] || ''}
          onChange={handleDescriptionChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => alert('✅ Spremanje...')}>
          Spremi profil
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleTranslate}>
          Prevedi opis na ostale jezike
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
