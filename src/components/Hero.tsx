import { useRef } from "react"
import { Button } from "./ui/button"
import AnimatedBackground from "./AnimatedBackground"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
              Code Smarter.
            </span>
            <br />
            <span className="text-white inline-block hover:scale-105 transition-transform duration-500">
              Build Faster.
            </span>
          </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          Discover, save, and share beautiful code snippets. 
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg animate-pulse-glow"
          >
            Explore Snippets
          </Button>

        </div>
        
      </div>
    </section>
  )
} 