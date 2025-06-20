import { useRef } from "react"
import { Button } from "./ui/button"
import AnimatedBackground from "./AnimatedBackground"
import ShinyText from "./ui/ShinyText"
import { AuroraText } from "@/components/magicui/aurora-text"
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedBackground />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in space-y-4 ">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-5xl lg:text-7xl font-semibold text-white/80 hover:scale-105 transition-all duration-300">
          Code <AuroraText>Smarter.</AuroraText>
        </h1>
        <div className="space-x-2 hover:scale-105 transition-all duration-300">
        <span className="text-5xl md:text-5xl lg:text-7xl font-semibold text-white/80 ">
          Build    
        </span>
        <span className="text-5xl md:text-5xl lg:text-7xl font-semibold italic text-pink-500 drop-shadow-md barlow-semi-condensed-semibold-italic">
           Faster.
        </span>
        </div>
        {/* Subtitle */}
        <ShinyText text="Discover, save, and share beautiful code snippets." disabled={false} speed={5} className='custom-class text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto' />

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