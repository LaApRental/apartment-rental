import React, { useState, useRef, useEffect } from 'react';

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
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen =
        window.visualViewport && window.visualViewport.height < window.innerHeight - 100;
      setKeyboardOpen(isKeyboardOpen);
    };

    if ('visualViewport' in window) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      if ('visualViewport' in window) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

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
      alert('Molimo prvo unesite opis na hrvatskom jeziku.');
      setSelectedLang('hr');
      textareaRef.current?.focus();
      return;
    }

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
    const base = 'px-3 py-1.5 text-sm font-medium rounded-full border transition flex items-center gap-2 whitespace-nowrap cursor-pointer';
    const status = translatedStatus[code];

    if (status === 'manual') return `${base} bg-green-50 text-green-700 border-green-200`;
    if (status === 'translated') return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
    return `${base} bg-gray-50 text-gray-600 border-gray-200`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-28">
      <div className="mx-auto max-w-screen-md bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-2">🧑‍💼 Profil domaćina</h2>
        <p className="text-sm text-gray-500 mb-6">
          Unesite ime kontakt osobe, Vašu fotografiju i ukratko se predstavite gostima.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Ime kontakt osobe</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Prezime kontakt osobe</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">📷 Fotografija domaćina</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border mb-2"
            />
          )}
          <label className="inline-block bg-black text-white px-4 py-2 rounded cursor-pointer">
            Odaberi datoteku
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">🌐 Odaberite jezik opisa</label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`${getPillClasses(lang.code)} ${
                  selectedLang === lang.code ? 'ring-2 ring-black ring-offset-1' : ''
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">📝 Opis ({selectedLang.toUpperCase()})</label>
            {descriptions[selectedLang] && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  translatedStatus[selectedLang] === 'translated'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {translatedStatus[selectedLang] === 'translated'
                  ? '🔁 Prevedeno automatski'
                  : '✍️ Ručno uneseno'}
              </span>
            )}
          </div>
          <textarea
            ref={textareaRef}
            rows={6}
            value={descriptions[selectedLang] || ''}
            onChange={(e) => {
              setDescriptions((prev) => ({ ...prev, [selectedLang]: e.target.value }));
              setTranslatedStatus((prev) => ({ ...prev, [selectedLang]: 'manual' }));
            }}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="hidden sm:flex gap-4">
          <button className="bg-black text-white px-5 py-2.5 rounded shadow hover:bg-neutral-800">
            Spremi
          </button>
          <button
            onClick={handleTranslate}
            className="bg-green-600 text-white px-5 py-2.5 rounded shadow hover:bg-green-700"
          >
            Prevedi automatski
          </button>
        </div>
      </div>

      {/* ✅ Sticky Bottom Bar (only when keyboard is not open) */}
      {!keyboardOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex sm:hidden gap-3 z-50 shadow">
          <button
            onClick={handleTranslate}
            className="w-full bg-green-600 text-white py-2.5 rounded-full shadow"
          >
            Prevedi
          </button>
          <button className="w-full bg-black text-white py-2.5 rounded-full shadow">
            Spremi
          </button>
        </div>
      )}
    </div>
  );
};

export default HostProfile;
