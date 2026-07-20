
"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, Send, Minimize2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { aiAssistantChat } from "@/ai/flows/ai-assistant-chat-flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFirestore } from "@/firebase/provider"
import { collection, query, limit } from "firebase/firestore"
import { useCollection } from "@/firebase/firestore/use-collection"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const db = useFirestore()
  const productsQuery = query(collection(db || {} as any, "products"), limit(10))
  const { data: products } = useCollection<any>(db ? productsQuery : null)

  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: "أهلاً بك في SF PERFUME! أنا مساعدك الذكي، كيف يمكنني مساعدتك في اختيار عطرك المفضل اليوم؟" }
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
      // إرسال سياق المنتجات للذكاء الاصطناعي ليتمكن من الترشيح
      const response = await aiAssistantChat({ 
        query: userMessage,
        context: products?.map(p => `${p.name} من ماركة ${p.brand} بسعر ${p.price} ر.ي`).join('\n')
      })
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
    <div className="fixed bottom-24 left-6 z-[60]">
      {isOpen ? (
        <div className="w-[300px] sm:w-[350px] h-[450px] bg-white border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 luxury-shadow">
          <div className="p-4 bg-luxury-black text-primary flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-black text-[11px] uppercase tracking-widest">SF AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[8px] opacity-70">متصل الآن</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary hover:scale-110 transition-transform">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <ScrollArea className="flex-1 p-4 bg-gray-50/50">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-[11px] leading-relaxed font-bold shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-luxury-black text-primary' 
                      : 'bg-white text-luxury-black border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-xl flex gap-1 border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input 
                placeholder="اسأل عن عطرك المفضل..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-lg bg-gray-50 border-none h-10 text-[10px] font-bold text-right"
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading} className="rounded-lg shrink-0 h-10 w-10 bg-luxury-black text-primary">
                <Send className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-xl shadow-2xl bg-luxury-black text-primary flex items-center justify-center p-0 transition-all hover:scale-110 active:scale-90 border-2 border-primary/20"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}
    </div>
  )
}
