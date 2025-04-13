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
  const pillsRef = useRef({});
  const textareaRef = useRef(null);
  const hiddenInputRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setShowStickyBar(false);
      } else {
        setTimeout(() => setShowStickyBar(true), 50);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescriptions((prev) => ({ ...prev, [selectedLang]: text }));
    setTranslatedStatus((prev) => ({ ...prev, [selectedLang]: 'manual' }));
  };

  const handleTranslate = () => {
    const hrText = descriptions['hr'] || '';

    if (!hrText.trim()) {
      setSelectedLang('hr');

      // Safari keyboard trick
      setTimeout(() => {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.focus();
        }

        setTimeout(() => {
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            textarea.focus();
          }
        }, 50);
      }, 50);

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
    const base =
      'px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    const isTranslated = descriptions[code]?.trim();
    const status = translatedStatus[code];

    if (isTranslated || status === 'translated')
      return `${base} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
    return `${base} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
  };

  return (
    <div className="bg-white pt-2 pb-28">
      {/* Hidden input to trigger Safari keyboard */}
      <input
        ref={hiddenInputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
      />

      <div className="bg-white shadow-lg sm:rounded-xl sm:mx-auto sm:max-w-screen-md p-4 sm:p-8 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          🧑‍💼 Profil domaćina
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Unesite ime kontakt osobe, Vašu fotografiju i ukratko se predstavite gostima.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Ime kontakt osobe
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
              placeholder="Unesite ime"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Prezime kontakt osobe
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
              placeholder="Unesite prezime"
            />
          </div>
        </div>

        <div className="mb-6 text-center">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-200 mb-4 mx-auto shadow-sm"
            />
          )}
          <label className="inline-flex items-center bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full shadow-md cursor-pointer transition-all">
            Odaberite Vašu fotografiju
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            🌐 Odaberite jezik opisa
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                ref={(el) => (pillsRef.current[lang.code] = el)}
                onClick={() => setSelectedLang(lang.code)}
                className={`${getPillClasses(lang.code)} ${
                  selectedLang === lang.code
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
              >
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
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
          <textarea
            ref={textareaRef}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            rows={6}
            value={descriptions[selectedLang] || ''}
            onChange={handleDescriptionChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all resize-y"
            placeholder="Unesite opis profila..."
          />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-4">
          <button className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full shadow-md transition">
            Spremi
          </button>
          <button
            onClick={handleTranslate}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-md transition"
          >
            Prevedi sve
          </button>
        </div>

        {/* Sticky Save Bar (mobile) */}
        {showStickyBar && !isTyping && (
          <div
            className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center gap-3 shadow-xl z-50 will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              contain: 'layout paint',
              containIntrinsicSize: '48px',
            }}
          >
            <button
              onClick={handleTranslate}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-full shadow-md transition"
            >
              Prevedi sve
            </button>
            <button className="w-full bg-black hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full shadow-md transition">
              Spremi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostProfile;
