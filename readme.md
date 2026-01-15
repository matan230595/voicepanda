# Pandavoice 🐼

**Pandavoice** היא אפליקציית ווב מתקדמת (PWA) לתמלול דיבור לטקסט, המשלבת בינה מלאכותית לעריכה ותיקון, ושמירה אוטומטית בענן. האפליקציה בנויה כקובץ HTML יחיד, קלה לשימוש, ומותאמת במיוחד לשפה העברית.

![Pandavoice Banner](https://via.placeholder.com/800x200.png?text=Pandavoice+AI+Transcription)
*(אתה יכול להחליף את הקישור הזה בצילום מסך אמיתי של האפליקציה שלך)*

## ✨ פיצ'רים מרכזיים

* 🎙️ **זיהוי דיבור בזמן אמת:** תמלול מדויק בעברית ובאנגלית (מבוסס Web Speech API).
* 🧠 **תיקון ועיצוב עם AI:** אינטגרציה עם **Google Gemini** לתיקון שגיאות כתיב, הוספת פיסוק וחלוקה לפסקאות.
* ☁️ **שמירה בענן:** סנכרון אוטומטי ל-**Firebase Firestore** – התחל בטלפון, המשך במחשב.
* 📱 **תמיכה ב-PWA:** ניתנת להתקנה כאפליקציה טבעית על גבי iOS (Safari) ו-Android (Chrome).
* 🔊 **הקראה קולית (TTS):** אפשרות להאזנה לטקסט הכתוב.
* 💬 **שיתוף מהיר:** שליחה לוואטסאפ בלחיצה אחת.
* 🌙 **עיצוב מתקדם:** תמיכה במצב לילה (Dark Mode) ושינוי גודל גופן.
* 💾 **גיבוי מקומי:** שמירה אוטומטית בדפדפן ושמירה לקובץ TXT.

## 🚀 התקנה והרצה (Deployment)

האפליקציה בנויה כקובץ **Single File HTML**. אין צורך בהתקנות מסובכות (npm/node).

### אפשרות א': הרצה מקומית
1. הורד את הקובץ `index.html`.
2. פתח אותו בדפדפן Chrome או Edge.
   * *הערה:* זיהוי הדיבור עשוי לדרוש שרת מקומי (Localhost) או HTTPS כדי לעבוד בצורה תקינה.

### אפשרות ב': העלאה לשרת (מומלץ)
כדי שהמיקרופון יעבוד בנייד, האתר חייב לרוץ תחת **HTTPS**.
1. היכנס ל-[Netlify Drop](https://app.netlify.com/drop).
2. גרור את התיקייה שמכילה את `index.html`.
3. קבל קישור מאובטח ושתף אותו.

## ⚙️ הגדרות (Configuration)

בפעם הראשונה שתפעיל את האפליקציה, לחץ על כפתור ה**הגדרות** (⚙️) בפינה העליונה והזן את המפתחות הבאים:

### 1. Google Gemini API (עבור ה-AI)
* קבל מפתח בחינם כאן: [Google AI Studio](https://aistudio.google.com/app/apikey)
* מאפשר לכפתור "סדר לי (AI)" לעבוד.

### 2. Firebase Config (עבור שמירה בענן)
* צור פרויקט ב-[Firebase Console](https://console.firebase.google.com/).
* צור מסד נתונים מסוג **Firestore Database**.
* העתק את ה-`API Key`, `Auth Domain`, ו-`Project ID` מהגדרות הפרויקט.

> **פרטיות:** כל המפתחות נשמרים באופן מקומי בדפדפן שלך (`LocalStorage`) ולא נשלחים לשום שרת צד ג' מלבד השירותים המורשים (Google/Firebase).

## 📱 איך להתקין בטלפון (PWA)

### iPhone (iOS)
1. פתח את הקישור ב-**Safari**.
2. לחץ על כפתור ה"שתף" (Share).
3. בחר **"הוסף למסך הבית"** (Add to Home Screen).

### Android
1. פתח את הקישור ב-**Chrome**.
2. לחץ על התפריט (3 נקודות).
3. בחר **"התקן אפליקציה"** או **"הוסף למסך הבית"**.

## 🛠️ טכנולוגיות

* HTML5 / CSS3 / Vanilla JavaScript
* [Firebase SDK](https://firebase.google.com/) (Firestore)
* [Google Gemini API](https://ai.google.dev/)
* Web Speech API (Recognition & Synthesis)

## 📄 רישיון

פרויקט זה נוצר לשימוש חופשי (MIT License). אתם מוזמנים לשנות, לשפר ולהפיץ אותו.

---
**נבנה באהבה עם Pandavoice 🐼**



----------------------------------------------------------------------------------------

# Pandavoice 🐼

**Pandavoice** is an advanced progressive web app (PWA) for speech-to-text transcription, featuring AI-powered editing and correction, and automatic cloud synchronization. The application is built as a single HTML file, easy to use, and optimized for Hebrew and English.

![Pandavoice Banner](https://via.placeholder.com/800x200.png?text=Pandavoice+AI+Transcription)

## ✨ Key Features

* 🎙️ **Real-time Speech Recognition:** Accurate transcription supporting Hebrew & English (using Web Speech API).
* 🧠 **AI Correction & Formatting:** Integration with **Google Gemini** to fix spelling errors, add punctuation, and organize paragraphs.
* ☁️ **Cloud Sync:** Automatic synchronization to **Firebase Firestore** – start on mobile, continue on desktop.
* 📱 **PWA Support:** Installable as a native-like app on iOS (Safari) and Android (Chrome).
* 🔊 **Text-to-Speech (TTS):** Listen to your transcribed notes.
* 💬 **Quick Share:** Direct one-click sharing to WhatsApp.
* 🌙 **Modern UI:** Dark Mode support and font size adjustment.
* 💾 **Local Backup:** Auto-save to local storage and export to TXT file.

## 🚀 Installation & Deployment

The app is built as a **Single File HTML**. No complex installation (npm/node) required.

### Option A: Local Run
1. Download the `index.html` file.
2. Open it in Chrome or Edge browser.
   * *Note:* Speech recognition may require a local server (Localhost) or HTTPS to function properly on some devices.

### Option B: Deploy to Server (Recommended)
For microphone access on mobile devices, the site must run under **HTTPS**.
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag & drop the folder containing `index.html`.
3. Get a secure link and share it.

## ⚙️ Configuration

Upon first launch, click the **Settings** button (⚙️) in the top corner and enter the following keys:

### 1. Google Gemini API (For AI Features)
* Get a free key here: [Google AI Studio](https://aistudio.google.com/app/apikey)
* Enables the "Fix with AI" button functionality.

### 2. Firebase Config (For Cloud Sync)
* Create a project at [Firebase Console](https://console.firebase.google.com/).
* Create a **Firestore Database**.
* Copy the `API Key`, `Auth Domain`, and `Project ID` from project settings.

> **Privacy:** All keys are stored locally in your browser (`LocalStorage`) and are not sent to any 3rd party server other than the authorized services (Google/Firebase).

## 📱 How to Install on Mobile (PWA)

### iPhone (iOS)
1. Open the link in **Safari**.
2. Tap the **Share** button.
3. Select **"Add to Home Screen"**.

### Android
1. Open the link in **Chrome**.
2. Tap the Menu (3 dots).
3. Select **"Install App"** or **"Add to Home Screen"**.

## 🛠️ Tech Stack

* HTML5 / CSS3 / Vanilla JavaScript
* [Firebase SDK](https://firebase.google.com/) (Firestore)
* [Google Gemini API](https://ai.google.dev/)
* Web Speech API (Recognition & Synthesis)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
**Built with love by Pandavoice 🐼**