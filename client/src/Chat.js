import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
socket.on("connect", () => console.log("Conexão feita com socket.io"));

const Chat = () => {
  const [message, updateMessage] = useState("");
  const [messages, updateMessages] = useState([]);

  const handleInputChange = e => updateMessage(e.target.value);
  const handleFormSubmit = e => {
    e.preventDefault();
    if (message.trim()) {
      updateMessages([...messages, { id: 1, message }]);
      updateMessage("");
    }
  };

  return (
    <main className="container">
      <ul className="list">
        {messages.map(m => (
          <li className="list__item list__item--mine">
            <span className="message message--mine" key={m.id}>
              {m.message}
            </span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          placeholder="Type a new message here"
          onChange={handleInputChange}
          value={message}
          type="text"
        />
      </form>
    </main>
  );
};

export default Chat;
