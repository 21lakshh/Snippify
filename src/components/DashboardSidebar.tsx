import { useNavigate } from "react-router-dom"
import { Code, Home, Component, Lock, LockOpen, X, Bot } from "lucide-react"
import { DashboardTab } from "../types/dashboard"

interface DashboardSidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  isOpen: boolean
  onClose: () => void
}

export default function DashboardSidebar({ activeTab, onTabChange, isOpen, onClose }: DashboardSidebarProps) {
  const navigate = useNavigate()

  const isActive = (tab: DashboardTab) => activeTab === tab

  const handleTabChange = (tab: DashboardTab) => {
    onTabChange(tab)
    // Close sidebar on mobile after tab selection
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-900/95 md:bg-gray-900/50 backdrop-blur-sm border-r border-gray-800
        transform transition-transform duration-300 ease-in-out md:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Snippify
              </span>
            </div>
            
            {/* Close button - only visible on mobile */}
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group w-full text-left"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => handleTabChange(DashboardTab.COMPONENTS)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.COMPONENTS)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Component className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Components</span>
            </button>

            <button
              onClick={() => handleTabChange(DashboardTab.PRIVATE)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.PRIVATE)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Private</span>
            </button>

            <button
              onClick={() => handleTabChange(DashboardTab.PUBLIC)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.PUBLIC)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <LockOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Public</span>
            </button>

            <button
              onClick={() => handleTabChange(DashboardTab.AI)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.AI)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Bot className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>AI Snippets</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  )
} 