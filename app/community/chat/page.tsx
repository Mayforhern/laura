"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle,
  Users, 
  Send, 
  Smile,
  Lock
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePrivy } from "@privy-io/react-auth";

interface Message {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: string;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  isPrivate: boolean;
}

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState<string>("");
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const { user, authenticated } = usePrivy();

  // Fetch chat rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/chat/rooms");
        const data = await response.json();
        setRooms(data);
        if (data.length > 0 && !activeRoom) {
          setActiveRoom(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
        toast({
          title: "Error",
          description: "Failed to load chat rooms",
          variant: "destructive",
        });
      }
    };

    fetchRooms();
  }, []);

  // Fetch messages when room changes
  useEffect(() => {
    if (!activeRoom) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat?roomId=${activeRoom}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        });
      }
    };

    fetchMessages();

    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [activeRoom]);

  const handleSendMessage = async () => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to send messages",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) return;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          roomId: activeRoom,
          content: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join chat rooms",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/chat/rooms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ roomId }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error === "Already a member of this room") {
          setActiveRoom(roomId);
          return;
        }
        throw new Error(data.error || "Failed to join room");
      }

      setActiveRoom(roomId);
      toast({
        title: "Success",
        description: "Joined chat room successfully",
      });
    } catch (error) {
      console.error("Error joining room:", error);
      toast({
        title: "Error",
        description: "Failed to join chat room",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Community Chat
        </h1>
        <p className="text-muted-foreground mt-2">Connect in real-time with others in the community</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Chat Rooms Sidebar */}
        <Card className="md:col-span-1 border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Chat Rooms
            </CardTitle>
            <CardDescription>Join a conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={activeRoom === room.id ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => handleJoinRoom(room.id)}
                >
                  <span className="text-xl">{room.icon}</span>
                  <div className="flex flex-col items-start">
                    <span>{room.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {room.memberCount} online
                    </span>
                  </div>
                  {room.isPrivate && (
                    <Lock className="w-4 h-4 ml-auto text-muted-foreground" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-3 border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">{rooms.find(r => r.id === activeRoom)?.icon}</span>
              {rooms.find(r => r.id === activeRoom)?.name}
            </CardTitle>
            <CardDescription>
              {rooms.find(r => r.id === activeRoom)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[600px]">
              {/* Messages Area */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 group">
                      <Avatar>
                        <AvatarFallback>
                          {msg.userId[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{msg.userId}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!authenticated || !message.trim()}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 