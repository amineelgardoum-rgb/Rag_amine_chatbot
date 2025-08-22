import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MatrixBackground from "./MatrixBackground";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! I am Amine's AI assistant. Ask me anything about him.",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const encodedQuery = encodeURIComponent(currentInput);
      const url = `/api/ask?query=${encodedQuery}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok (status: ${response.status})`
        );
      }

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I ran into an error. Please check the connection to the server and try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MatrixBackground />
      <div className="chat-container">
        <header className="chat-header">
          <h1>Amine's AI Chatbot</h1>
        </header>
        <main className="message-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <p className="thinking">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>
        <footer className="input-form-container">
          <form className="input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={isLoading}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </>
  );
}

export default App;
