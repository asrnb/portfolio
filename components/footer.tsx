import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-baseline gap-2 truncate">
          <span className="font-semibold">April Suarnaba</span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:inline">
            AI Engineer
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="https://github.com/asrnb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <a
              href="https://ph.linkedin.com/in/aprilsuarnaba"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
            <a href="mailto:aprilsuarnaba5@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <div className="hidden truncate font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground md:block">
          © {new Date().getFullYear()} April Suarnaba
        </div>
      </div>
    </footer>
  )
}
