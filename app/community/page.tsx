"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Heart, 
  Shield, 
  Search, 
  Plus, 
  Send, 
  ThumbsUp, 
  MessageCircle,
  Clock,
  User,
  Lock,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
  isPrivate: boolean;
}

interface Forum {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  isPrivate: boolean;
  topics: string[];
}

const forums: Forum[] = [
  {
    id: "anxiety",
    name: "Anxiety Support",
    description: "A safe space to discuss anxiety, share coping strategies, and find support",
    icon: "😌",
    memberCount: 1234,
    postCount: 567,
    isPrivate: true,
    topics: ["Coping Strategies", "Panic Attacks", "Social Anxiety", "General Anxiety"]
  },
  {
    id: "depression",
    name: "Depression Support",
    description: "Connect with others who understand what you're going through",
    icon: "🌱",
    memberCount: 2345,
    postCount: 890,
    isPrivate: true,
    topics: ["Daily Struggles", "Recovery Journey", "Self-Care", "Professional Help"]
  },
  {
    id: "mindfulness",
    name: "Mindfulness & Meditation",
    description: "Share meditation experiences and mindfulness techniques",
    icon: "🧘",
    memberCount: 3456,
    postCount: 1234,
    isPrivate: false,
    topics: ["Meditation Tips", "Mindfulness Practices", "Stress Relief", "Daily Practice"]
  },
  {
    id: "general",
    name: "General Mental Health",
    description: "Discuss various aspects of mental health and well-being",
    icon: "💭",
    memberCount: 4567,
    postCount: 2345,
    isPrivate: false,
    topics: ["Self-Care", "Lifestyle", "Resources", "Success Stories"]
  }
];

export default function CommunityPage() {
  const [activeForum, setActiveForum] = useState<string>("anxiety");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();
  const { user, authenticated } = usePrivy();
  const router = useRouter();

  const handleCreatePost = () => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a post",
        variant: "destructive",
      });
      return;
    }

    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically make an API call to save the post
    toast({
      title: "Success",
      description: "Your post has been created",
    });

    setNewPost({ title: "", content: "" });
    setShowNewPostForm(false);
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
          Community Support
        </h1>
        <p className="text-muted-foreground mt-2">Connect with others who understand what you're going through</p>
      </motion.div>

      {/* Chat Section Card */}
      <Card className="mb-8 border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Live Community Chat</h2>
              <p className="text-muted-foreground">Join real-time conversations with community members</p>
            </div>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => router.push('/community/chat')}
            >
              <MessageCircle className="w-5 h-5" />
              Join Chat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Forums Sidebar */}
        <Card className="md:col-span-1 border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Support Forums
            </CardTitle>
            <CardDescription>Choose a topic to discuss</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {forums.map((forum) => (
                <Button
                  key={forum.id}
                  variant={activeForum === forum.id ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveForum(forum.id)}
                >
                  <span className="text-xl">{forum.icon}</span>
                  <div className="flex flex-col items-start">
                    <span>{forum.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {forum.memberCount} members • {forum.postCount} posts
                    </span>
                  </div>
                  {forum.isPrivate && (
                    <Lock className="w-4 h-4 ml-auto text-muted-foreground" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* Search and New Post */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="min-h-[150px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePost} className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Forum Topics */}
          <Card className="border-none shadow-md bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {forums.find(f => f.id === activeForum)?.icon}
                {forums.find(f => f.id === activeForum)?.name}
              </CardTitle>
              <CardDescription>
                {forums.find(f => f.id === activeForum)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={forums.find(f => f.id === activeForum)?.topics[0] || ""}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                  {forums.find(f => f.id === activeForum)?.topics.map((topic) => (
                    <TabsTrigger key={topic} value={topic}>
                      {topic}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {forums.find(f => f.id === activeForum)?.topics.map((topic) => (
                  <TabsContent key={topic} value={topic}>
                    <div className="space-y-4">
                      {/* Example Posts - Replace with actual data */}
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">Example Post Title {i}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  This is an example post content. In a real implementation, this would be user-generated content.
                                </p>
                                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>24</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>8</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>2h ago</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 