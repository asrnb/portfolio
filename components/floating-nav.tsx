"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Code, Briefcase, GraduationCap, Send, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { name: "Home", href: "#", icon: <Home className="h-[18px] w-[18px]" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-[18px] w-[18px]" /> },
  { name: "Experience", href: "#experience", icon: <Briefcase className="h-[18px] w-[18px]" /> },
  { name: "Projects", href: "#projects", icon: <Code className="h-[18px] w-[18px] rotate-90" /> },
  { name: "Education", href: "#education", icon: <GraduationCap className="h-[18px] w-[18px]" /> },
  { name: "Contact", href: "#contact", icon: <Send className="h-[18px] w-[18px]" /> },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Show back to top button after scrolling down further
      if (window.scrollY > 800) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1)).filter(Boolean)

      const currentSection = sections.reduce((current, section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Consider a section active if it's in the top half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            return section
          }
        }
        return current
      }, "")

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false) // Close mobile menu on click
    } else {
      toast({
        title: "Section not found",
        description: `The section "${href}" could not be found on the page.`,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-accent"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Back to top"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
