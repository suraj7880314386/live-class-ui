'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trophy, AlertCircle, X, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  streak: number
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Sharma', avatar: 'PS', score: 850, streak: 5 },
  { rank: 2, name: 'Emma Wilson', avatar: 'EW', score: 780, streak: 3 },
  { rank: 3, name: 'Raj Patel', avatar: 'RP', score: 720, streak: 2 },
]

export function LeaderboardWidget() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showFocusAlert, setShowFocusAlert] = useState(false)

  const handleShowAlert = () => {
    setShowFocusAlert(true)
    setTimeout(() => setShowFocusAlert(false), 5000)
  }

  if (showFocusAlert) {
    return (
      <div className="fixed bottom-24 right-6 bg-amber-900/90 backdrop-blur border border-amber-700 rounded-lg shadow-lg p-4 max-w-xs z-50 animate-in fade-in slide-in-from-right">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-100 text-sm">Focus Alert</p>
            <p className="text-amber-200 text-xs mt-1">
              Alex Kumar hasn&apos;t answered the last 3 questions. Consider checking in!
            </p>
          </div>
          <button
            onClick={() => setShowFocusAlert(false)}
            className="text-amber-400 hover:text-amber-200 flex-shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    )
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-24 right-6 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg shadow-lg transition-colors z-50 group"
        title="Expand Leaderboard"
      >
        <Trophy size={20} className="text-yellow-400" />
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-slate-900 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Leaderboard
        </span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 bg-slate-900 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50 max-w-xs w-80 animate-in fade-in slide-in-from-right">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-900 to-yellow-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-yellow-300" />
          <h3 className="font-bold text-white text-sm">Live Leaderboard</h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-yellow-300 hover:text-yellow-200 transition-colors"
          title="Collapse"
        >
          <ChevronDown size={18} className="rotate-180" />
        </button>
      </div>

      {/* Leaderboard List */}
      <div className="divide-y divide-slate-700">
        {mockLeaderboard.map((entry) => (
          <div key={entry.rank} className="px-4 py-3 hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </span>
              </div>

              {/* Avatar */}
              <Avatar className="h-8 w-8 bg-blue-600 flex-shrink-0">
                <AvatarFallback className="text-xs font-bold text-white">
                  {entry.avatar}
                </AvatarFallback>
              </Avatar>

              {/* Name & Streak */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
                <p className="text-xs text-slate-400">
                  🔥 {entry.streak} day streak
                </p>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-yellow-400">{entry.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with Actions */}
      <div className="border-t border-slate-700 bg-slate-800 px-4 py-3 space-y-2">
        <Button
          onClick={handleShowAlert}
          variant="outline"
          size="sm"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-8"
        >
          <AlertCircle size={14} className="mr-2" />
          Show Focus Alert
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-slate-400 hover:bg-slate-700 text-xs h-8"
        >
          View Full Rankings →
        </Button>
      </div>
    </div>
  )
}
