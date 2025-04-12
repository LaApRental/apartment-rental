import React, { useState } from 'react';

const languages = [
  { code: 'hr', name: 'Hrvatski' },
  { code: 'en', name: 'Engleski' },
  { code: 'de', name: 'Njemački' },
  { code: 'it', name: 'Talijanski' },
  { code: 'fr', name: 'Francuski' },
  { code: 'cs', name: 'Češki' },
  { code: 'pl', name: 'Poljski' },
  { code: 'sl', name: 'Slovenski' },
  { code: 'hu', name: 'Mađarski' },
  { code: 'ro', name: 'Rumunjski' },
  { code: 'nl', name: 'Nizozemski' },
  { code: 'es', name: 'Španjolski' },
  { code: 'da', name: 'Danski' },
  { code: 'ru', name: 'Ruski' }
];

const HostProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLang, setSelectedLang] = useState('hr');
  const [descriptions, setDescriptions] = useState({ hr: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleDescriptionChange = (lang, text) => {
    setDescriptions(prev => ({ ...prev, [lang]: text }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">👤 Profil domaćina</h2>

      {/* PHOTO UPLOAD */}
      <div className="mb-8 text-center">
        <h4 className="text-lg font-semibold mb-2">Fotografija domaćina</h4>
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-32 h-32 rounded-full object-cover mx-auto mb-2" />
        ) : (
          <img src="/static/img/no_usr_img_big.png" alt="No profile" className="w-32 h-32 rounded-full mx-auto mb-2" />
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
      </div>

      {/* NAME INPUTS */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Ime kontakt osobe</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full" />
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1">Prezime kontakt osobe</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input w-full" />
      </div>

      {/* LANGUAGE SELECTOR */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Jezik unosa</label>
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="input w-full">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      {/* DESCRIPTION TEXTAREA */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Opis ({selectedLang})</label>
        <textarea
          rows="6"
          value={descriptions[selectedLang] || ''}
          onChange={(e) => handleDescriptionChange(selectedLang, e.target.value)}
          className="input w-full"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button className="btn btn-primary">💾 Spremi</button>
        <button className="btn btn-secondary">🌍 Prevedi na sve jezike</button>
      </div>
    </div>
  );
};

export default HostProfile;
