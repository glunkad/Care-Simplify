import { useEffect, useRef, useState } from "react";
import {API} from "../utils/constants";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);

    // Scroll to bottom whenever new message is added
    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (input.trim() === "") return;

        // Add the user's message to the state
        const userMessage = {
            role: "user",
            content: input,
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput(""); // Clear the input after sending

        try {
            // Call Hugging Face API to get the bot response using fetch
            const response = await fetch(
                API,
                {
                    method: "POST",
                    headers: {
                        // "Authorization": "Bearer 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", // Replace with your Hugging Face API key
                        "Authorization": TOKEN, // Replace with your Hugging Face API key
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "meta-llama/Meta-Llama-3-8B-Instruct",
                        messages: [{ role: "user", content: input }],
                        max_tokens: 500,
                        stream: false,
                    }),
                }
            );

            // Check if the response is okay
            if (!response.ok) {
                throw new Error("Failed to fetch response from the API");
            }

            const data = await response.json(); // Parse the response as JSON

            // Add the bot's response to the messages
            const botMessage = {
                role: "bot",
                content: data.choices[0].message.content, // Extract bot's message
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);

        } catch (error) {
            console.error("Error fetching response from API:", error);
            // In case of an error, add a default error message from the bot
            const botErrorMessage = {
                role: "bot",
                content: "Sorry, there was an error fetching the response from the bot.",
            };
            setMessages((prevMessages) => [...prevMessages, botErrorMessage]);
        }
    };

    return (
        <div className="flex flex-col h-auto bg-gray-50 w-2/5">
            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
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
