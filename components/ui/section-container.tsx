import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
  as?: React.ElementType
  style?: React.CSSProperties
}

export function SectionContainer({
  id,
  className,
  children,
  fullWidth = false,
  as: Component = "section",
  style,
  ...props
}: SectionContainerProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      id={id}
      className={cn("py-10 md:py-16", fullWidth ? "w-full" : "container mx-auto px-4", className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6", `text-${align}`)}>
      <h2 className={cn("text-xl font-semibold tracking-tight md:text-2xl", titleClassName)}>{title}</h2>
      {subtitle && (
        <p className={cn("mt-2 text-sm text-muted-foreground max-w-2xl", align === "center" && "mx-auto", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
