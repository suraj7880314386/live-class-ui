'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CenterMainScreen } from './CenterMainScreen'
import { RightSidebar } from './RightSidebar'
import { LeftSidebar } from './LeftSidebar'
import { BottomPanel } from './BottomPanel'
import { CollapsibleCodeEditor } from './CollapsibleCodeEditor'
import { LeaderboardWidget } from './LeaderboardWidget'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function LiveClassLayout() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [codeEditorOpen, setCodeEditorOpen] = useState(false)
  const [chatTab, setChatTab] = useState<'chat' | 'ai'>('chat')

  const isDesktop = useMediaQuery('(min-width: 1400px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1399px)')
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <div className="h-screen w-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 gap-0 overflow-hidden relative">
        {/* Left Sidebar */}
        {(isDesktop || (leftSidebarOpen && !isDesktop)) && (
          <div className={`transition-all duration-300 ease-out border-r border-slate-800 bg-slate-900 flex flex-col ${
            isDesktop ? 'w-64' : 'absolute left-0 top-0 bottom-0 w-56 z-30 shadow-lg'
          }`}>
            <LeftSidebar />
          </div>
        )}

        {/* Mobile Left Sidebar Toggle */}
        {!isDesktop && leftSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-20"
            onClick={() => setLeftSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar Toggle Button */}
        {!isDesktop && (
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="absolute left-0 top-4 z-40 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-r-lg transition-colors"
          >
            {leftSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}

        {/* Center Main Screen */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          !isDesktop && leftSidebarOpen ? 'pointer-events-none' : ''
        }`}>
          <CenterMainScreen />
        </div>

        {/* Right Sidebar */}
        {(isDesktop || (rightSidebarOpen && !isDesktop)) && (
          <div className={`transition-all duration-300 ease-out border-l border-slate-800 bg-slate-900 flex flex-col ${
            isDesktop ? 'w-80' : 'absolute right-0 top-0 bottom-0 w-72 z-30 shadow-lg'
          }`}>
            <RightSidebar chatTab={chatTab} setChatTab={setChatTab} />
          </div>
        )}

        {/* Mobile Right Sidebar Toggle */}
        {!isDesktop && rightSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-20"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}

        {/* Right Sidebar Toggle Button */}
        {!isDesktop && (
          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className="absolute right-0 top-4 z-40 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-l-lg transition-colors"
          >
            {rightSidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* Leaderboard Widget */}
      <LeaderboardWidget />

      {/* Bottom Teacher Controls Panel */}
      <div className="border-t border-slate-800 bg-slate-900">
        <BottomPanel onOpenCodeEditor={() => setCodeEditorOpen(!codeEditorOpen)} codeEditorOpen={codeEditorOpen} />
      </div>

      {/* Collapsible Code Editor */}
      {codeEditorOpen && (
        <div className="border-t border-slate-800 bg-slate-900 h-80 overflow-hidden">
          <CollapsibleCodeEditor />
        </div>
      )}
    </div>
  )
}
