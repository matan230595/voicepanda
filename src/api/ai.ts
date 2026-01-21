import { Hono } from 'hono';

const app = new Hono();

app.post('/ai', async (c) => {
  try {
    const { prompt, text, apiKey, provider } = await c.req.json();

    if (!prompt || !text || !apiKey || !provider) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    let result = '';

    if (provider === 'gemini') {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${prompt}\n\nטקסט:\n${text}`
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('Gemini API error');
      }

      const data = await response.json() as any;
      result = data.candidates[0].content.parts[0].text;
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
              content: `${prompt}\n\nטקסט:\n${text}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Groq API error');
      }

      const data = await response.json() as any;
      result = data.choices[0].message.content;
    } else if (provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: `${prompt}\n\nטקסט:\n${text}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('OpenAI API error');
      }

      const data = await response.json() as any;
      result = data.choices[0].message.content;
    }

    return c.json({ result });
  } catch (error) {
    console.error('AI error:', error);
    return c.json({ error: 'AI processing failed' }, 500);
  }
});

export default app;
