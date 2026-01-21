import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Modal from './Modal';
import { useAppStore } from '@/react-app/store/useAppStore';
import toast from 'react-hot-toast';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIModal({ isOpen, onClose }: AIModalProps) {
  const { content, setContent, apiKeys } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    '📝 תקן שגיאות כתיב ודקדוק',
    '✨ שפר את הטקסט',
    '📖 סכם את הטקסט',
    '🔄 פרפרז את הטקסט',
    '📧 הפוך למייל מקצועי',
    '💡 הוסף נקודות חשובות'
  ];

  const handleAI = async (customPrompt?: string) => {
    const aiPrompt = customPrompt || prompt;
    if (!aiPrompt.trim()) {
      toast.error('נא להזין הוראה ל-AI');
      return;
    }

    if (!content.trim()) {
      toast.error('אין טקסט לעיבוד');
      return;
    }

    if (!apiKeys.gemini && !apiKeys.groq && !apiKeys.openai) {
      toast.error('נא להגדיר מפתח API בהגדרות');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          text: content,
          apiKey: apiKeys.gemini || apiKeys.groq || apiKeys.openai,
          provider: apiKeys.gemini ? 'gemini' : apiKeys.groq ? 'groq' : 'openai'
        })
      });

      if (!response.ok) throw new Error('AI request failed');

      const data = await response.json();
      setContent(data.result);
      toast.success('הטקסט עובד בהצלחה');
      onClose();
      setPrompt('');
    } catch (error) {
      toast.error('שגיאה בעיבוד. בדוק מפתח API בהגדרות.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="בינה מלאכותית" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleAI(p.replace(/^[^\s]+\s/, ''))}
              disabled={isLoading}
              className="px-4 py-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-500 border-2 border-transparent transition-colors disabled:opacity-50 text-right font-medium"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
            או כתוב הוראה מותאמת אישית:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleAI()}
              placeholder="למשל: הפוך לשיר, כתוב כמשורר..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-emerald-500 outline-none"
              disabled={isLoading}
              dir="rtl"
            />
            <button
              onClick={() => handleAI()}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  עובד...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  שלח
                </>
              )}
            </button>
          </div>
        </div>

        {!apiKeys.gemini && !apiKeys.groq && !apiKeys.openai && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ לא הוגדר מפתח API. עבור להגדרות להגדרת מפתח Gemini, Groq או OpenAI
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
