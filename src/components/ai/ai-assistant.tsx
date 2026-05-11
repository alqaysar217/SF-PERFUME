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
    { role: 'ai', text: "أهلاً بك في رحاب سراج! أنا مساعدك الذكي، كيف يمكنني إرشادك اليوم في رحلتك التعليمية؟" }
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
      setMessages(prev => [...prev, { role: 'ai', text: "عذراً، حدث خطأ بسيط. يرجى المحاولة مرة أخرى." }])
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
        <div className="w-[350px] sm:w-[400px] h-[550px] bg-background border rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500 luxury-border">
          {/* Header */}
          <div className="p-6 bg-primary text-background flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg luxury-border">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm">مساعد سراج الذكي</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-70">متواجد لإرشادك</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-white rounded-xl">
              <Minimize2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6 bg-muted/5">
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tl-none' 
                      : 'bg-white text-primary rounded-tr-none border border-accent/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tr-none flex gap-1.5 border border-accent/10">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Footer Input */}
          <div className="p-6 border-t bg-muted/10">
            <div className="flex gap-2">
              <Input 
                placeholder="اسأل سراج..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-xl bg-white border-accent/10 focus:border-secondary h-12"
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading} className="rounded-xl shrink-0 h-12 w-12 bg-secondary text-primary hover:bg-secondary/90 shadow-lg shadow-secondary/10">
                <Send className="w-5 h-5 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          size="lg" 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-[1.5rem] shadow-2xl hover:scale-110 transition-all bg-primary text-secondary flex items-center justify-center p-0 luxury-border group"
        >
          <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </Button>
      )}
    </div>
  )
}