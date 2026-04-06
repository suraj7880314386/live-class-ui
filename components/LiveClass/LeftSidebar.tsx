'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Hand, Check, X, Clock } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface RaiseHandRequest {
  id: string
  name: string
  avatar: string
  timestamp: string
  requestType: 'audio' | 'video' | 'problem'
}

const mockRaiseHandQueue: RaiseHandRequest[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'PS',
    timestamp: '2 mins ago',
    requestType: 'audio',
  },
  {
    id: '2',
    name: 'Alex Kumar',
    avatar: 'AK',
    timestamp: '30 secs ago',
    requestType: 'problem',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'EW',
    timestamp: '1 min ago',
    requestType: 'video',
  },
  {
    id: '4',
    name: 'Raj Patel',
    avatar: 'RP',
    timestamp: '45 secs ago',
    requestType: 'audio',
  },
]

export function LeftSidebar() {
  const [queue, setQueue] = useState<RaiseHandRequest[]>(mockRaiseHandQueue)

  const handleAccept = (id: string) => {
    setQueue(queue.filter((item) => item.id !== id))
  }

  const handleReject = (id: string) => {
    setQueue(queue.filter((item) => item.id !== id))
  }

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return '🎤'
      case 'video':
        return '📹'
      case 'problem':
        return '✋'
      default:
        return '🎤'
    }
  }

  const getRequestLabel = (type: string) => {
    switch (type) {
      case 'audio':
        return 'Audio'
      case 'video':
        return 'Video'
      case 'problem':
        return 'Solve Problem'
      default:
        return 'Request'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Hand size={18} className="text-amber-400" />
          <h2 className="font-bold text-white">Raise Hand Queue</h2>
        </div>
        <p className="text-xs text-slate-400">{queue.length} request{queue.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Queue List */}
      {queue.length > 0 ? (
        <ScrollArea className="flex-1">
          <div className="space-y-3 p-4">
            {queue.map((request, index) => (
              <div
                key={request.id}
                className="bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                {/* Request Header */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Avatar className="h-8 w-8 bg-blue-600 flex-shrink-0">
                      <AvatarFallback className="text-xs font-bold text-white">
                        {request.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{request.name}</p>
                      <p className="text-xs text-slate-400">
                        {index + 1}
                        {index === 0 ? ' • Up Next' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg flex-shrink-0">{getRequestIcon(request.requestType)}</span>
                </div>

                {/* Request Details */}
                <div className="mb-3 space-y-1">
                  <p className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded w-fit">
                    {getRequestLabel(request.requestType)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={12} />
                    <span>{request.timestamp}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAccept(request.id)}
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs h-8 gap-1"
                  >
                    <Check size={14} />
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-8 gap-1"
                  >
                    <X size={14} />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-4xl mb-3">✋</div>
            <p className="text-sm text-slate-400 font-medium">No pending requests</p>
            <p className="text-xs text-slate-500 mt-1">Students will appear here when they raise their hand</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-700 p-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 text-xs"
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}
