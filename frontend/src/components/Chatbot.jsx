import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI travel assistant. How can I help?", isBot: true },
        {
            text: "Here are some things I can help you with:",
            isBot: true,
            options: ["Popular Packages", "Check Prices", "Contact Support", "Book a Trip"]
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userMessage = { text: text, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        const userText = text.toLowerCase();
        setInput('');

        // Simple keyword matching logic
        let responseText = "I'm not sure about that. Try asking about our 'packages', 'beach' destinations, or 'contact' support!";

        if (userText.includes('hello') || userText.includes('hi') || userText.includes('hey')) {
            responseText = "Hello! Ready to plan your dream vacation?";
        } else if (userText.includes('beach') || userText.includes('sea') || userText.includes('ocean')) {
            responseText = "We have amazing beach packages in Maldives and Bali! Check them out in the 'Packages' section.";
        } else if (userText.includes('price') || userText.includes('cost') || userText.includes('cheap')) {
            responseText = "Our packages start from just ₹15,999! We have options for every budget.";
        } else if (userText.includes('contact') || userText.includes('email') || userText.includes('help')) {
            responseText = "You can reach our support team at support@wanderlust.in or call us at +91 98765 43210.";
        } else if (userText.includes('book') || userText.includes('reservation')) {
            responseText = "You can easily book any package by clicking the 'Book Now' button on the package details page.";
        }

        const defaultOptions = ["Popular Packages", "Check Prices", "Contact Support", "Book a Trip"];

        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: responseText,
                isBot: true,
                options: defaultOptions
            }]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col mb-4 overflow-hidden border border-slate-200"
                    >
                        <div className="bg-primary p-4 flex justify-between items-center text-white">
                            <h3 className="font-semibold">AI Assistant</h3>
                            <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                                    <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${msg.isBot ? 'bg-white text-slate-800 shadow-sm rounded-tl-none' : 'bg-accent text-white rounded-tr-none'}`}>
                                        {msg.text}
                                    </div>
                                    {msg.options && (
                                        <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                                            {msg.options.map((option, optIdx) => (
                                                <button
                                                    key={optIdx}
                                                    onClick={() => handleSend(option)}
                                                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs hover:bg-blue-200 transition"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-3 border-t flex gap-2 bg-white">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-grow px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm bg-slate-50"
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={() => handleSend()} className="bg-primary text-white p-2 rounded-lg hover:bg-slate-700"><Send className="h-4 w-4" /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-accent hover:bg-sky-500 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-105"
            >
                <MessageSquare className="h-6 w-6" />
            </button>
        </div>
    );
};
export default Chatbot;
