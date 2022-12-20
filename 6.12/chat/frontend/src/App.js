import { useState, useEffect, useCallback } from "react";

import Chat from "./components/Chat/Chat";
import ChatForm from "./components/ChatForm/ChatForm";
import SigninChatForm from "./components/SigninChatForm/SigninChatForm";

import './App.css';
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("https://dry-ocean-99980.herokuapp.com");

function App() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on("chat-message", (newMessage) => {
      setMessages(prevMessages => {
        return [...prevMessages, newMessage]
      })
    })
  }, [])

  const addMessage = ({message}) => {
    const newMessage = {
      message,
      id: nanoid(),
      user: name
    }
    setMessages(prevMessages => {
      return [...prevMessages, newMessage]
    })
    socket.emit("chat-message", newMessage)
  }

  const handleSubmit = useCallback(({name}) => setName(name), []);
  

  return (
    <div className="App">
      {!name && <SigninChatForm onSubmit={handleSubmit} />}
      {name && (
          <>
            <ChatForm onSubmit={addMessage} />
            <Chat items={messages} owner={name} />
          </>
      )}
    </div>
  );
}

export default App;
