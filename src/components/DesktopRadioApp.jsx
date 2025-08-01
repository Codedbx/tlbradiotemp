"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Play,
  Phone,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  ExternalLink,
  Clock,
  Send,
  MapPin,
  Loader2,
  Copy,
  CheckIcon,
  CopyIcon,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { ThemeToggle } from "@/components/ThemeToggle" // Import ThemeToggle
import { ThemeProvider } from "./theme-provider"

export default function DesktopRadioApp({
  isPlaying = false,
  isMuted = false,
  isLiked = false,
  togglePlayPause = () => {},
  toggleMute = () => {},
  toggleLike = () => {},
  likes = 142,
  volume = 80,
  setVolume = () => {},
  isLoadingAudio = false,
  audioError = null,
}) {
  const audioRef = useRef(null)
  // Comment states
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [commentPostError, setCommentPostError] = useState(null)
  const [isFetchingComments, setIsFetchingComments] = useState(true)
  const [commentFetchError, setCommentFetchError] = useState(null)

  const [copied, setCopied] = useState(false)

    // Determine if today is Sunday or Wednesday in WAT
  const watDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
    const day = watDate.getDay(); // Sunday = 0, Wednesday = 3
    const hour = watDate.getHours();

    const isMidWeekService = day === 3 && hour >= 18 && hour < 19; // 6–7PM WAT
    const isSundayService = day === 0 && hour >= 7 && hour < 8; // 7–8AM WAT


    const handleCopy = () => {
        navigator.clipboard.writeText("1002231384")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // reset after 2s
    }
  // Simulate fetching comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      setIsFetchingComments(true)
      setCommentFetchError(null)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setComments([
          {
            id: 1,
            name: "Sarah Johnson",
            text: "Beautiful service today! God bless 🙏",
            time: "2 minutes ago",
            avatar: "SJ",
          },
          {
            id: 2,
            name: "Michael David",
            text: "Powerful message from Pastor. Thank you for this ministry!",
            time: "5 minutes ago",
            avatar: "MD",
          },
          {
            id: 3,
            name: "Grace Emmanuel",
            text: "Listening from Lagos. God bless everyone here ❤️",
            time: "8 minutes ago",
            avatar: "GE",
          },
        ])
      } catch (error) {
        setCommentFetchError("Failed to load comments. Please try again.")
        console.error("Error fetching comments:", error)
      } finally {
        setIsFetchingComments(false)
      }
    }
    fetchComments()
  }, [])
  // Effect to control audio playback based on isPlaying state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      if (audio.paused) {
        audio.play().catch((e) => {
          if (e.name === "AbortError") {
            console.warn("Audio play was aborted, likely due to rapid state change or user gesture requirement.")
          } else {
            console.error("Error attempting to play audio:", e)
          }
        })
      }
    } else {
      if (!audio.paused) {
        audio.pause()
      }
    }
  }, [isPlaying, audioError])
  // Effect to control audio mute based on isMuted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])
  // Effect to control audio volume based on volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100 // Convert 0-100 to 0-1
    }
  }, [volume])
  const handleSubmitComment = async () => {
    if (commentText.trim()) {
      setIsPostingComment(true)
      setCommentPostError(null)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const newComment = {
          id: comments.length + 1,
          name: "You",
          text: commentText,
          time: "Just now",
          avatar: "YO",
        }
        setComments((prev) => [newComment, ...prev])
        setCommentText("")
      } catch (error) {
        setCommentPostError("Failed to post comment. Please try again.")
        console.error("Error posting comment:", error)
      } finally {
        setIsPostingComment(false)
      }
    }
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900/10">
        {/* Audio Element */}
        <audio ref={audioRef} preload="auto">
            <source src="https://radio.ifastekpanel.com:1765/stream" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <img src="/images/loveworld-logo.png" className=" rounded-full" alt="loveworld logo" />
                </div>
                <div>
                <h1 className="text-xl font-bold">Christ Embassy Kaduna</h1>
                {/* <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">Broadcasting live</p> */}
                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">Online Radio Church</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {/* <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                Live
                </Badge> */}
                {/* Replaced "Follow" button with ThemeToggle */}
                <ThemeToggle />
            </div>
            </div>
        </header>
        <div className="container max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Radio Player (Sticky) */}
            <div className="lg:w-96 lg:sticky lg:top-24 lg:self-start">
                <Card className="bg-white gap-0 backdrop-blur-sm border-0 shadow-xl dark:bg-slate-800/70">
                <CardHeader className="text-center pb-6">
                    <div className="relative mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative w-60 h-60 flex justify-center items-center bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-full p-6 shadow-2xl border-4 border-white/50 dark:border-slate-700/50">
                        <img src="/images/logo.png" alt="logo" />
                    </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                    Online Radio Church
                    </CardTitle>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xs mx-auto">
                    Christ Embassy Nigeria North West Zone 1
                    </p>
                    {/* <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-500">On Air</span>
                    </div> */}
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Play Controls */}
                    <div className="flex items-center justify-center gap-6">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleLike}
                        className={`h-12 w-12 rounded-full transition-all duration-300 ${
                        isLiked
                            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                            : "hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                        onClick={togglePlayPause}
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-violet-500/25"
                    >
                        {isLoadingAudio && isPlaying ? (
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                        ) : isPlaying ? (
                        <Pause className="h-8 w-8" />
                        ) : (
                        <Play className="h-8 w-8 ml-1" />
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleMute}
                        className="h-12 w-12 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 bg-transparent"
                    >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    </div>
                    {audioError && (
                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-sm">{audioError}</p>
                    </div>
                    )}
                    {/* Volume Control */}
                    <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>Volume</span>
                        <span>{volume}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <VolumeX className="h-4 w-4 text-slate-400" />
                        <Slider value={[volume]} max={100} step={1} onValueChange={setVolume} className="flex-1" />
                        <Volume2 className="h-4 w-4 text-slate-400" />
                    </div>
                    </div>
                    {/* Call to Action */}
                    <div className="space-y-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                    <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800 dark:text-green-400"
                        asChild
                    >
                        <a href="tel:+2347039918548" className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call In: +234 7039 918 548
                        </a>
                    </Button>
                    </div>
                </CardContent>
                </Card>
            </div>
            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
                <Tabs defaultValue="give" className="h-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 bg-transparent p-0 rounded-none h-14 border-b border-slate-200 dark:border-slate-700">
                    <TabsTrigger
                    value="give"
                    className="relative px-4 py-3 text-center text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors duration-200 data-[state=active]:text-violet-600 data-[state=active]:font-semibold dark:data-[state=active]:border-none dark:data-[state=active]:shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-gray-600 rounded-none -mb-px"
                    >
                    <Heart className="w-4 h-4 mr-2" />
                    Give
                    </TabsTrigger>
                    <TabsTrigger
                    value="services"
                    className="relative px-4 py-3 text-center text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors duration-200 data-[state=active]:text-violet-600 data-[state=active]:font-semibold dark:data-[state=active]:border-none dark:data-[state=active]:shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-gray-600 rounded-none -mb-px"
                    >
                    <Clock className="w-4 h-4 mr-2" />
                    Services
                    </TabsTrigger>
                    <TabsTrigger
                    value="comments"
                    className="relative px-4 py-3 text-center text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors duration-200 data-[state=active]:text-violet-600 data-[state=active]:font-semibold dark:data-[state=active]:border-none dark:data-[state=active]:shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-gray-600 rounded-none -mb-px"
                    >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments
                    </TabsTrigger>
                    <TabsTrigger
                    value="links"
                    className="relative px-4 py-3 text-center text-slate-600 dark:text-slate-400 hover:text-violet-600 transition-colors duration-200 data-[state=active]:text-violet-600 data-[state=active]:font-semibold dark:data-[state=active]:border-none dark:data-[state=active]:shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-gray-600 rounded-none -mb-px"
                    >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Quick Links
                    </TabsTrigger>
                </TabsList>
                {/* Comments Tab */}
                <TabsContent value="comments" className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Live Comments</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Join the conversation</p>
                    </div>
                    </div>
                    {/* Comment Form */}
                    <Card className="bg-white backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                        <Textarea
                            placeholder="Share your thoughts, prayer requests, or testimonies..."
                            value={commentText}
                            disabled
                            onChange={(e) => setCommentText(e.target.value)}
                            className="min-h-[100px] resize-none border-0 bg-slate-50/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-violet-500 rounded-xl"
                        />
                        <Button
                            onClick={handleSubmitComment}
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg"
                            // disabled={!commentText.trim() || isPostingComment}
                            disabled
                        >
                            {isPostingComment ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                            <Send className="w-4 h-4 mr-2" />
                            )}
                            {isPostingComment ? "Posting..." : "Coming Soon"}
                        </Button>
                        {commentPostError && <p className="text-red-500 text-sm">{commentPostError}</p>}
                        </div>
                    </CardContent>
                    </Card>
                    {/* Comments List */}
                    {/* {isFetchingComments ? (
                    <div className="flex items-center justify-center h-40 text-slate-500">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                        Loading comments...
                    </div>
                    ) : commentFetchError ? (
                    <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <p className="text-red-600 dark:text-red-400">{commentFetchError}</p>
                    </div>
                    ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex gap-4 p-6 bg-white backdrop-blur-sm rounded-xl shadow-lg border-0 dark:bg-slate-800/70 animate-in fade-in duration-300"
                        >
                            <Avatar className="h-12 w-12 ring-2 ring-violet-100 dark:ring-violet-900">
                            <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-400 dark:from-gray-900 dark:to-gray-900 text-white font-semibold">
                                {comment.avatar}
                            </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">{comment.name}</span>
                                <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                                {comment.time}
                                </span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{comment.text}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    )} */}

                    <div className="flex items-center justify-center h-40 text-slate-500 mutee">
                        Coming Soon: Live Chat Feature
                    </div>
                </TabsContent>
                {/* Services Tab */}
                <TabsContent value="services" className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Service Schedule</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Join us for worship</p>
                    </div>
                    </div>
                    <div className="space-y-4">
                    <Card className="bg-white backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70">
                        <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Online Radio Church</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-3">
                                Every Sunday 7:00 AM - 8:00 AM (WAT)
                            </p>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="h-4 w-4" />
                                <span>Live Broadcast</span>
                            </div>
                            </div>
                            <Badge
                                className={
                                    isSundayService
                                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                                        : "bg-slate-100 text-slate-600 border-slate-300"
                                }
                            >
                                {isSundayService ? "Active Now" : "Upcoming"}
                            </Badge>
                        </div>
                        </CardContent>
                    </Card>
                    {/* <Card className="bg-white backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/70">
                        <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Mid-Week Service</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-3">
                                Every Wednesday 6:00 PM - 7:00 PM (WAT)
                            </p>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="h-4 w-4" />
                                <span>Live Broadcast</span>
                            </div>
                            </div>
                            
                            <Badge
                                className={
                                    isMidWeekService
                                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                                        : "bg-slate-100 text-slate-600 border-slate-300"
                                }
                            >
                                {isMidWeekService ? "Active Now" : "Upcoming"}
                            </Badge>
                            

                            
                            
                        </div>
                        </CardContent>
                    </Card> */}
                    </div>
                </TabsContent>
                {/* Give Tab */}
                <TabsContent value="give" className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Give</h2>
                        {/* <p className="text-slate-600 dark:text-slate-400 text-sm">To give your offering:</p> */}
                    </div>
                    </div>
                    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200/50 dark:border-violet-800/50 shadow-lg">
                    <CardContent className="p-8 text-center">
                        <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">To give your offering:</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Kindly use the details below.
                        </p>
                        </div>
                        <div className="flex flex-col items-center bg-white dark:bg-slate-800/70 rounded-xl p-6 backdrop-blur-sm">
                            <div className="text-center space-y-2 text-md md:text-xl">
                                <div>
                                <span className="text-primary font-medium">Account Name:</span><br />
                                Christ Embassy Conventions and Conferences Nigeria North West Zone 1A
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                <div>
                                    <span className="text-primary font-medium">Account Number:</span><br />
                                    <span className="font-bold">1002231384</span>
                                </div>

                                <Button variant="ghost" size="icon" onClick={handleCopy}>
                                    {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                                </Button>

                                {copied && (
                                    <span className="text-xs text-muted-foreground">Copied</span>
                                )}
                                </div>

                                <div>
                                <span className="text-primary font-medium">Bank:</span><br />
                                Spectrum Bank
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>
                {/* Quick Links Tab */}
                <TabsContent value="links" className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        {/* <p className="text-slate-600 dark:text-slate-400 text-sm">Access our resources</p> */}
                    </div>
                    </div>
                    <div className="grid gap-3">
                    {/* {[
                        "Join the Impact Bayelsa Online Prayer Rally",
                        "Join the Pastor Chris Live Prayer Network",
                        "Rhapsody of Realities (Read and Earn)",
                        "Reachout World with Rhapsody Of Realities",
                        "Healing School",
                        "Healing Streams TV",
                        "Listen to exciting Messages by Pastor Chris",
                        "Unending Praise 24/7",
                    ].map((link, index) => (
                        <Card
                        key={index}
                        className="bg-gray-100 backdrop-blur-sm border-0 dark:bg-slate-800/70 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                        >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
                                {link}
                            </span>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                            </div>
                        </CardContent>
                        </Card>
                    ))} */}
                    No links available yet.
                    </div>
                </TabsContent>
                </Tabs>
            </div>
            </div>
        </div>
        </div>
    </ThemeProvider>
  )
}
