"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant"
  content: string
}

const initialMessage: Message = {
  role: "assistant",
  content: "Hi! I'm April's portfolio assistant. Ask me about her background, skills, or projects.",
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [streamStarted, setStreamStarted] = useState(false)
  const [error, setError] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, open])

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  function openChat() {
    setOpen(true)
    setShowHint(false)
  }

  async function sendMessage() {
    const content = input.trim()
    if (!content || sending) return

    const nextMessages = [...messages, { role: "user", content } as Message]
    setMessages(nextMessages)
    setInput("")
    setSending(true)
    setStreamStarted(false)
    setError("")

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages }),
    })

    if (!response.ok || !response.body) {
      const data = await response.json().catch(() => null)
      setError(data?.error || "Something went wrong. Please try again later.")
      setSending(false)
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let started = false

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        if (!chunk) continue

        if (!started) {
          started = true
          setStreamStarted(true)
          setMessages((prev) => [...prev, { role: "assistant", content: chunk }])
        } else {
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
            return updated
          })
        }
      }
    } catch {
      // network drop mid-stream, fall through to the !started check below
    }

    if (!started) setError("Something went wrong. Please try again later.")
    setSending(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <Card className="flex h-[28rem] w-80 flex-col overflow-hidden bg-card shadow-xl sm:w-96">
          <div className="flex items-center justify-between border-b border-border p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">Ask about April</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-5",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {message.content}
                </div>
              ))}
              {sending && !streamStarted && (
                <div className="flex max-w-[85%] items-center gap-1 rounded-lg bg-muted px-3 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {error && (
            <p className="border-t border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          <CardContent className="flex items-center gap-2 border-t border-border p-3">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              disabled={sending}
            />
            <Button size="icon" onClick={sendMessage} disabled={sending || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {!open && showHint && (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg animate-chat-hint-float">
            <button onClick={openChat} className="text-sm font-medium">
              Chat about April 👋
            </button>
            <button
              aria-label="Dismiss"
              onClick={() => setShowHint(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={openChat}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
