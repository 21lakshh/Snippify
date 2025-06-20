import { useState, useRef } from "react";
import { Menu, Send, Bot, Code, Save, Loader2 } from "lucide-react";
import snipgenerator, { type ChatMessage } from "../Agents/snipgenerator";
import { type SnippetFormData } from "./NewSnippetForm";

interface AIGenerateProps {
    onToggleSidebar?: () => void;
    onCreateSnippet?: (data: SnippetFormData) => Promise<void>;
}

interface Message extends ChatMessage {
    id: string;
    timestamp: Date;
    isLoading?: boolean;
}
export default function AIGenerate({ onToggleSidebar, onCreateSnippet }: AIGenerateProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hi! What snippet do you need? I can help you create React components, React hooks, or plain JavaScript/TypeScript/Python functions.',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedSnippet, setGeneratedSnippet] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const chatHistory: ChatMessage[] = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await snipgenerator(chatHistory);
            
            console.log("🤖 Raw AI Response:", response);

            let responseContent = response;
            
            // Regex to find a JSON object within the AI's response string.
            const jsonMatch = response.match(/\{[\s\S]*\}/);

            if (jsonMatch && jsonMatch[0]) {
                try {
                    // We found something that looks like a JSON object.
                    const jsonString = jsonMatch[0];
                    const parsedResponse = JSON.parse(jsonString);

                    // Check if it's a valid snippet object.
                    if (parsedResponse.title && parsedResponse.code && parsedResponse.tags) {
                        setGeneratedSnippet(parsedResponse);
                        responseContent = `Perfect! I've generated your snippet "${parsedResponse.title}". You can save it to your library using the save button above.`;
                    }
                } catch (e) {
                    // It looked like JSON, but wasn't valid. We'll just display the raw response.
                    console.error("AI response looked like JSON, but failed to parse.", e);
                }
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Error calling snippet generator:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error while processing your request. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const saveSnippet = async () => {
        if (!generatedSnippet || !onCreateSnippet || isSaving) return;
        
        setIsSaving(true);
        
        try {
            const snippetData: SnippetFormData = {
                title: generatedSnippet.title,
                description: generatedSnippet.description,
                code: generatedSnippet.code,
                tags: Array.isArray(generatedSnippet.tags) 
                    ? generatedSnippet.tags.map((tag: string) => ({ name: tag }))
                    : [],
                isPrivate: generatedSnippet.isPrivate || false
            };

            await onCreateSnippet(snippetData);
            
            const successMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `✅ Snippet "${generatedSnippet.title}" saved successfully to your library!`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, successMessage]);
            setGeneratedSnippet(null);
            
        } catch (error) {
            console.error('❌ Error saving snippet:', error);
            
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: '❌ Failed to save snippet. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsSaving(false);
        }
    };

    const formatMessage = (content: string) => {
        // Check if content contains code blocks
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Add text before code block
            if (match.index > lastIndex) {
                parts.push(
                    <span key={lastIndex} className="whitespace-pre-wrap">
                        {content.slice(lastIndex, match.index)}
                    </span>
                );
            }

            // Add code block
            parts.push(
                <div key={match.index} className="my-3">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400 uppercase tracking-wide">
                                {match[1] || 'code'}
                            </span>
                            <Code className="w-4 h-4 text-gray-400" />
                        </div>
                        <pre className="text-sm text-gray-100 overflow-x-auto">
                            <code>{match[2]}</code>
                        </pre>
                    </div>
                </div>
            );

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < content.length) {
            parts.push(
                <span key={lastIndex} className="whitespace-pre-wrap">
                    {content.slice(lastIndex)}
                </span>
            );
        }

        return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{content}</span>;
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Header */}
            <div className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Mobile hamburger menu */}
                        {onToggleSidebar && (
                            <button
                                onClick={onToggleSidebar}
                                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        )}
                        
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white">AI Snippet Generator</h1>
                            <p className="text-sm text-gray-400">Generate code snippets with AI assistance</p>
                        </div>
                    </div>
                    
                    {generatedSnippet && onCreateSnippet && (
                        <button
                            onClick={saveSnippet}
                            disabled={isSaving}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save Snippet</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 ">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                       
                        
                        <div
                            className={`max-w-3xl rounded-lg p-4 ${
                                message.role === 'user'
                                    ? 'bg-blue-600 text-white ml-12'
                                    : 'bg-gray-800 text-gray-100 mr-12'
                            }`}
                        >
                            <div className="text-sm md:text-base">
                                {formatMessage(message.content)}
                            </div>
                            <div className="text-xs opacity-70 mt-2">
                                {message.timestamp.toLocaleTimeString()}
                            </div>
                        </div>

     
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex items-start space-x-3">
                        <div className="bg-gray-800 text-gray-100 rounded-lg p-4 mr-12">
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating snippet...</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-800 p-4 md:p-6">
                <div className="flex items-end space-x-4">
                    <div className="flex flex-row w-full">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Describe the snippet you need... (e.g., 'I want a React hook that fetches data from an API')"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors duration-200"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
