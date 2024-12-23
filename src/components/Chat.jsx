import { useEffect, useRef, useState } from "react";
import {API, BASEURL} from "../utils/constants"; // Ensure API is defined in your constants
import { useSharedFile } from "../utils/useSharedFile";
import axios from "axios";

const Chat = () => {
    const { sharedFile } = useSharedFile();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef(null);

    // Scroll to bottom whenever new message is added
    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Process the file upload response and display it in the chat
    // useEffect(() => {
    //     const processFileResponse = async () => {
    //         if (!sharedFile) return;
    //
    //         try {
    //             // Simulate API call to process uploaded file
    //             const response = await fetch(`${API}/process-pdf`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ fileName: sharedFile.name }),
    //             });
    //
    //             if (!response.ok) {
    //                 throw new Error("Failed to process the uploaded file.");
    //             }
    //
    //             const data = await response.json(); // Assume the API sends the structure you provided
    //
    //             // Display summary and sample questions in the chat
    //             const summaryMessage = {
    //                 role: "assistant",
    //                 content: data.summary.content,
    //             };
    //
    //             const sampleQuestionsMessage = {
    //                 role: "assistant",
    //                 content: data.sample_questions.content,
    //             };
    //
    //             setMessages((prevMessages) => [
    //                 ...prevMessages,
    //                 { role: "bot", content: "PDF uploaded and processed successfully." },
    //                 summaryMessage,
    //                 sampleQuestionsMessage,
    //             ]);
    //         } catch (error) {
    //             console.error("Error processing file:", error);
    //             setMessages((prevMessages) => [
    //                 ...prevMessages,
    //                 { role: "bot", content: "Failed to process the uploaded PDF." },
    //             ]);
    //         }
    //     };
    //
    //     processFileResponse();
    // }, [sharedFile]);


    const uploadFile = async (file) => {

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(BASEURL+'upload', formData);

            // if (!response.ok) {
            //     throw new Error("Failed to process the uploaded file.");
            // }

            const data = await response.data;

            const summaryMessage = {
                role: "assistant",
                content: data.summary.content,
            };

            const sampleQuestionsMessage = {
                role: "assistant",
                content: data.sample_questions.content,
            };

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "bot", content: "PDF uploaded and processed successfully." },
                summaryMessage,
                sampleQuestionsMessage,
            ]);

        } catch (error) {
            console.error("Error processing file:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "bot", content: "Failed to process the uploaded PDF." },
            ]);
        } finally {
            console.log("upload file callled")
        }
    };

    useEffect(() => {
        uploadFile(sharedFile)
    }, [sharedFile]);


    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (input.trim() === "") return;

        const userMessage = {
            role: "user",
            content: input,
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");

        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer YOUR_TOKEN_HERE", // Replace with your token
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "meta-llama/Meta-Llama-3-8B-Instruct",
                    messages: [{ role: "user", content: input }],
                    max_tokens: 500,
                    stream: false,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response from the API");
            }

            const data = await response.json();

            const botMessage = {
                role: "bot",
                content: data.choices[0].message.content,
            };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching response from API:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "bot",
                    content: "Sorry, there was an error fetching the response from the bot.",
                },
            ]);
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
                <form onSubmit={handleSendMessage} className="flex items-center space-x-1">
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ask any question ..."
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
