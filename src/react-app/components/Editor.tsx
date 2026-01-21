import { useEffect, useRef, useState } from 'react';
import { Mic, Save } from 'lucide-react';
import { useAppStore } from '@/react-app/store/useAppStore';
import toast from 'react-hot-toast';

export default function Editor() {
  const { config, content, setContent, isRecording, setRecording } = useAppStore();
  const [wordCount, setWordCount] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'he-IL';

      recognition.onstart = () => {
        setRecording(true);
      };

      recognition.onend = () => {
        setRecording(false);
      };

      recognition.onerror = (event: any) => {
        let message = 'שגיאת מיקרופון';
        if (event.error === 'not-allowed') {
          message = 'הגישה למיקרופון נחסמה. בדוק הרשאות.';
        }
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
          message = 'חובה להריץ ב-HTTPS.';
        }
        toast.error(message);
        setRecording(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          const newContent = content + (content ? ' ' : '') + finalTranscript;
          setContent(newContent);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [content, setContent, setRecording]);

  const handleRecord = () => {
    if (!recognitionRef.current) {
      toast.error('הדפדפן לא נתמך. נסה Chrome.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    const handleFontSize = (e: CustomEvent) => {
      setFontSize(prev => Math.max(12, Math.min(32, prev + e.detail)));
    };
    window.addEventListener('changeFontSize' as any, handleFontSize as any);
    return () => window.removeEventListener('changeFontSize' as any, handleFontSize as any);
  }, []);

  return (
    <main className="flex-1 flex flex-col relative bg-white dark:bg-gray-800 overflow-hidden">
      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <span>{wordCount} מילים</span>
        <span className="text-emerald-500 font-bold flex items-center gap-1">
          <Save className="w-3 h-3" />
          נשמר בענן
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={config.placeholder}
          className="w-full h-full min-h-full border-0 p-5 pb-24 outline-none resize-none bg-transparent text-gray-900 dark:text-gray-100"
          style={{ 
            fontFamily: config.bFont,
            fontSize: `${fontSize}px`,
            lineHeight: '1.6'
          }}
          dir="rtl"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="relative pointer-events-auto">
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-60 animate-ping" />
          )}
          <button
            onClick={handleRecord}
            className={`relative w-[72px] h-[72px] rounded-full border-4 border-white dark:border-gray-800 shadow-2xl flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500 scale-110 shadow-red-500/50'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:scale-105'
            }`}
            aria-label="מיקרופון"
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </main>
  );
}
