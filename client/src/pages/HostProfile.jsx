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
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showCroatianWarning, setShowCroatianWarning] = useState(false);

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

  const handleTranslate = () => {
    const hrText = descriptions['hr'] || '';

    if (!hrText.trim()) {
      setSelectedLang('hr');
      setShowCroatianWarning(true);
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const base =
      'px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer';
    const isTranslated = descriptions[code]?.trim();
    const status = translatedStatus[code];

    if (isTranslated || status === 'translated')
      return `${base} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
    return `${base} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto pt-2 pb-36">
        <div className="bg-white shadow-lg sm:rounded-xl sm:mx-auto sm:max-w-screen-md p-4 sm:p-8 relative">

        </div>
      </div>

      <div
        className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center gap-3 shadow-xl z-50"
        style={{
          backfaceVisibility: 'hidden',
          contain: 'layout paint',
          containIntrinsicSize: '48px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)'
        }}
      >
        <button
          onClick={handleTranslate}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-full shadow-md transition"
        >
          Prevedi automatski
        </button>
        <button className="w-full bg-black hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full shadow-md transition">
          Spremi
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
