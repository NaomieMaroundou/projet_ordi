"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, PlusCircle, ImageIcon, Paperclip, MoreHorizontal } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

type Contact = {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

type Message = {
  id: string
  senderId: string
  text: string
  time: string
  isRead: boolean
}

export function MessagingSystem() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Jean Moussavou",
      avatar: "/images/doctor1.png",
      lastMessage: "Bonjour, comment puis-je vous aider ?",
      time: "10:30",
      unread: 1,
      online: true,
    },
    {
      id: "2",
      name: "Dr. Marie Ndong",
      avatar: "/images/doctor2.png",
      lastMessage: "Votre rendez-vous est confirmé pour demain à 14h.",
      time: "Hier",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Hôpital Central de Libreville",
      avatar: "/placeholder.svg?height=40&width=40&text=HCL",
      lastMessage: "Merci de vous présenter 15 minutes avant votre rendez-vous.",
      time: "Lun",
      unread: 0,
      online: true,
    },
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      senderId: "1",
      text: "Bonjour, comment puis-je vous aider ?",
      time: "10:30",
      isRead: false,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!isAuthenticated || !selectedContact || newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: true,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact.id,
        text: "Merci pour votre message. Je vous répondrai dès que possible.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isRead: false,
      }

      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  const selectContact = (contact: Contact) => {
    if (!isAuthenticated) {
      router.push("/login?returnUrl=/communaute/messages")
      return
    }
    
    setSelectedContact(contact)

    // Mark messages as read
    setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
  }

  const handleLoginRedirect = () => {
    router.push("/login?returnUrl=/communaute/messages")
  }

  return (
    <div className="w-full">
      {!isAuthenticated ? (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <AlertDescription>
            Vous devez être connecté pour accéder à la messagerie.
            <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" onClick={handleLoginRedirect}>
              Se connecter
            </Button>{" "}
            ou
            <Button 
              variant="link" 
              className="text-blue-600 p-0 h-auto font-normal" 
              onClick={() => router.push("/register")}
            >
              créer un compte
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="p-3 border-b">
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="p-0 flex flex-1 overflow-hidden">
            {/* Contacts List */}
            <div className="w-1/3 border-r h-full flex flex-col">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Rechercher..." className="pl-9 pr-4 py-2 text-sm" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 ${
                      selectedContact?.id === contact.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => selectContact(contact)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={contact.avatar || `/placeholder.svg?text=${contact.name.charAt(0)}`}
                          alt={contact.name}
                        />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{contact.name}</p>
                        <span className="text-xs text-gray-500">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Nouveau message
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col h-full">
              {selectedContact ? (
                <>
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={selectedContact.avatar || `/placeholder.svg?text=${selectedContact.name.charAt(0)}`}
                          alt={selectedContact.name}
                        />
                        <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedContact.name}</p>
                        <p className="text-xs text-gray-500">{selectedContact.online ? "En ligne" : "Hors ligne"}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === "user" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                      <Input
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e\
