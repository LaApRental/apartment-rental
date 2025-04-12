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
  const [translated, setTranslated] = useState({});
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescriptions({
      ...descriptions,
      [selectedLang]: e.target.value
    });
    setTranslated({
      ...translated,
      [selectedLang]: false
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTranslateAll = () => {
    const baseText = descriptions['hr'] || '';
    const updated = {};
    const flags = {};

    for (const lang of languages) {
      if (lang.code !== 'hr') {
        updated[lang.code] = baseText; // Fake translation for now
        flags[lang.code] = true;
      }
    }

    setDescriptions({ ...descriptions, ...updated });
    setTranslated({ ...translated, ...flags });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow rounded-lg p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">🧑‍💼 Profil domaćina</h2>
        <p className="text-sm text-gray-500">
          Upišite podatke o sebi, dodajte sliku i unesite kratki opis na više jezika. Možete koristiti automatski prijevod.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Ime</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Prezime</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Fotografija domaćina</label>
        {preview && <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2 border" />}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="block" />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Odaberite jezik</label>
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="w-full border border-gray-300 p-2 rounded">
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label} {translated[lang.code] ? '🌍' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">
          Kratki opis {translated[selectedLang] && <span className="text-xs text-green-600">(automatski prevedeno)</span>}
        </label>
        <textarea
          rows={5}
          value={descriptions[selectedLang] || ''}
          onChange={handleDescriptionChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
          Spremi profil
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          onClick={handleTranslateAll}
        >
          Prevedi opis na sve jezike
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
