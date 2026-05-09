"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckCircle2, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(5, "Please add a short subject."),
  message: z.string().min(10, "Please share a little more detail."),
})

type FormValues = z.infer<typeof formSchema>

export default function WorkWithMeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setStatus("sending")
    setStatusMessage("")

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      setStatus("error")
      setStatusMessage(data?.error || "Something went wrong. Please email me directly instead.")
      return
    }

    setStatus("sent")
    setStatusMessage("Thank you. Your message was sent to April's inbox.")
    form.reset()
  }

  return (
    <Card className="mx-auto max-w-2xl border-border/70 bg-card/80 shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-7 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-normal">Work with me</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Tell me about your project, automation idea, dashboard, AI workflow, or collaboration.
            </p>
          </div>
        </div>

        {status === "sent" ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-500" />
            <p className="font-semibold">Message sent</p>
            <p className="mt-2 text-sm text-muted-foreground">{statusMessage}</p>
            <Button className="mt-5" variant="outline" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="AI dashboard, automation, website, or collaboration" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the goal, timeline, tools, or anything useful."
                        className="min-h-36 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status === "error" && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {statusMessage}
                </div>
              )}

              <Button type="submit" className="w-full gap-2" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
