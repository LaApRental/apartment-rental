import React, { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'hr', label: '🇭🇷 Hrvatski' },
  { code: 'en', label: '🇬🇧 Engleski' },
  { code: 'de', label: '🇩🇪 Njemački' },
  { code: 'it', label: '🇮🇹 Talijanski' },
  { code: 'fr', label: '🇫🇷 Francuski' },
  { code: 'sl', label: '🇸🇮 Slovenski' },
  { code: 'pl', label: '🇵🇱 Poljski' },
  { code: 'cs', label: '🇨🇿 Češki' },
  { code: 'hu', label: '🇭🇺 Mađarski' },
  { code: 'ro', label: '🇷🇴 Rumunjski' },
  { code: 'nl', label: '🇳🇱 Nizozemski' },
  { code: 'es', label: '🇪🇸 Španjolski' },
  { code: 'da', label: '🇩🇰 Danski' },
  { code: 'ru', label: '🇷🇺 Ruski' },
];

const HostProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLang, setSelectedLang] = useState('hr');
  const [descriptions, setDescriptions] = useState({});
  const [translatedStatus, setTranslatedStatus] = useState({});
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCroatianWarning, setShowCroatianWarning] = useState(false);
  const textareaRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTranslate = () => {
    const hrText = descriptions['hr'] || '';
    if (!hrText.trim()) {
      setSelectedLang('hr');
      setShowCroatianWarning(true);
      textareaRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setShowCroatianWarning(false);
    const updated = { ...descriptions };
    const status = { ...translatedStatus };
    languages.forEach(({ code }) => {
      if (code !== 'hr' && !descriptions[code]) {
        updated[code] = hrText;
        status[code] = 'translated';
      }
    });
    setDescriptions(updated);
    setTranslatedStatus(status);
  };

  const getPillClasses = (code) => {
    const base = 'px-3 py-1.5 text-sm rounded-full border transition flex items-center gap-1';
    const status = translatedStatus[code];
    if (status === 'manual') return `${base} bg-green-100 text-green-800 border-green-300`;
    if (status === 'translated') return `${base} bg-yellow-100 text-yellow-800 border-yellow-300`;
    return `${base} bg-white text-gray-700 hover:bg-gray-100`;
  };

  return (
    <div className="bg-white pb-32 sm:pb-12">
      <div className="mx-auto max-w-screen-md px-4 sm:px-6 pt-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-2xl font-semibold mb-1">🧑‍💼 Profil domaćina</h2>
          <p className="text-sm text-gray-500 mb-6">
            Unesite osobne podatke i opis koji će biti prikazan gostima.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-medium mb-1">Ime kontakt osobe</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-medium mb-1">Prezime kontakt osobe</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border p-2 rounded" />
            </div>
          </div>

          <div className="mb-6 text-center">
            {preview && (
              <img src={preview} alt="Preview" className="w-24 h-24 mx-auto rounded-full object-cover border mb-2" />
            )}
            <label className="inline-block bg-black text-white px-5 py-2.5 rounded-full cursor-pointer hover:bg-neutral-800">
              Odaberite Vašu fotografiju
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">🌐 Odaberite jezik opisa</label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`${getPillClasses(lang.code)} ${
                    selectedLang === lang.code ? 'ring-2 ring-black ring-offset-1' : ''
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <label className="block font-medium mb-1">📝 Opis ({selectedLang.toUpperCase()})</label>
              {descriptions[selectedLang] && (
                <span className={`text-xs px-2 py-1 rounded ${
                  translatedStatus[selectedLang] === 'translated'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {translatedStatus[selectedLang] === 'translated' ? '🔁 Prevedeno automatski' : '✍️ Ručno uneseno'}
                </span>
              )}
            </div>
            {selectedLang === 'hr' && showCroatianWarning && (
              <p className="text-sm text-red-500 mt-1 mb-2">
                Molimo prvo unesite opis na hrvatskom jeziku.
              </p>
            )}
            <textarea
              ref={textareaRef}
              rows={5}
              value={descriptions[selectedLang] || ''}
              onChange={(e) => {
                setDescriptions(prev => ({ ...prev, [selectedLang]: e.target.value }));
                setTranslatedStatus(prev => ({ ...prev, [selectedLang]: 'manual' }));
                if (selectedLang === 'hr') {
                  setShowCroatianWarning(false);
                }
              }}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Sticky bar for mobile */}
          <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow z-40">
            <button onClick={handleTranslate} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-full shadow transition">
              🔁 Prevedi
            </button>
            <button className="w-full bg-black hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full shadow transition">
              💾 Spremi
            </button>
          </div>

          {/* Desktop buttons */}
          <div className="hidden sm:flex gap-4 mt-6">
            <button onClick={handleTranslate} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded shadow transition">
              🔁 Prevedi automatski
            </button>
            <button className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded shadow transition">
              💾 Spremi profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
