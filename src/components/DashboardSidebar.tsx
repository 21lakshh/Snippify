import { useNavigate } from "react-router-dom"
import {  Home, Component, Lock, LockOpen, X, Bot, Edit, Trash } from "lucide-react"
import { DashboardTab } from "../types/dashboard"
import { useAuth } from "./AuthContext"
import { Button } from "./ui/button"

interface DashboardSidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  isOpen: boolean
  onClose: () => void
}

export default function DashboardSidebar({ activeTab, onTabChange, isOpen, onClose }: DashboardSidebarProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth();

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
          <div className="flex flex-col space-y-4  p-4 bg-gray-900/50 rounded-xl border border-gray-800 w-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user ? user.username.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-white truncate">
                  {user ? user.username : "User"}
                </h1>
                <p className="text-sm text-gray-400 truncate">
                  {user ? user.email : "user@example.com"}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full bg-transparent border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 font-medium"
              onClick={() => {
                logout();
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
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

            <button
              onClick={() => handleTabChange(DashboardTab.UPDATE)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.UPDATE)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Edit className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Update Snippets</span>
            </button>

            <button
              onClick={() => handleTabChange(DashboardTab.DELETE)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group w-full text-left ${
                isActive(DashboardTab.DELETE)
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Trash className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Delete Snippets</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  )
} 