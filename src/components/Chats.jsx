// import React, { useState, useEffect } from "react";
// import { div } from "framer-motion/client";
// import { HoverEffect } from "../components/ui/card-hover-effect";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [chaton, setChaton] = useState(false);

//   useEffect(() => {
//     const newSocket = io(import.meta.env.VITE_BACKEND_URL);

//     newSocket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     newSocket.on("receiveMessage", (data) => {
//       console.log("Chat response:", data);
//       console.log("data : ", data.outputs[0].outputs[0].artifacts.message);
//       const newMessage = {
//         text: data.outputs[0].outputs[0].artifacts.message,
//         isUser: false,
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setLoading(false);
//     });

//     newSocket.on("error", (error) => {
//       console.error("Socket error:", error);
//       const newMessage = {
//         text: "An error occurred.",
//         isUser: false,
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setLoading(false);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleSubmit = async () => {
//     setChaton(true);
//     if (!socket || !inputValue.trim()) return;

//     // Add user message to chat
//     const userMessage = {
//       text: inputValue,
//       isUser: true,
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     setLoading(true);
//     try {
//       const messageData = {
//         inputValue: inputValue,
//       };

//       socket.emit("sendMessage", messageData);
//       setInputValue("");
//     } catch (error) {
//       console.error("Error:", error.message);
//       const errorMessage = {
//         text: "An error occurred.",
//         isUser: false,
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="w-lvw bg-[#121212] flex flex-col h-screen ">
//       {/* Messages area */}
//       {!chaton && (
//         <div className="bg-[#121212] w-[95vw] h-[85vh] relative text-center flex flex-col items-center justify-center">
//           <h1 className="text-white text-4xl font-bold pt-10">
//             Social Media Performance Analysis using Langflow and Datastax
//           </h1>
//           <div className="max-w-5xl mx-auto px-8">
//             <HoverEffect items={projects} />
//           </div>
//         </div>
//       )}
//       <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
//         {messages.map((message, index) => (
//           <div className="flex flex-col space-y-3 max-w-5xl mx-auto">
//             <div
//               key={index}
//               className={`flex ${
//                 message.isUser ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[100%] sm:max-w-[100%] md:max-w-[100%] px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
//                   message.isUser
//                     ? "bg-[#358078] text-white rounded-br-none"
//                     : "bg-[#0f172a] text-gray-100 rounded-bl-none"
//                 }`}
//               >
//                 <div className="text-sm sm:text-base whitespace-pre-wrap break-words">
//                   {message.text}
//                 </div>
//                 <div className="text-xs opacity-50 mt-1">
//                   {new Date(message.timestamp).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Input area */}
//       <div className="bg-[#121212] border-t border-slate-300 p-2 sm:p-4">
//         <div className="flex items-center gap-2 sm:gap-4 max-w-5xl mx-auto">
//           <textarea
//             className="flex-1 bg-[#0f172a] text-white rounded-lg p-2 sm:p-3 min-h-[44px] max-h-32 text-sm sm:text-base resize-none outline-none"
//             placeholder="Type a message..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={handleKeyPress}
//             rows={1}
//           />
//           <button
//             className="bg-[#454149] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
//             onClick={handleSubmit}
//             disabled={loading || !inputValue.trim()}
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const projects = [
//   {
//     title: "About",
//     description:
//       "I can help you analyze data and provide insights. Just ask me anything!",
//     link: "https://stripe.com",
//   },
//   {
//     title: "Tips",
//     description: "Ask about performance metrics",
//     link: "https://netflix.com",
//   },
//   {
//     title: "Example Prompts",
//     description:
//       "A multinational technology company that specializes in Internet-related services and products.",
//     link: "https://google.com",
//   },
// ];

// export default Chat;

import React, { useState, useEffect } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chaton, setChaton] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("receiveMessage", (data) => {
      console.log("Chat response:", data);
      console.log("data : ", data.outputs[0].outputs[0].artifacts.message);
      const newMessage = {
        text: data.outputs[0].outputs[0].artifacts.message,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setLoading(false);
      setIsResponding(false);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      const newMessage = {
        text: "An error occurred.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setLoading(false);
      setIsResponding(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    setChaton(true);
    if (!socket || !inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setIsResponding(true);
    try {
      const messageData = {
        inputValue: inputValue,
      };

      socket.emit("sendMessage", messageData);
      setInputValue("");
    } catch (error) {
      console.error("Error:", error.message);
      const errorMessage = {
        text: "An error occurred.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setLoading(false);
      setIsResponding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Custom components for markdown rendering
  const MarkdownComponents = {
    // Custom rendering for code blocks
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-800 rounded px-1 py-0.5" {...props}>
          {children}
        </code>
      );
    },
    // Custom rendering for tables
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-800">{children}</thead>;
    },
    th({ children }) {
      return (
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
          {children}
        </th>
      );
    },
    td({ children }) {
      return <td className="px-4 py-2 text-sm border-t border-gray-700">{children}</td>;
    },
    // Custom rendering for links
    a({ children, href }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className="w-lvw bg-[#121212] flex flex-col h-screen">
      {!chaton && (
        <div className="bg-[#121212] w-[95vw] h-[85vh] relative text-center flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl font-bold pt-10">
            Social Media Performance Analysis using Langflow and Datastax
          </h1>
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
        <div className="flex flex-col space-y-3 max-w-5xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[100%] sm:max-w-[100%] md:max-w-[100%] px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                  message.isUser
                    ? "bg-[#358078] text-white rounded-br-none"
                    : "bg-[#0f172a] text-gray-100 rounded-bl-none"
                }`}
              >
                <div className="text-sm sm:text-base whitespace-pre-wrap break-words">
                  {message.isUser ? (
                    message.text
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={MarkdownComponents}
                      className="prose prose-invert max-w-none"
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>
                <div className="text-xs opacity-50 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isResponding && (
            <div className="flex justify-start">
              <div className="bg-[#0f172a] text-gray-100 px-3 py-2 sm:px-4 sm:py-2 rounded-lg rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base">Responding</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#121212] border-t border-slate-300 p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4 max-w-5xl mx-auto">
          <textarea
            className="flex-1 bg-[#0f172a] text-white rounded-lg p-4 sm:p-3 min-h-[44px] max-h-32 text-sm sm:text-base resize-none outline-none"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            className="bg-[#454149] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
            onClick={handleSubmit}
            disabled={loading || !inputValue.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const projects = [
  {
    title: "About",
    description:
      "I can help you analyze data and provide insights. Just ask me anything!",
    link: "https://stripe.com",
  },
  {
    title: "Tips",
    description: "Ask about performance metrics",
    link: "https://netflix.com",
  },
  {
    title: "Example Prompts",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
];

export default Chat;