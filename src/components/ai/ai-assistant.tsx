"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, X, Send, Bot, User, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { aiAssistantChat } from "@/ai/flows/ai-assistant-chat-flow"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: "مرحباً بك! أنا مساعد سراج الذكي. كيف يمكنني مساعدتك اليوم بخصوص الدورات، الشهادات، أو طرق الدفع؟" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await aiAssistantChat({ query: userMessage })
      setMessages(prev => [...prev, { role: 'ai', text: response.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى." }])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen ? (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-background border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm">مساعد سراج الذكي</p>
                <p className="text-[10px] opacity-80">متواجد دائماً لمساعدتك</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-white">
              <Minimize2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tl-none' 
                      : 'bg-muted text-foreground rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-tr-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Footer Input */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input 
                placeholder="اسألني أي شيء..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-full bg-background"
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading} className="rounded-full shrink-0">
                <Send className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          size="lg" 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-primary text-white flex items-center justify-center p-0"
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
