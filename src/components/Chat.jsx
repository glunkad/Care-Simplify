import {useState} from "react";

const Chat = () => {

    const [messages, setMessages] = useState([
        {sender: "bot", text: "Hello! How can I assist you today?"},
    ]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const userMessage = {sender: "user", text: input.trim()};
        setMessages((prev) => [...prev, userMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {sender: "bot", text: "Let me think about that..."};
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);

        setInput(""); // Clear input
    };


    return (
        <div>
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`${
                                    msg.sender === "user" ? "bg-blue-500" : "bg-gray-300"
                                } text-white px-4 py-2 rounded-lg max-w-xs`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-white border-t flex items-center">
                <input
                    type="text"
                    className="flex-grow border rounded-lg p-2 mr-4"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>

    )
}

export default Chat;
