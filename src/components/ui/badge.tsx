import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-blue-800 group-hover:text-blue-300 transition-all duration-300",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // New color variants for tags
        blue: "bg-blue-600/40 text-blue-500 border border-blue-500/30 group-hover:text-blue-300 transition-all duration-300",
        green: "bg-green-600/40 text-green-500 border border-green-500/30 group-hover:text-green-300 transition-all duration-300", 
        purple: "bg-purple-600/40 text-purple-500 border border-purple-500/30 group-hover:text-purple-300 transition-all duration-300",
        pink: "bg-pink-600/40 text-pink-500 border border-pink-500/30 group-hover:text-pink-300 transition-all duration-300",
        yellow: "bg-yellow-600/40 text-yellow-500 border border-yellow-500/30 group-hover:text-yellow-300 transition-all duration-300",
        red: "bg-red-600/40 text-red-300 border border-red-500/30 group-hover:text-red-300 transition-all duration-300",
        indigo: "bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 group-hover:text-indigo-300 transition-all duration-300",
        orange: "bg-orange-600/40 text-orange-300 border border-orange-500/30 group-hover:text-orange-300 transition-all duration-300",
        teal: "bg-teal-600/40 text-teal-300 border border-teal-500/30 group-hover:text-teal-300 transition-all duration-300",
        cyan: "bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 group-hover:text-cyan-300 transition-all duration-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
