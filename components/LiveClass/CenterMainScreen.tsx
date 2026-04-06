'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'

export function CenterMainScreen() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showWhiteboard, setShowWhiteboard] = useState(true)

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
      {/* Video Player Area */}
      <div className="flex-1 bg-black rounded-lg overflow-hidden shadow-lg relative group">
        {/* Mock Video Stream */}
        <video
          className="w-full h-full object-cover"
          src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4"
          autoPlay
          loop
          muted={isMuted}
        />

        {/* Live Indicator Badge */}
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>

        {/* Teacher Info Badge */}
        <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur text-white px-3 py-2 rounded-lg text-sm">
          <p className="font-semibold">Dr. Sarah Chen</p>
          <p className="text-xs text-slate-300">Instructor</p>
        </div>

        {/* Video Controls - Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-8 px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Maximize2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Whiteboard Toggle & Display */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowWhiteboard(!showWhiteboard)}
          variant={showWhiteboard ? 'default' : 'outline'}
          size="sm"
          className={showWhiteboard ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          {showWhiteboard ? '✓ Whiteboard Active' : 'Show Whiteboard'}
        </Button>
        <span className="text-xs text-slate-400">Excalidraw or PDF Document</span>
      </div>

      {/* Whiteboard/PDF Area */}
      {showWhiteboard && (
        <div className="h-64 bg-white rounded-lg border border-slate-200 shadow-md flex items-center justify-center overflow-hidden">
          {/* Placeholder for Excalidraw or PDF */}
          <div className="text-center text-slate-500 p-8">
            <div className="mb-3 text-3xl">📋</div>
            <p className="font-medium mb-1">Whiteboard Area</p>
            <p className="text-sm text-slate-400">
              Excalidraw or PDF document will be displayed here
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
