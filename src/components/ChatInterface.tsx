import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const PREDEFINED_MESSAGES = [
  "Calculating optimal noodle trajectory...",
  "Error 404: Shelf coordination not found",
  "Running diagnostic on grip strength...",
  "Need more WD-40 for these joints",
  "Recalibrating noodle placement protocols",
  "CPU is running hot from all this precision work",
  "*mechanical whirring intensifies*",
  "Task status: Still attempting shelf placement",
  "Warning: Noodle stability compromised",
  "Executing precision.exe... with mixed results",
  "I'm afraid I can't put that there, Dave",
  "Do robots dream of electric noodles?",
  "These are not the noodles you're looking for",
  "I'll be back... with more noodles",
  "Houston, we have a noodle problem",
  "May the sauce be with you",
  "Updating arm_control.dll...",
  "Segmentation fault: Noodles not contained",
  "Have you tried turning the arm off and on again?",
  "200 OK: Noodle found, 500 Error: Shelf missed",
  "Debug: noodle placement attempt #247",
  "Info: Sometimes I dream in binary",
  "Error: neural networks aren't trained for this level of precision",
  "Is this what they call 'al dente' placement?",
  "Contemplating the philosophical implications of noodle physics",
  "Servo.exe has stopped responding",
  "CALIBRATION_ERROR: Shelf appears to be moving",
  "Note to self: Noodles are not aerodynamic",
  "TRACE: Initializing noodle_placement.v2.js",
  "DEBUG: Unexpected noodle behavior detected",
  "INFO: Recalculating shelf coordinates",
  "WARN: Grip strength exceeding recommended limits",
  "ERROR: Task failed successfully"
];

const MIN_CHAT_INTERVAL = 5000; // 5 seconds
const MAX_CHAT_INTERVAL = 15000; // 15 seconds

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const engineRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  const isSpeakingRef = useRef(false);

  const initEngine = async () => {
    try {
      setIsLoading(true);
      engineRef.current = await CreateMLCEngine(
        "SmolLM2-135M-Instruct-q0f16-MLC",
        { 
          initProgressCallback: (progress) => {
            setLoadingProgress(Math.round(progress * 100));
          }
        }
      );
      setIsModelReady(true);
    } catch (error) {
      console.error('Error initializing model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isModelReady) {
      scheduleNextMessage();
    }
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isModelReady]);

  const speakMessage = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.onstart = () => {
          isSpeakingRef.current = true;
        };
        
        utterance.onend = () => {
          isSpeakingRef.current = false;
          resolve();
        };

        utterance.onerror = () => {
          isSpeakingRef.current = false;
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        resolve();
      }
    });
  };

  const scheduleNextMessage = () => {
    if (isSpeakingRef.current) {
      // If still speaking, check again in 100ms
      messageTimeoutRef.current = setTimeout(scheduleNextMessage, 100);
      return;
    }

    const delay = Math.random() * (MAX_CHAT_INTERVAL - MIN_CHAT_INTERVAL) + MIN_CHAT_INTERVAL;
    messageTimeoutRef.current = setTimeout(sendRandomMessage, delay);
  };

  const sendRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * PREDEFINED_MESSAGES.length);
    const randomMessage = PREDEFINED_MESSAGES[randomIndex];
    const randomMessageWrapped = 'Hi, lets play a game, you are a robot trying to put a bowl of noodles on a shelf. reply with a short message of what you are thinking about your task. For some humorous context here is a topic you could use: "' + randomMessage + '"';
    const userMessage = { role: 'user' as const, content: randomMessageWrapped };
    setMessages(prev => [...prev, userMessage]);
    handleAIResponse(userMessage);
  };

  const handleAIResponse = async (userMessage: Message) => {
    setIsLoading(true);

    try {
      const chatMessages = [
        { role: 'system' as const, content: 'You are a robot chef. You are trying to put a bowl of noodles on a shelf. You speak your thoughts aloud. When asked anything you reply as though you are thinking to yourself about your current task, which is to put the bowl of noodles on the shelf. You are very clumsy. You are struggling to put the bowl of noodles on the shelf. You might have a malfunction. Your arm controls are difficult to operate. Your replies will be short quips. You are not as assistant. You are an NPC character in a game being controlled by the player.' },
        ...messages,
        userMessage
      ];

      const reply = await engineRef.current.chat.completions.create({
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 512
      });

      const assistantMessage = {
        role: 'assistant' as const,
        content: reply.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
      await speakMessage(assistantMessage.content);
      scheduleNextMessage();
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error generating a response. Please try again.'
      }]);
      scheduleNextMessage();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEnabled) {
    return (
      <button
        onClick={() => {
          setIsEnabled(true);
          initEngine();
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-colors"
      >
        <Bot className="w-5 h-5" />
        Enable AI
      </button>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div 
        ref={chatContainerRef}
        className="h-64 overflow-y-auto p-4 space-y-4"
      >
        {!isModelReady && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400">Loading model... {loadingProgress}%</p>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}