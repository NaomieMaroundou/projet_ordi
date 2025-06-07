"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  PlusCircle,
  Send,
  Paperclip,
  ImageIcon,
  ArrowLeft,
  Phone,
  Video,
  Info,
  Users,
  UserPlus,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Contact = {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  isGroup?: boolean
}

type Message = {
  id: string
  senderId: string
  text: string
  time: string
  isRead: boolean
  attachments?: {
    type: "image" | "file" | "audio"
    url: string
    name?: string
  }[]
}

export default function MessagesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simuler l'état de connexion
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
      name: "Groupe de soutien - Diabète",
      avatar: "/placeholder.svg?height=40&width=40&text=GD",
      lastMessage: "Pierre: Quelqu'un a-t-il essayé le nouveau traitement ?",
      time: "Lun",
      unread: 3,
      online: true,
      isGroup: true,
    },
    {
      id: "4",
      name: "Sophie Obame",
      avatar: "/placeholder.svg?height=40&width=40&text=SO",
      lastMessage: "Merci pour les informations sur la clinique !",
      time: "Mar",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Groupe - Mamans de Libreville",
      avatar: "/placeholder.svg?height=40&width=40&text=ML",
      lastMessage: "Marie: Quelqu'un connaît un bon pédiatre ?",
      time: "Mer",
      unread: 0,
      online: true,
      isGroup: true,
    },
  ])

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    "1": [
      {
        id: "m1",
        senderId: "1",
        text: "Bonjour, comment puis-je vous aider ?",
        time: "10:30",
        isRead: false,
      },
    ],
    "2": [
      {
        id: "m2",
        senderId: "2",
        text: "Bonjour, je vous confirme votre rendez-vous pour demain à 14h.",
        time: "Hier, 15:45",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "user",
        text: "Merci beaucoup, docteur. À demain !",
        time: "Hier, 16:00",
        isRead: true,
      },
    ],
    "3": [
      {
        id: "m4",
        senderId: "user3",
        text: "Bienvenue dans le groupe de soutien pour les personnes atteintes de diabète.",
        time: "Lun, 09:15",
        isRead: true,
      },
      {
        id: "m5",
        senderId: "user4",
        text: "Merci de m'avoir ajouté au groupe !",
        time: "Lun, 10:20",
        isRead: true,
      },
      {
        id: "m6",
        senderId: "user5",
        text: "Quelqu'un a-t-il essayé le nouveau traitement dont on parle dans les médias ?",
        time: "Lun, 14:30",
        isRead: false,
      },
    ],
  })

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSendMessage = () => {
    if (!isLoggedIn || !selectedContact || newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: true,
    }

    const contactMessages = messages[selectedContact.id] || []
    setMessages({
      ...messages,
      [selectedContact.id]: [...contactMessages, message],
    })
    setNewMessage("")

    // Simuler une réponse après un délai
    if (!selectedContact.isGroup) {
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedContact.id,
          text: "Merci pour votre message. Je vous répondrai dès que possible.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isRead: false,
        }

        setMessages((prev) => ({
          ...prev,
          [selectedContact.id]: [...(prev[selectedContact.id] || []), response],
        }))
      }, 2000)
    }
  }

  const selectContact = (contact: Contact) => {
    setSelectedContact(contact)

    // Marquer les messages comme lus
    setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
  }

  // Auto-scroll vers le bas quand les messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedContact, messages])

  // Simuler la connexion/déconnexion pour la démo
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/communaute" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Messagerie</h1>
          <Button
            variant="outline"
            size="sm"
            className={isLoggedIn ? "ml-auto bg-red-100 text-red-600" : "ml-auto bg-green-100 text-green-600"}
            onClick={toggleLogin}
          >
            {isLoggedIn ? "Simuler déconnexion" : "Simuler connexion"}
          </Button>
        </div>
      </div>

      <main className="flex-1 container py-6">
        {!isLoggedIn ? (
          <Alert className="bg-blue-50 border-blue-200 mb-4">
            <AlertDescription>
              Vous devez être connecté pour accéder à la messagerie.
              <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>{" "}
              ou
              <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                <Link href="/register">créer un compte</Link>
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Card className="h-[calc(100vh-200px)] flex flex-col">
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
                    <Input
                      placeholder="Rechercher..."
                      className="pl-9 pr-4 py-2 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredContacts.map((contact) => (
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
                        {contact.isGroup && (
                          <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Users className="w-2 h-2 text-white" />
                          </span>
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
                            src={
                              selectedContact?.avatar
                                ? selectedContact.avatar
                                : selectedContact?.name
                                  ? `/placeholder.svg?text=${selectedContact.name.charAt(0)}`
                                  : null
                            }
                            alt={selectedContact?.name || "Contact"}
                          />
                          <AvatarFallback>{selectedContact?.name?.charAt(0) || "?"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedContact.name}</p>
                          <p className="text-xs text-gray-500">
                            {selectedContact.online ? "En ligne" : "Hors ligne"}
                            {selectedContact.isGroup && " • Groupe"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <Phone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <Video className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <Info className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages[selectedContact.id]?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {message.senderId !== "user" && !selectedContact.isGroup && (
                            <Avatar className="w-8 h-8 mr-2">
                              <AvatarImage
                                src={
                                  selectedContact.avatar ||
                                  `/placeholder.svg?text=${selectedContact.name.charAt(0) || "/placeholder.svg"}`
                                }
                                alt={selectedContact.name}
                              />
                              <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedContact.isGroup && message.senderId !== "user" && (
                              <p className="text-xs font-medium mb-1">
                                {message.senderId === selectedContact.id ? selectedContact.name : "Membre du groupe"}
                              </p>
                            )}
                            <p>{message.text}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index}>
                                    {attachment.type === "image" ? (
                                      <img
                                        src={attachment.url || "/placeholder.svg"}
                                        alt="Attachment"
                                        className="rounded-md max-w-full"
                                      />
                                    ) : (
                                      <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2">
                                        <Paperclip className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{attachment.name}</span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
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
                      <div ref={messagesEndRef} />
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
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage()
                            }
                          }}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={newMessage.trim() === ""}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Vos messages</h3>
                      <p className="text-gray-500 max-w-md">
                        Sélectionnez une conversation pour commencer à discuter ou créez un nouveau message.
                      </p>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Nouveau message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function MessageCircle(props) {
  return <div {...props} />
}
