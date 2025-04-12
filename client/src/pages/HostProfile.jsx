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
    alert('🟡 Google Translate integration coming soon...');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">🧑‍💼 Host Profile</h2>
          <p className="text-sm text-gray-500">
            Introduce yourself to guests with a short message and photo. Descriptions can be translated into multiple languages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Host Photo</label>
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-2 border" />}
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="block" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Language</label>
          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="w-full border border-gray-300 p-2 rounded">
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Short Description</label>
          <textarea
            rows={5}
            value={descriptions[selectedLang] || ''}
            onChange={handleDescriptionChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
            Save Profile
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow" onClick={handleTranslate}>
            Translate & Save All
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
