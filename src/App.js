import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');

  const handleAsk = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ask`, {
        question: question,
        language: 'EN', // or any language code like 'FR', 'ES', 'AR'
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply('Error connecting to backend');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ask StudyBloom</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleAsk}>Ask</button>
      <p>{reply}</p>
    </div>
  );
}

export default App;
