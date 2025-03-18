import { useEffect, useRef, useState } from "react";
import { CHAT, UPLOAD } from "../utils/constants";
import { useSharedFile } from "../utils/useSharedFile";
import axios from "axios";
import Loader from "./Loader";

const Chat = () => {
    const { sharedFile } = useSharedFile();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const chatContainerRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    // Upload file and set initial messages
    useEffect(() => {
        const uploadFile = async (file) => {
            if (!file) {
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const { data } = await axios.post(UPLOAD, formData);
                setMessages([
                    { role: "bot", content: "Hello! How can I assist you with your PDF?" },
                    { role: "assistant", content: data.summary.content },
                    { role: "assistant", content: data.sample_questions.content },
                ]);
            } catch (error) {
                console.error("Error processing file:", error);
                setMessages([{ role: "bot", content: "Failed to process the uploaded PDF." }]);
            } finally {
                setLoading(false);
            }
        };

        uploadFile(sharedFile);
    }, [sharedFile]);

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const { data } = await axios.post(`${CHAT}?question=${encodeURIComponent(input)}`);
            setMessages((prev) => [...prev, { role: data.answer.role, content: data.answer.content }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: "Sorry, an error occurred while fetching the response." },
            ]);
        }
    };

    return (
        <div className="flex h-screen flex-col bg-white text-gray-800 w-full sm:w-1/2">
            {loading ? (
                <div className="flex h-full items-center justify-center">
                    <Loader isVisible={loading} />
                </div>
            ) : (
                <>
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto px-4 py-6"
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-4 ${
                                        msg.role === "user"
                                            ? "bg-teal-500 text-white"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={handleSendMessage}
                        className="mx-auto w-full max-w-2xl p-4"
                    >
                        <div className="relative flex items-center rounded-lg border border-gray-300 bg-white shadow-sm">
              <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                      }
                  }}
                  placeholder="Ask me anything about your PDF..."
                  className="w-full resize-none border-0 bg-transparent p-3 text-gray-800 placeholder-gray-400 focus:outline-none"
                  rows={1}
              />
                            <button
                                type="submit"
                                className="pr-3 text-teal-500 hover:text-teal-600"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h14M12 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Chat;