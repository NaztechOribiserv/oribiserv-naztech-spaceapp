import React, { useState, useEffect, useRef } from 'react';
import { LucideMessageCircle, LucideX, LucideSend, LucideLoader } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Logo } from './Logo';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatBotProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ forceOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Systems online. I'm Oribibot, your elite AI strategist. How can I optimize your business infrastructure or IT services today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Domain Hosting info",
    "Network Installation quote",
    "Dolibarr ERP setup",
    "Website Development",
    "Hardware repair inquiry"
  ];

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  const closeChat = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
      // Initialize chat session on mount
      geminiService.startChat();
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const response = await geminiService.sendMessage(userMessage, messages);

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-surface rounded-[2.5rem] brutal-card flex flex-col overflow-hidden h-[600px] animate-in slide-in-from-bottom-10 fade-in duration-500 scale-100 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-brand-950 p-6 flex justify-between items-center border-b-2 border-[#04101a] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 circuit-bg pointer-events-none" />
            <div className="flex items-center relative z-10">
              <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mr-4 border border-brand-500/20 shadow-inner">
                <Logo size={28} />
              </div>
              <div>
                <h3 className="font-display font-black text-white tracking-widest uppercase text-xs">Oribibot <span className="text-brand-500">Node</span></h3>
                <p className="text-[0.55rem] text-brand-400 uppercase tracking-[0.3em] font-black">AI Strategist</p>
              </div>
            </div>
            <button 
              onClick={closeChat}
              className="text-white/50 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all relative z-10"
            >
              <LucideX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-brand-950">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm shadow-retro-brand whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-500 text-brand-950 font-black rounded-tr-none border-2 border-brand-950'
                      : 'bg-surface text-brand-50 border-2 border-[#04101a] rounded-tl-none font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface text-brand-50 rounded-2xl rounded-tl-none px-6 py-4 border-2 border-[#04101a] shadow-retro flex items-center space-x-2">
                   <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 flex flex-wrap gap-2 bg-brand-950 border-t-2 border-[#04101a]">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={() => handleQuickAction(action)}
                className="text-[0.6rem] font-black bg-surface hover:bg-brand-500 text-brand-400 hover:text-brand-950 px-3 py-2 rounded-xl border-2 border-[#04101a] hover:border-brand-950 transition-all uppercase tracking-widest"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 bg-brand-950 border-t-2 border-[#04101a]">
            <div className="flex items-center bg-surface rounded-2xl px-5 py-4 border-2 border-[#04101a] focus-within:border-brand-500 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Initialize protocol..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-brand-500/20 font-medium"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className={`ml-3 p-2 rounded-xl transition-all ${
                  input.trim() 
                    ? 'text-brand-500 hover:bg-brand-500/10' 
                    : 'text-muted/30'
                }`}
              >
                <LucideSend size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};