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
  const [isTyping, setIsTyping] = useState(false);
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
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    setShowCroatianWarning(false);
  };

  const getPillClasses = (code) => {
    const base =
      'px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    const isTranslated = descriptions[code]?.trim();
    const status = translatedStatus[code];

    if (isTranslated || status === 'translated')
      return `${base} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
    return `${base} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-screen-md">
        <div className="bg-white shadow rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            🧑‍💼 Profil domaćina
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Unesite ime kontakt osobe, Vašu fotografiju i ukratko se predstavite gostima.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ime kontakt osobe</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                placeholder="Unesite ime"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Prezime kontakt osobe</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                placeholder="Unesite prezime"
              />
            </div>
          </div>

          <div className="mb-8 text-center">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-200 mb-4 mx-auto shadow-sm"
              />
            )}
            <label className="inline-flex items-center bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full shadow-md cursor-pointer transition-all">
              Odaberite Vašu fotografiju
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              🌐 Odaberite jezik opisa
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`${getPillClasses(lang.code)} ${
                    selectedLang === lang.code ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                >
                  <span>{lang.label}</span>
                  {descriptions[lang.code]?.trim() && <span className="text-xs">✅</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                📝 Opis ({selectedLang.toUpperCase()})
              </label>
              {descriptions[selectedLang] && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    translatedStatus[selectedLang] === 'translated'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  {translatedStatus[selectedLang] === 'translated'
                    ? '🔁 Prevedeno automatski'
                    : '✍️ Ručno uneseno'}
                </span>
              )}
            </div>

            {selectedLang === 'hr' && showCroatianWarning && (
              <p className="text-sm text-red-500 mb-2">Molimo prvo unesite opis na hrvatskom jeziku.</p>
            )}

            <textarea
              ref={textareaRef}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              rows={6}
              value={descriptions[selectedLang] || ''}
              onChange={(e) => {
                setDescriptions((prev) => ({ ...prev, [selectedLang]: e.target.value }));
                setTranslatedStatus((prev) => ({ ...prev, [selectedLang]: 'manual' }));
                if (selectedLang === 'hr') setShowCroatianWarning(false);
              }}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all resize-y"
              placeholder="Unesite opis profila..."
            />
          </div>

          {/* Bottom buttons (always visible) */}
          <div id="action-buttons" className="flex justify-end gap-4 mt-8">
            <button className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-lg shadow-sm">
              Spremi
            </button>
            <button
              onClick={handleTranslate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-sm"
            >
              Prevedi automatski
            </button>
          </div>

          {/* Gotovo button only on mobile while typing */}
          {isTyping && (
            <div className="sm:hidden fixed bottom-4 right-4 z-50">
              <button
                onClick={() => {
                  textareaRef.current?.blur();
                  setIsTyping(false);
                }}
                className="bg-black text-white px-5 py-2.5 rounded-full shadow-md transition"
              >
                Gotovo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
