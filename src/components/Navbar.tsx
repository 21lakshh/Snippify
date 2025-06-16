import { Button } from "../components/ui/button"
import { Code, Github } from "lucide-react"

export default function Navbar() {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="relative z-50 px-6 py-4 border-b border-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center  animate-pulse-glow">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Snippify
          </span>
        </div>
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
          <Github className="w-5 h-5 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer" />
          <Button
            variant="outline"
            className=" bg-transparent border-gray-700 text-white transition-all duration-300"
          >
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 animate-pulse-glow">
            Get Started
          </Button>

        </div>
      </div>
    </nav>
  )
}
