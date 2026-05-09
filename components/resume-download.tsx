"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = () => {
    setIsDownloading(true)

    const link = document.createElement("a")
    link.href = "/april-suarnaba-resume.pdf"
    link.download = "April_Suarnaba_Resume.pdf"
    link.click()

    setTimeout(() => {
      setIsDownloading(false)
      toast({
        title: "Resume download started",
        description: "April Suarnaba's resume PDF is downloading.",
        action: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        ),
      })
    }, 800)
  }

  return (
    <Button onClick={handleDownload} className="relative gap-2 overflow-hidden" disabled={isDownloading}>
      {isDownloading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Resume
        </>
      )}

      {isDownloading && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
        />
      )}
    </Button>
  )
}
