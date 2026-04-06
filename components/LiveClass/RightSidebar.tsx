'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Bot, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  isAI?: boolean
}

interface RightSidebarProps {
  chatTab: 'chat' | 'ai'
  setChatTab: (tab: 'chat' | 'ai') => void
}

const mockChatMessages: Message[] = [
  { id: '1', author: 'Priya Sharma', content: 'Can you explain this concept again?', timestamp: '2:15 PM', isAI: false },
  { id: '2', author: 'Alex Kumar', content: 'Great explanation!', timestamp: '2:16 PM', isAI: false },
  { id: '3', author: 'Emma Wilson', content: 'What is the homework for next class?', timestamp: '2:17 PM', isAI: false },
  { id: '4', author: 'System', content: 'Dr. Sarah Chen started screen sharing', timestamp: '2:18 PM', isAI: false },
  { id: '5', author: 'Raj Patel', content: 'Thanks for the example!', timestamp: '2:19 PM', isAI: false },
]

const mockAIResponses: Message[] = [
  { id: 'ai1', author: 'AI Doubt Bot', content: 'The concept of polymorphism allows objects of different types to be treated through the same interface. It enables flexible and reusable code.', timestamp: '2:15 PM', isAI: true },
  { id: 'ai2', author: 'AI Doubt Bot', content: 'Method overloading occurs when multiple methods have the same name but different parameters. Method overriding happens when a subclass provides its own implementation of a parent class method.', timestamp: '2:20 PM', isAI: true },
  { id: 'ai3', author: 'AI Doubt Bot', content: 'Abstract classes cannot be instantiated directly. They serve as blueprints for other classes and can contain abstract methods that must be implemented by subclasses.', timestamp: '2:25 PM', isAI: true },
]

export function RightSidebar({ chatTab, setChatTab }: RightSidebarProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>(mockChatMessages)
  const [aiMessages, setAiMessages] = useState<Message[]>(mockAIResponses)
  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [chatMessages, aiMessages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    if (chatTab === 'chat') {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        author: 'You',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isAI: false,
      }
      setChatMessages([...chatMessages, newMessage])
    } else {
      // AI Bot simulation
      setIsLoading(true)
      const newUserMessage: Message = {
        id: `user-${Date.now()}`,
        author: 'You',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isAI: false,
      }

      setTimeout(() => {
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          author: 'AI Doubt Bot',
          content: `That's a great question! Based on what was discussed in class, I can help you understand this concept better. The key points are: 1) Understanding the fundamentals, 2) Applying them to practice problems, and 3) Reviewing related concepts.`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isAI: true,
        }
        setAiMessages([...aiMessages, newUserMessage, aiResponse])
        setIsLoading(false)
      }, 800)
    }

    setInputValue('')
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs value={chatTab} onValueChange={(v) => setChatTab(v as 'chat' | 'ai')} className="flex-1 flex flex-col">
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-2 rounded-none bg-slate-800 border-b border-slate-700">
          <TabsTrigger value="chat" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <MessageCircle size={16} className="mr-2" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Bot size={16} className="mr-2" />
            <span className="hidden sm:inline">AI Bot</span>
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col gap-0 mt-0">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-blue-300 text-xs">{msg.author}</span>
                    <span className="text-xs text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-200 text-xs mt-1 break-words">{msg.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-3 gap-2 flex">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-9 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3"
            >
              <Send size={16} />
            </Button>
          </div>
        </TabsContent>

        {/* AI Doubt Bot Tab */}
        <TabsContent value="ai" className="flex-1 flex flex-col gap-0 mt-0">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                      msg.isAI
                        ? 'bg-blue-900/50 text-blue-100 border border-blue-800'
                        : 'bg-slate-700 text-slate-100'
                    }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <span className="text-xs opacity-60 mt-1 block">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-blue-900/50 text-blue-100 border border-blue-800 rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-3 gap-2 flex">
            <Input
              placeholder="Ask your doubt..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-9 text-sm disabled:opacity-50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 disabled:opacity-50"
            >
              <Send size={16} />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
