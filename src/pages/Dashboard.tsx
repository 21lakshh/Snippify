import { useState } from "react"
import Footer from "../components/Footer"
import NewSnippetForm, { type SnippetFormData } from "../components/NewSnippetForm"
import DashboardSidebar from "../components/DashboardSidebar"
import DashboardContent from "../components/DashboardContent"
import { DashboardTab } from "../types/dashboard"
import axios from "axios"

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.COMPONENTS)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      setIsFormOpen(false)
      // Optionally trigger a refresh of the current tab's data
    } catch (error: any) {
      console.error("Error creating snippet:", error)
      console.error("Error response:", error.response?.data)
      alert(`Error: ${error.response?.data?.msg || error.message}`)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <DashboardSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Content */}
        <DashboardContent 
          activeTab={activeTab} 
          onCreateSnippet={() => setIsFormOpen(true)}
          onToggleSidebar={toggleSidebar}
        />
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
