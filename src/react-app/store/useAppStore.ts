import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppConfig {
  primary: string;
  brand: string;
  emoji: string;
  logo: string | null;
  phone: string;
  email: string;
  address: string;
  wa: string;
  tg: string;
  txtAI: string;
  txtTrans: string;
  txtTTS: string;
  placeholder: string;
  hFont: string;
  bFont: string;
  showAI: boolean;
  showTrans: boolean;
  showTTS: boolean;
  copyright: string;
  legalAccess: string;
  legalTerms: string;
  legalPrivacy: string;
}

interface AppState {
  config: AppConfig;
  content: string;
  isDarkMode: boolean;
  isRecording: boolean;
  isSpeaking: boolean;
  apiKeys: {
    gemini: string;
    groq: string;
    hf: string;
    openai: string;
    claude: string;
    fbKey: string;
    fbProj: string;
  };
  ttsSettings: {
    rate: number;
    pitch: number;
    voice: string;
    langFilter: string;
  };
  seenOnboarding: boolean;
  
  // Actions
  setContent: (content: string) => void;
  setConfig: (config: Partial<AppConfig>) => void;
  toggleDarkMode: () => void;
  setRecording: (recording: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setApiKey: (key: string, value: string) => void;
  setTTSSettings: (settings: Partial<AppState['ttsSettings']>) => void;
  setSeenOnboarding: () => void;
  resetConfig: () => void;
}

const defaultConfig: AppConfig = {
  primary: '#10b981',
  brand: 'Pandavoice',
  emoji: '🐼',
  logo: null,
  phone: '050-1234567',
  email: 'support@panda.co.il',
  address: 'תל אביב, ישראל',
  wa: 'https://wa.me/972501234567',
  tg: 'https://t.me/panda',
  txtAI: 'AI',
  txtTrans: 'תרגום',
  txtTTS: 'הקראה',
  placeholder: 'התחל להקליט...',
  hFont: "'Rubik', sans-serif",
  bFont: "'Heebo', sans-serif",
  showAI: true,
  showTrans: true,
  showTTS: true,
  copyright: 'כל הזכויות שמורות ל-פנדה סוכנות דיגיטל © 2026 מתן אלקיים',
  legalAccess: '<h3>הצהרת נגישות</h3><p>אנו ב-Pandavoice רואים חשיבות עליונה בהנגשת המערכת...</p>',
  legalTerms: '<h3>תנאי שימוש</h3><p>ברוכים הבאים למערכת Pandavoice...</p>',
  legalPrivacy: '<h3>מדיניות פרטיות</h3><p>אנו מכבדים את פרטיותך...</p>'
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      content: '',
      isDarkMode: false,
      isRecording: false,
      isSpeaking: false,
      apiKeys: {
        gemini: '',
        groq: '',
        hf: '',
        openai: '',
        claude: '',
        fbKey: '',
        fbProj: ''
      },
      ttsSettings: {
        rate: 1,
        pitch: 1,
        voice: '',
        langFilter: 'all'
      },
      seenOnboarding: false,

      setContent: (content) => set({ content }),
      setConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig }
      })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setRecording: (recording) => set({ isRecording: recording }),
      setSpeaking: (speaking) => set({ isSpeaking: speaking }),
      setApiKey: (key, value) => set((state) => ({
        apiKeys: { ...state.apiKeys, [key]: value }
      })),
      setTTSSettings: (settings) => set((state) => ({
        ttsSettings: { ...state.ttsSettings, ...settings }
      })),
      setSeenOnboarding: () => set({ seenOnboarding: true }),
      resetConfig: () => set({ config: defaultConfig })
    }),
    {
      name: 'pandavoice-storage'
    }
  )
);
