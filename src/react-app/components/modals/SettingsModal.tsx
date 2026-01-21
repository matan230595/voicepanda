import { useState } from 'react';
import { Save } from 'lucide-react';
import Modal from './Modal';
import { useAppStore } from '@/react-app/store/useAppStore';
import toast from 'react-hot-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { apiKeys, setApiKey } = useAppStore();
  const [localKeys, setLocalKeys] = useState(apiKeys);

  const handleSave = () => {
    Object.entries(localKeys).forEach(([key, value]) => {
      setApiKey(key, value);
    });
    toast.success('ההגדרות נשמרו');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="הגדרות API" size="lg">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>טיפ:</strong> נדרש מפתח API אחד לפחות לשימוש בתכונות AI ותרגום.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            🤖 Google Gemini API Key
          </label>
          <input
            type="password"
            value={localKeys.gemini}
            onChange={(e) => setLocalKeys({ ...localKeys, gemini: e.target.value })}
            placeholder="הזן מפתח Gemini..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
            dir="ltr"
          />
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-500 hover:underline mt-1 inline-block"
          >
            קבל מפתח חינם מכאן →
          </a>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            ⚡ Groq API Key
          </label>
          <input
            type="password"
            value={localKeys.groq}
            onChange={(e) => setLocalKeys({ ...localKeys, groq: e.target.value })}
            placeholder="הזן מפתח Groq..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
            dir="ltr"
          />
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-500 hover:underline mt-1 inline-block"
          >
            קבל מפתח חינם מכאן →
          </a>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            🧠 OpenAI API Key
          </label>
          <input
            type="password"
            value={localKeys.openai}
            onChange={(e) => setLocalKeys({ ...localKeys, openai: e.target.value })}
            placeholder="הזן מפתח OpenAI..."
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
            dir="ltr"
          />
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-500 hover:underline mt-1 inline-block"
          >
            קבל מפתח מכאן →
          </a>
        </div>

        <details className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <summary className="cursor-pointer text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
            🔧 הגדרות מתקדמות (אופציונלי)
          </summary>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                🤗 Hugging Face API Key
              </label>
              <input
                type="password"
                value={localKeys.hf}
                onChange={(e) => setLocalKeys({ ...localKeys, hf: e.target.value })}
                placeholder="הזן מפתח Hugging Face..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                🔮 Claude API Key
              </label>
              <input
                type="password"
                value={localKeys.claude}
                onChange={(e) => setLocalKeys({ ...localKeys, claude: e.target.value })}
                placeholder="הזן מפתח Claude..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </details>

        <button
          onClick={handleSave}
          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2 mt-6"
        >
          <Save className="w-5 h-5" />
          שמור הגדרות
        </button>
      </div>
    </Modal>
  );
}
