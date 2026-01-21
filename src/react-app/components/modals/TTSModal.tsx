import { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
import Modal from './Modal';
import { useAppStore } from '@/react-app/store/useAppStore';
import toast from 'react-hot-toast';

interface TTSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TTSModal({ isOpen, onClose }: TTSModalProps) {
  const { content, isSpeaking, setSpeaking, ttsSettings, setTTSSettings } = useAppStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);


  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      if (!ttsSettings.voice && availableVoices.length > 0) {
        const hebrewVoice = availableVoices.find(v => v.lang.startsWith('he'));
        if (hebrewVoice) {
          setTTSSettings({ voice: hebrewVoice.name });
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const filteredVoices = voices.filter(v => {
    if (ttsSettings.langFilter === 'all') return true;
    return v.lang.startsWith(ttsSettings.langFilter);
  });

  const handleSpeak = () => {
    if (!content.trim()) {
      toast.error('אין טקסט להקראה');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(content);
    newUtterance.rate = ttsSettings.rate;
    newUtterance.pitch = ttsSettings.pitch;
    
    const selectedVoice = voices.find(v => v.name === ttsSettings.voice);
    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }

    newUtterance.onstart = () => setSpeaking(true);
    newUtterance.onend = () => setSpeaking(false);
    newUtterance.onerror = () => {
      setSpeaking(false);
      toast.error('שגיאה בהקראה');
    };

    window.speechSynthesis.speak(newUtterance);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="הקראת טקסט" size="md">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            קול:
          </label>
          <select
            value={ttsSettings.voice}
            onChange={(e) => setTTSSettings({ voice: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
            dir="rtl"
          >
            {filteredVoices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            מהירות: {ttsSettings.rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={ttsSettings.rate}
            onChange={(e) => setTTSSettings({ rate: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            גובה צליל: {ttsSettings.pitch.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={ttsSettings.pitch}
            onChange={(e) => setTTSSettings({ pitch: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            סנן לפי שפה:
          </label>
          <select
            value={ttsSettings.langFilter}
            onChange={(e) => setTTSSettings({ langFilter: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
            dir="rtl"
          >
            <option value="all">כל השפות</option>
            <option value="he">עברית</option>
            <option value="en">אנגלית</option>
            <option value="ar">ערבית</option>
            <option value="ru">רוסית</option>
          </select>
        </div>

        <button
          onClick={handleSpeak}
          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2"
        >
          {isSpeaking ? (
            <>
              <Pause className="w-5 h-5" />
              עצור הקראה
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              הקרא טקסט
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
