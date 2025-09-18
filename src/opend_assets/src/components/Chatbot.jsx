import React, { useState } from "react";
// Remove incorrect import as styles are already imported in App.jsx

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! Welcome to OpenD NFT Marketplace. How can I help you today?", 
      sender: "bot" 
    }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Process user query and generate response
    setTimeout(() => {
      const botResponse = generateResponse(input.trim().toLowerCase());
      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    }, 600);
  };

  const generateResponse = (query) => {
    // Simple response logic based on keywords
    if (query.includes("nft") && (query.includes("what") || query.includes("explain"))) {
      return "NFT stands for Non-Fungible Token. Unlike cryptocurrencies where each token is identical, NFTs are unique digital assets that represent ownership of a specific item, like digital art, music, or collectibles. Each NFT has a unique identifier stored on a blockchain, making it verifiably scarce and authentic.";
    } 
    else if (query.includes("buy") || query.includes("purchase") || query.includes("how to buy")) {
      return "To buy an NFT on OpenD: 1) Browse the Discover page to find NFTs for sale. 2) Click on the NFT you want to purchase. 3) Click the 'Buy' button. 4) Confirm the transaction. Once completed, the NFT will appear in your collection on the 'My NFTs' page.";
    }
    else if (query.includes("sell") || query.includes("list") || query.includes("how to sell")) {
      return "To sell an NFT on OpenD: 1) Go to 'My NFTs' page. 2) Find the NFT you want to sell. 3) Click 'List' and set your price. 4) Confirm the listing. Your NFT will now appear on the Discover page for others to buy.";
    }
    else if (query.includes("mint") || query.includes("create") || query.includes("make")) {
      return "To create/mint a new NFT on OpenD: 1) Go to the 'Create NFT' page. 2) Upload your digital asset (image, video, audio, etc.). 3) Fill in details like name, description. 4) Click 'Mint NFT'. 5) Confirm the transaction. Your new NFT will appear in your collection.";
    }
    else if (query.includes("wallet") || query.includes("connect")) {
      return "OpenD uses Internet Computer's native identity system. Your principal ID acts as your wallet address. Make sure you have sufficient tokens in your account for transactions. You can check your balance in the header of the application.";
    }
    else if (query.includes("fee") || query.includes("cost") || query.includes("gas")) {
      return "Transactions on OpenD require a small amount of Internet Computer cycles as fees. The exact amount varies depending on network conditions, but they're typically very low compared to other blockchain platforms.";
    }
    else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! How can I help you with OpenD marketplace today?";
    }
    else if (query.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    else {
      return "I'm not sure I understand. You can ask me about buying NFTs, selling NFTs, creating new NFTs, or general questions about how NFTs work.";
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chat-button" onClick={toggleChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>OpenD Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
