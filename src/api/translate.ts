import { Hono } from 'hono';

const app = new Hono();

const languageNames: Record<string, string> = {
  'he': 'Hebrew',
  'en': 'English',
  'ar': 'Arabic',
  'ru': 'Russian',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian'
};

app.post('/translate', async (c) => {
  try {
    const { text, sourceLang, targetLang, apiKey, provider } = await c.req.json();

    if (!text || !sourceLang || !targetLang || !apiKey || !provider) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const sourceLanguage = languageNames[sourceLang] || sourceLang;
    const targetLanguage = languageNames[targetLang] || targetLang;
    const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}. Return only the translation, without any explanations or additional text:\n\n${text}`;

    let translation = '';

    if (provider === 'gemini') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('Gemini API error');
      }

      const data = await response.json() as any;
      translation = data.candidates[0].content.parts[0].text;
    } else if (provider === 'groq') {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Groq API error');
      }

      const data = await response.json() as any;
      translation = data.choices[0].message.content;
    }

    return c.json({ translation: translation.trim() });
  } catch (error) {
    console.error('Translation error:', error);
    return c.json({ error: 'Translation failed' }, 500);
  }
});

export default app;
