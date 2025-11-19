"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Avatar,
  AvatarFallback,
} from "@repo/components";
import { Bot, Send, User } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user",
      text: "The system flags abnormal usage based on historical averages.",
      timestamp: "3 min ago",
    },
    {
      id: "2",
      sender: "ai",
      text: "Certainly! Here are more FAQs tailored for your needs.",
      timestamp: "3 min ago",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Thank you for your question. I’ll help you shortly.",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full min-h-96 max-h-[600px] md:max-h-full">
      <CardHeader className="border-b flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Ask AI</CardTitle>
            <p className="text-xs text-muted-foreground">Powered by Grok</p>
          </div>
        </div>
      </CardHeader>

      {/* Scrollable Messages Area - This is the key fix */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`flex flex-col gap-1 max-w-[80%] ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">
                    {message.sender === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span className="text-muted-foreground">
                    {message.timestamp}
                  </span>
                </div>

                <div
                  className={`rounded-xl px-4 py-2 text-sm shadow-sm ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-muted-foreground/20">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim()}
            className="rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}