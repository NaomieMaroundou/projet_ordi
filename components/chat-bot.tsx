"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Loader2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Je peux vous aider à prendre un rendez-vous médical.",
        "Voulez-vous des informations sur nos services médicaux ?",
        "Nous avons plusieurs établissements de santé à travers le Gabon.",
        "Pour une urgence, veuillez appeler le 1300 (SAMU).",
        "Je peux vous aider à trouver un médecin spécialiste.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed z-50 bottom-20 right-4 rounded-full w-14 h-14 shadow-lg",
          isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700",
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed z-40 bottom-36 right-4 w-80 md:w-96 shadow-xl border-blue-100">
          <CardHeader className="bg-blue-600 text-white py-3 px-4 font-bold flex flex-row justify-between items-center">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Assistant SantéGabon
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-3 max-w-[80%] rounded-lg p-3",
                    message.sender === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-800",
                  )}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === "bot" ? <Bot className="w-4 h-4 mr-1" /> : <User className="w-4 h-4 mr-1" />}
                    <span className="text-xs opacity-70">{message.sender === "bot" ? "Assistant" : "Vous"}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-50 text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%] mb-3">
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span className="text-sm">L'assistant écrit...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Écrivez votre message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={inputValue.trim() === ""}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
