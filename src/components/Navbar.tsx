import { Button } from "../components/ui/button"
import { Github, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AuroraText } from "@/components/magicui/aurora-text"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }
  
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  return (
    <>
      <nav className="relative z-50 px-6 py-4 border-b border-gray-800/50 backdrop-blur-sm animate-fade-in">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-2 text-2xl lg:text-3xl font-bold pixelify-sans-regular hover:scale-105 transition-all duration-300 cursor-pointer">
              <AuroraText>Snippify</AuroraText>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-end items-center space-x-8">
            <button
              onClick={() => handleNavClick("snippets")}
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Snippets
            </button>
            <button
              onClick={() => handleNavClick("components")}
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Components
            </button>
            <button
              onClick={() => handleNavClick("community")}
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Community
            </button>
            <Github className="w-5 h-5 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer" onClick={() => window.location.href = "https://github.com/21lakshh/Snippify"}/>
            <Button
              variant="outline"
              className="bg-transparent border-gray-700 text-white transition-all duration-300"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/signup")}
              className="bg-transparent border-gray-700 text-white transition-all duration-300"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-sm border-l border-gray-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <span className="text-xl font-bold text-white pixelify-sans-regular">
                  <AuroraText>Snippify</AuroraText>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-6 space-y-6">
                <button
                  onClick={() => handleNavClick("snippets")}
                  className="block w-full text-left text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-gray-800/50"
                >
                  Snippets
                </button>
                <button
                  onClick={() => handleNavClick("components")}
                  className="block w-full text-left text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-gray-800/50"
                >
                  Components
                </button>
                <button
                  onClick={() => handleNavClick("community")}
                  className="block w-full text-left text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-gray-800/50"
                >
                  Community
                </button>
                
                {/* GitHub Link */}
                <div className="flex items-center space-x-2 py-2 px-4 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer rounded-lg hover:bg-gray-800/50">
                  <Github className="w-5 h-5" />
                  <span onClick={() => window.location.href = "https://github.com/21lakshh/Snippify"}>GitHub</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 border-t border-gray-800 space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800 transition-all duration-300"
                  onClick={() => handleNavigate("/signin")}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => handleNavigate("/signup")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </>
    </>
  )
}
