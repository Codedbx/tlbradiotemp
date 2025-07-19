"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Heart } from "lucide-react"

export default function CompactPlayer({
  isPlaying,
  isMuted,
  isLiked,
  togglePlayPause,
  toggleMute,
  toggleLike,
}) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Station Info */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-700 to-violet-700/70 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 absolute bg-white rounded-full animate-pulse" />
          <img src="/images/logo.png" className="w-5 h-4 z-50" alt="logo" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">Christ Embassy Nigeria</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </div>
            <span>•</span>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8 text-muted-foreground">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button onClick={togglePlayPause} size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
        </Button>
      </div>
    </div>
  )
}
