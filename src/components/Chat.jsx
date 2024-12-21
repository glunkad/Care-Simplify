import { useEffect, useRef, useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);

    // Scroll to bottom whenever new message is added
    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (input.trim() === "") return;

        // Add the user's message
        const userMessage = {
            role: "user",
            content: input,
        };

        setMessages([...messages, userMessage]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                role: "bot",
                content: "This is a simulated response from the bot!",
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    return (
        <div className="flex h-auto bg-gray-50 items-end">
            {/* Chat Messages Container */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                ref={chatContainerRef}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] p-3 rounded-lg ${
                                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
