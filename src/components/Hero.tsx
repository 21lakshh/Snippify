import { useRef } from "react"
import AnimatedBackground from "./AnimatedBackground"
import ShinyText from "./ui/ShinyText"
import { AuroraText } from "@/components/magicui/aurora-text"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedBackground />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in space-y-4 ">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white/80 hover:scale-105 transition-all duration-300">
          Code <AuroraText>Smarter.</AuroraText>
        </h1>
        <div className="space-x-2 hover:scale-105 transition-all duration-300">
        <span className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white/80 ">
          Build    
        </span>
        <span className="text-4xl md:text-5xl lg:text-7xl font-semibold italic text-pink-500 drop-shadow-md barlow-semi-condensed-semibold-italic space-y-2">
           Faster.
        </span>
        </div>
        {/* Subtitle */}
        <ShinyText text="Discover, save, and share beautiful code snippets." disabled={false} speed={5} className='custom-class text-xl md:text-3xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto' />
        <div className="flex justify-center items-center p-4">
        <RainbowButton onClick={() => navigate("/dashboard")} variant="default" size="lg" className="text-md md:text-xl hover:scale-105 transition-all duration-300">Start Snipping Now <ArrowRight className="w-5 h-5" /></RainbowButton>
        </div>
      </div>
    </section>
  )
} 