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
  const [translatedStatus, setTranslatedStatus] = useState({});
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescriptions({ ...descriptions, [selectedLang]: e.target.value });
    setTranslatedStatus({ ...translatedStatus, [selectedLang]: 'manual' });
  };

  const handleTranslate = () => {
    const sourceText = descriptions['hr'] || '';
    const updated = { ...descriptions };
    const status = { ...translatedStatus };

    languages.forEach(({ code }) => {
      if (code !== 'hr' && !descriptions[code]) {
        updated[code] = sourceText;
        status[code] = 'translated';
      }
    });

    setDescriptions(updated);
    setTranslatedStatus(status);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-1">🧑‍💼 Profil domaćina</h2>
      <p className="text-sm text-gray-500 mb-6">
        Unesite osobne podatke i opis koji će biti prikazan gostima.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1">Ime</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Prezime</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Fotografija domaćina</label>
        {preview && <img src={preview} alt="Preview" className="w-28 h-28 rounded-full object-cover border mb-2" />}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="block" />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Odaberite jezik opisa</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedLang === lang.code
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <label className="block font-medium mb-1">Opis ({selectedLang.toUpperCase()})</label>
          <span className={`text-xs px-2 py-1 rounded ${
            translatedStatus[selectedLang] === 'translated'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {translatedStatus[selectedLang] === 'translated' ? 'Prevedeno' : 'Ručno uneseno'}
          </span>
        </div>
        <textarea
          rows={5}
          value={descriptions[selectedLang] || ''}
          onChange={handleDescriptionChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
          Spremi profil
        </button>
        <button onClick={handleTranslate} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow">
          Prevedi s hrvatskog na ostale
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
