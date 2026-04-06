'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Settings,
  Maximize2,
  Code,
  Users,
  Radio,
} from 'lucide-react'

interface BottomPanelProps {
  onOpenCodeEditor: () => void
  codeEditorOpen: boolean
}

export function BottomPanel({ onOpenCodeEditor, codeEditorOpen }: BottomPanelProps) {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="flex items-center justify-between px-6 py-4 gap-4 flex-wrap">
      {/* Left: Media Controls */}
      <div className="flex items-center gap-2">
        {/* Mic Button */}
        <Button
          onClick={() => setIsMicOn(!isMicOn)}
          variant={isMicOn ? 'default' : 'destructive'}
          size="sm"
          className={`${
            isMicOn
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-red-900/50 hover:bg-red-900 text-red-200'
          } gap-2`}
          title={isMicOn ? 'Mic On' : 'Mic Off'}
        >
          {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          <span className="hidden sm:inline text-sm">Mic</span>
        </Button>

        {/* Camera Button */}
        <Button
          onClick={() => setIsCameraOn(!isCameraOn)}
          variant={isCameraOn ? 'default' : 'destructive'}
          size="sm"
          className={`${
            isCameraOn
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-red-900/50 hover:bg-red-900 text-red-200'
          } gap-2`}
          title={isCameraOn ? 'Camera On' : 'Camera Off'}
        >
          {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          <span className="hidden sm:inline text-sm">Camera</span>
        </Button>

        {/* Screen Share Button */}
        <Button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          variant={isScreenSharing ? 'default' : 'outline'}
          size="sm"
          className={`${
            isScreenSharing
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'border-slate-600 text-slate-300 hover:bg-slate-800'
          } gap-2`}
          title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
        >
          {isScreenSharing ? <MonitorOff size={18} /> : <Monitor size={18} />}
          <span className="hidden sm:inline text-sm">Share</span>
        </Button>

        {/* Recording Indicator */}
        {isRecording && (
          <Button
            onClick={() => setIsRecording(false)}
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white gap-2 animate-pulse"
          >
            <Radio size={18} />
            <span className="hidden sm:inline text-sm">Recording</span>
          </Button>
        )}
      </div>

      {/* Center: Teacher Actions */}
      <div className="flex items-center gap-2">
        {/* Mute All Button */}
        <Button
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800 gap-2"
          title="Mute All Students"
        >
          <Users size={18} />
          <span className="hidden sm:inline text-sm">Mute All</span>
        </Button>

        {/* Start Quiz Button */}
        <Button
          variant="default"
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          title="Start Quiz"
        >
          <span className="text-sm">📝 Quiz</span>
        </Button>

        {/* Code Editor Toggle */}
        <Button
          onClick={onOpenCodeEditor}
          variant={codeEditorOpen ? 'default' : 'outline'}
          size="sm"
          className={`${
            codeEditorOpen
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'border-slate-600 text-slate-300 hover:bg-slate-800'
          } gap-2`}
          title={codeEditorOpen ? 'Hide Code Editor' : 'Show Code Editor'}
        >
          <Code size={18} />
          <span className="hidden sm:inline text-sm">Code</span>
        </Button>
      </div>

      {/* Right: More Options */}
      <div className="flex items-center gap-2">
        {/* Settings Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:bg-slate-800 gap-2"
          title="Settings"
        >
          <Settings size={18} />
          <span className="hidden sm:inline text-sm">Settings</span>
        </Button>

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:bg-slate-800"
          title="Fullscreen"
        >
          <Maximize2 size={18} />
        </Button>

        {/* End Class Button */}
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white gap-2"
          title="End Class"
        >
          <span className="text-sm">End Class</span>
        </Button>
      </div>
    </div>
  )
}
