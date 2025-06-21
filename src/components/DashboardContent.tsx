import { Search, Plus, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import SnipCard from "./SnipCard"
import useCachedPrivateSnippets from "../hooks/useCachedPrivateSnippets"
import useSnippets from "../hooks/useSnippets"
import { DashboardTab, type Snippet, type DashboardContentProps } from "../types/dashboard"
import UIComponentsRender from "./UIComponentsRender"
import AIGenerate from "./AIGenerate"
import axios from "axios"
import { type SnippetFormData } from "./NewSnippetForm"
import UpdateSnippets from "./UpdateSnippets"
import DeleteSnippets from "./DeleteSnippets"
import { useState, useMemo } from "react"

interface DashboardContentExtendedProps extends DashboardContentProps {
  onToggleSidebar: () => void
}

export default function DashboardContent({ activeTab, onCreateSnippet, onToggleSidebar }: DashboardContentExtendedProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Use different hooks based on active tab
  const [allSnippets, allLoading] = useSnippets<Snippet>([])
  const [privateSnippets, privateLoading] = useCachedPrivateSnippets<Snippet>()

  // Determine which data to show based on active tab
  const getContentData = () => {
    switch (activeTab) {
      case DashboardTab.PRIVATE:
        return { data: privateSnippets, loading: privateLoading, title: "Private Snippets" }
      case DashboardTab.PUBLIC:
        return { data: allSnippets, loading: allLoading, title: "Public Snippets" }
      default:
        return { data: allSnippets, loading: allLoading, title: "All Snippets" }
    }

  }

  const { data, loading, title } = getContentData()

  // Filter snippets based on search query
  const filteredSnippets = useMemo(() => {
    if (!searchQuery.trim() || !Array.isArray(data)) {
      return data
    }

    const query = searchQuery.toLowerCase().trim()
    
    return data.filter((snippet: Snippet) => {
      // Search in title
      if (snippet.title?.toLowerCase().includes(query)) {
        return true
      }
      
      // Search in description
      if (snippet.description?.toLowerCase().includes(query)) {
        return true
      }
      
      // Search in code content
      if (snippet.code?.toLowerCase().includes(query)) {
        return true
      }
      
      // Search in author username
      if (snippet.author?.username?.toLowerCase().includes(query)) {
        return true
      }
      
      // Search in tags
      if (snippet.tags && Array.isArray(snippet.tags)) {
        return snippet.tags.some((tagItem: any) => 
          tagItem.tag?.name?.toLowerCase().includes(query)
        )
      }
      
      return false
    })
  }, [data, searchQuery])

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("")
  }

  if(activeTab === DashboardTab.COMPONENTS) {
    return <UIComponentsRender onToggleSidebar={onToggleSidebar} />
  }
  if(activeTab === DashboardTab.UPDATE) {
    return <UpdateSnippets onToggleSidebar={onToggleSidebar} />
  }
  if(activeTab === DashboardTab.DELETE) {
    return <DeleteSnippets onToggleSidebar={onToggleSidebar} />
  }
  if(activeTab === DashboardTab.AI) {
    return <AIGenerate onToggleSidebar={onToggleSidebar} onCreateSnippet={async (data: SnippetFormData) => {
        try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/snippet/create', data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          console.log("Response:", response)
          window.location.reload();
          // Optionally trigger a refresh of the current tab's data
        } catch (error: any) {
          console.error("Error creating snippet:", error)
          console.error("Error response:", error.response?.data)
          alert(`Error: ${error.response?.data?.msg || error.message}`)
        }
    }} />
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile hamburger menu */}
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white"
              onClick={onCreateSnippet}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Snippet</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 w-32 md:w-64 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Content Grid */}
      <div className="p-4 md:p-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4">
          {loading ? (
            <div className="w-full flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-2 text-gray-400">Loading {title.toLowerCase()}...</span>
            </div>
          ) : Array.isArray(filteredSnippets) && filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet: Snippet) => (
              <div key={snippet.id} className="break-inside-avoid mb-4">
                <SnipCard snippet={snippet} />
              </div>
            ))
          ) : (
            <div className="w-full text-gray-400 text-center py-8">
              <div className="space-y-3">
                <p></p>
                <p className="text-lg">No snippets found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
