import { useState } from "react"
import { Link } from "react-router-dom"
import { Code, Home, Component, Search, Filter, Lock, Plus, LockOpen } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Footer from "../components/Footer"
import NewSnippetForm, { type SnippetFormData } from "../components/NewSnippetForm"
import axios from "axios"
import SnipCard from "../components/SnipCard"
import useSnippets from "../hooks/useSnippets"

interface Tag {
  name: string
}

interface Snippet {
  id: string
  title: string
  description: string
  code: string
  tags: Tag[]
}

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [snippets, loading] = useSnippets<Snippet>([])

  const handleCreateSnippet = async (data: SnippetFormData) => {
    try {
      console.log("New snippet data:", data)
      
      const requestBody = {
        title: data.title,
        description: data.description,
        code: data.code,
        tags: data.tags,
        isPrivate: data.isPrivate
      }
      
      console.log("Request body:", requestBody)
      
      const response = await axios.post('https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/snippet/create', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      console.log("Response:", response)
      alert("Snippet created successfully!")
    } catch (error: any) {
      console.error("Error creating snippet:", error)
      console.error("Error response:", error.response?.data)
      alert(`Error: ${error.response?.data?.msg || error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800">
          <div className="p-6">
            {/* Brand */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Snippify
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <Component className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Components</span>
                </Link>

                <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <Lock className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Private</span>
                </Link>

                <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <LockOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Public</span>
                </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white"
                onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Snippet
                </Button>
              </div>
              
              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search snippets..."
                    className="pl-10 w-64 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Snippets Grid */}
          <div className="flex-1 p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div>Loading...</div>
                ) : Array.isArray(snippets) && snippets.length > 0 ? (
                  snippets.map((snippet: Snippet) => (
                    <SnipCard key={snippet.id} snippet={snippet} />
                  ))
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    No snippets found. Create your first snippet!
                  </div>
                )}
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* New Snippet Form Modal */}
      <NewSnippetForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateSnippet}
      />
    </div>
  )
}