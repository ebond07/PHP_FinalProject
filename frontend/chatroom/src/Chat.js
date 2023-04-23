import React, { useState, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default Chat;