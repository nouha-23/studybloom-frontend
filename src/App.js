import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ask`, {
        question: question,
        language: 'EN',
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-pink-500 animate-bounce">🌸 Ask StudyBloom</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="p-3 rounded-2xl border border-pink-300 w-64 focus:outline-none shadow-md"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={handleAsk}
          className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-4 py-2 rounded-2xl shadow-md"
        >
          Ask
        </button>
      </div>

      {loading && <p className="text-purple-500">Blooming your answer... 🌸</p>}
      {!loading && reply && (
        <p className="text-center text-lg text-purple-700 bg-white p-4 rounded-2xl shadow-md max-w-md">
          {reply}
        </p>
      )}

      <footer className="mt-12 text-sm text-gray-500">
        Made with ❤️ by Nouha
      </footer>
    </div>
  );
}
