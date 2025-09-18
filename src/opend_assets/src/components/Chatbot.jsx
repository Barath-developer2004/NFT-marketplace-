import React, { useState, useRef, useEffect } from "react";
// Remove incorrect import as styles are already imported in App.jsx

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "👋 Welcome to OpenD NFT Marketplace! I'm your AI assistant powered by DeepSeek. I can help you with:\n\n🎨 Creating and minting NFTs\n💰 Buying and selling NFTs\n🔗 Understanding blockchain technology\n⚙️ Platform features and functionality\n\nHow can I assist you today?", 
      sender: "bot" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isLoading) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const userQuery = input;
    setInput("");
    setIsLoading(true);

    try {
      // Enhanced context for better AI responses
      const systemPrompt = `You are an expert AI assistant for OpenD, a premium NFT marketplace built on the Internet Computer blockchain. You provide professional, helpful, and accurate information.

ABOUT OPEND MARKETPLACE:
- Built on Internet Computer Protocol (ICP) with Motoko smart contracts
- Uses DANG tokens as the native currency for transactions
- Features: NFT minting, buying, selling, and collection management
- Wallet integration with Internet Computer's identity system
- Low transaction fees compared to Ethereum
- Decentralized storage for NFT metadata and assets

YOUR EXPERTISE INCLUDES:
✅ NFT fundamentals and blockchain technology
✅ OpenD platform navigation and features
✅ Buying, selling, and minting processes
✅ Wallet setup and transaction guidance
✅ Market trends and investment advice
✅ Technical troubleshooting
✅ Security best practices

RESPONSE GUIDELINES:
- Be professional yet friendly
- Provide step-by-step instructions when needed
- Use emojis appropriately for better engagement
- Keep responses concise but comprehensive
- Offer additional help or related suggestions
- If unsure, recommend contacting support

User Question: "${userQuery}"

Please provide a helpful, professional response that addresses their specific question about NFTs or the OpenD marketplace.`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'HTTP-Referer': 'https://opend-marketplace.com',
          'X-Title': 'OpenD NFT Marketplace Assistant'
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "system",
              content: "You are a professional AI assistant for OpenD NFT marketplace. Provide helpful, accurate, and engaging responses about NFTs and blockchain technology."
            },
            {
              role: "user",
              content: systemPrompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let aiResponse = data.choices[0]?.message?.content || "I apologize, but I'm having trouble processing your request right now. Please try rephrasing your question or contact our support team.";
      
      // Clean up response and add helpful formatting
      aiResponse = aiResponse.trim();
      if (!aiResponse.includes('🎯') && !aiResponse.includes('✅') && !aiResponse.includes('💡')) {
        aiResponse += "\n\n💡 Need more help? Feel free to ask follow-up questions!";
      }
      
      setMessages([...newMessages, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      
      // Enhanced fallback with more professional error handling
      let fallbackResponse;
      if (error.message.includes('network') || error.message.includes('fetch')) {
        fallbackResponse = "🔌 I'm currently experiencing connection issues. Let me provide you with some quick help based on your question:\n\n" + generateFallbackResponse(userQuery.toLowerCase());
      } else {
        fallbackResponse = "🤖 I'm running in offline mode right now. Here's what I can tell you:\n\n" + generateFallbackResponse(userQuery.toLowerCase());
      }
      
      setMessages([...newMessages, { text: fallbackResponse, sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (query) => {
    // Enhanced fallback responses with professional tone and emojis
    if (query.includes("nft") && (query.includes("what") || query.includes("explain"))) {
      return "🎨 **What are NFTs?**\n\nNFT stands for Non-Fungible Token - unique digital assets that represent ownership of specific items like:\n\n• Digital art and collectibles\n• Music and audio files\n• Virtual real estate\n• Gaming items\n\nEach NFT has a unique blockchain signature, making it verifiably scarce and authentic. Think of it as a digital certificate of authenticity! 🏆";
    } 
    else if (query.includes("buy") || query.includes("purchase") || query.includes("how to buy")) {
      return "💰 **How to Buy NFTs on OpenD:**\n\n1️⃣ Browse our **Discover** page to find available NFTs\n2️⃣ Click on the NFT you're interested in\n3️⃣ Review the details and price (in DANG tokens)\n4️⃣ Click the **'Buy'** button\n5️⃣ Confirm the transaction in your wallet\n\n✅ Once completed, the NFT will appear in your **'My NFTs'** collection!\n\n💡 Make sure you have enough DANG tokens in your wallet before purchasing.";
    }
    else if (query.includes("sell") || query.includes("list") || query.includes("how to sell")) {
      return "🏪 **How to Sell Your NFTs:**\n\n1️⃣ Go to your **'My NFTs'** page\n2️⃣ Find the NFT you want to sell\n3️⃣ Click the **'List'** button\n4️⃣ Set your desired price in DANG tokens\n5️⃣ Confirm the listing\n\n🎯 Your NFT will now appear on the **Discover** page for other users to purchase!\n\n📊 **Pro Tip:** Research similar NFTs to price competitively.";
    }
    else if (query.includes("mint") || query.includes("create") || query.includes("make")) {
      return "🎨 **Create Your Own NFT:**\n\n1️⃣ Navigate to the **'Create NFT'** page\n2️⃣ Upload your digital asset (image, video, audio, etc.)\n3️⃣ Add details like:\n   • Name and description\n   • Properties/attributes\n   • Royalty settings\n4️⃣ Click **'Mint NFT'**\n5️⃣ Confirm the transaction\n\n🚀 Your new NFT will appear in your collection and you can list it for sale anytime!\n\n✨ **Remember:** Make sure your content is original and follows our guidelines.";
    }
    else if (query.includes("wallet") || query.includes("connect")) {
      return "👛 **Wallet & Identity:**\n\nOpenD uses the **Internet Computer's native identity system**:\n\n🔐 **Your Principal ID** acts as your wallet address\n💳 Check your DANG token balance in the header\n🔒 Secure authentication without third-party wallets\n⚡ Lightning-fast transactions with minimal fees\n\n🛡️ **Security Tips:**\n• Never share your private keys\n• Always verify transaction details\n• Keep your identity secure";
    }
    else if (query.includes("fee") || query.includes("cost") || query.includes("gas")) {
      return "💸 **Transaction Fees:**\n\nOpenD operates on the **Internet Computer**, offering:\n\n✅ **Ultra-low fees** compared to Ethereum\n⚡ **Fast transactions** (2-3 seconds)\n🌱 **Eco-friendly** blockchain technology\n💎 **Predictable costs** - no gas wars!\n\nFees vary based on:\n• Network conditions\n• Transaction complexity\n• Storage requirements\n\n📊 Typically much lower than traditional NFT platforms!";
    }
    else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "👋 **Hello there!** Welcome to OpenD!\n\nI'm here to help you navigate the exciting world of NFTs. Whether you're looking to:\n\n🎨 Create your first NFT\n💰 Buy amazing digital art\n🏪 Sell your creations\n📚 Learn about blockchain\n\nJust ask me anything! I'm powered by advanced AI to give you the best assistance possible. 🤖✨";
    }
    else if (query.includes("thank")) {
      return "🙏 **You're very welcome!** \n\nI'm always here to help you succeed in the NFT space. Feel free to ask me anything else about:\n\n• Platform features\n• NFT best practices\n• Market insights\n• Technical support\n\nHappy creating and trading! 🚀✨";
    }
    else if (query.includes("api") || query.includes("error") || query.includes("problem")) {
      return "🔧 **Technical Support:**\n\nI'm currently running in **offline mode**, but I can still help with:\n\n✅ Platform guidance\n✅ NFT education\n✅ Step-by-step tutorials\n✅ Best practices\n\nFor technical issues:\n📧 Contact our support team\n💬 Check our FAQ section\n🔄 Try refreshing the page\n\n🤖 I'll be back online soon with full AI capabilities!";
    }
    else {
      return "🤔 **I'd love to help you with that!**\n\nI can assist you with:\n\n🎨 **Creating NFTs** - Minting and uploading\n💰 **Trading** - Buying and selling tips\n🔍 **Discovery** - Finding amazing NFTs\n📚 **Education** - Blockchain and NFT basics\n⚙️ **Platform** - Features and navigation\n\n💡 **Try asking:**\n• \"How do I create an NFT?\"\n• \"What are the trading fees?\"\n• \"How do I connect my wallet?\"\n\nWhat would you like to know more about? 😊";
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chat-button-wrapper">
          <div className="chat-notification">💬</div>
          <button className="chat-button" onClick={toggleChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <div className="chat-tooltip">Need help? Ask our AI assistant!</div>
        </div>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <div className="header-title">
                <h3>🤖 OpenD Assistant</h3>
                <div className="status-indicator">
                  <span className="status-dot online"></span>
                  <small>Powered by DeepSeek AI</small>
                </div>
              </div>
            </div>
            <button className="close-button" onClick={toggleChat}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <div className="quick-actions">
              <button onClick={() => setInput("How do I create an NFT?")} className="quick-action">🎨 Create NFT</button>
              <button onClick={() => setInput("How to buy NFTs?")} className="quick-action">💰 Buy NFT</button>
              <button onClick={() => setInput("What are NFTs?")} className="quick-action">❓ Learn NFTs</button>
            </div>
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything about NFTs or OpenD..."
                className="chat-input"
                disabled={isLoading}
              />
              <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
