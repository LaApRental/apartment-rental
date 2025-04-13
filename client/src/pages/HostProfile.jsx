import React, { useState, useRef } from 'react';

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

    const updatedDescriptions = { ...descriptions };
    const updatedStatus = { ...translatedStatus };

    languages.forEach(({ code }) => {
      if (code !== 'hr' && !descriptions[code]) {
        updatedDescriptions[code] = hrText;
        updatedStatus[code] = 'translated';
      }
    });

    setDescriptions(updatedDescriptions);
    setTranslatedStatus(updatedStatus);
  };

  const getPillClasses = (code) => {
    const base =
      'px-3 py-1.5 text-sm font-medium rounded-full border transition flex items-center gap-2 whitespace-nowrap cursor-pointer';
    const status = translatedStatus[code];

    if (status === 'manual') return `${base} bg-green-50 text-green-700 border-green-200`;
    if (status === 'translated') return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
    return `${base} bg-gray-100 text-gray-600 border-gray-200`;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="px-4 sm:px-6 py-6 max-w-screen-md mx-auto flex-grow">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">🧑‍💼 Profil domaćina</h2>
        <p className="text-sm text-gray-500 mb-6">
          Unesite ime kontakt osobe, Vašu fotografiju i ukratko se predstavite gostima.
        </p>

        {/* Name Inputs */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ime kontakt osobe</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="Unesite ime"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Prezime kontakt osobe</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="Unesite prezime"
            />
          </div>
        </div>

        {/* Photo Uploader */}
        <div className="mb-6 text-center">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-28 h-28 mx-auto mb-4 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
          )}
          <label className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full shadow-md cursor-pointer transition-all">
            Odaberite Vašu fotografiju
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">🌐 Odaberite jezik opisa</label>
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

        {/* Description Editor */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-gray-700">📝 Opis ({selectedLang.toUpperCase()})</label>
            {descriptions[selectedLang] && (
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  translatedStatus[selectedLang] === 'translated'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {translatedStatus[selectedLang] === 'translated' ? '🔁 Prevedeno automatski' : '✍️ Ručno uneseno'}
              </span>
            )}
          </div>

          {selectedLang === 'hr' && showCroatianWarning && (
            <p className="text-sm text-red-500 mb-2">Prvo unesite hrvatski jezik.</p>
          )}

          <textarea
            ref={textareaRef}
            rows={6}
            value={descriptions[selectedLang] || ''}
            onChange={(e) => {
              setDescriptions((prev) => ({ ...prev, [selectedLang]: e.target.value }));
              setTranslatedStatus((prev) => ({ ...prev, [selectedLang]: 'manual' }));
              if (selectedLang === 'hr') setShowCroatianWarning(false);
            }}
            className="w-full border border-gray-300 p-3 rounded-lg resize-y"
            placeholder="Unesite opis profila..."
          />
        </div>
      </div>

      {/* Sticky Footer for Mobile Only */}
      <div className="block sm:hidden sticky bottom-0 bg-white px-4 py-3 border-t border-gray-200 flex justify-between z-10">
        <button
          onClick={handleTranslate}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-green-600 text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Prevedi automatski
        </button>
        <button
          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-black text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Spremi promjene
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
