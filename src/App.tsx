import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados : ', error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend React App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;