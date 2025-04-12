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
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [descriptions, setDescriptions] = useState({});
  const [manualFlags, setManualFlags] = useState({}); // 'manual' | 'translated'

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (lang, value) => {
    setDescriptions(prev => ({ ...prev, [lang]: value }));
    setManualFlags(prev => ({ ...prev, [lang]: 'manual' }));
  };

  const handleTranslateAll = () => {
    const sourceText = descriptions.hr || '';
    if (!sourceText) return alert('Please enter a description in Croatian first.');

    const translatedDescriptions = {};
    const translatedFlags = {};

    for (const lang of languages) {
      if (lang.code !== 'hr' && !descriptions[lang.code]) {
        translatedDescriptions[lang.code] = `🔁 Translated: ${sourceText}`;
        translatedFlags[lang.code] = 'translated';
      }
    }

    setDescriptions(prev => ({ ...prev, ...translatedDescriptions }));
    setManualFlags(prev => ({ ...prev, ...translatedFlags }));
  };

  const saveProfile = () => {
    alert('✅ Profile saved (not yet connected to backend)');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🧑‍💼 Profil domaćina</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Ime</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Prezime</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Fotografija domaćina</label>
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-2 border" />}
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="block" />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium">Opis za sve jezike</label>
            <button
              onClick={handleTranslateAll}
              className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Prevedi nedostajuće jezike
            </button>
          </div>

          <div className="space-y-4">
            {languages.map(lang => (
              <div key={lang.code}>
                <label className="block font-medium mb-1">
                  {lang.label}{' '}
                  {manualFlags[lang.code] === 'manual' && <span className="text-green-600">🟢</span>}
                  {manualFlags[lang.code] === 'translated' && <span className="text-yellow-500">🟡</span>}
                </label>
                <textarea
                  value={descriptions[lang.code] || ''}
                  onChange={(e) => handleDescriptionChange(lang.code, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={3}
                  placeholder={`Unesite opis na jeziku: ${lang.label}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
            Spremi profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
