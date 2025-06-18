import { useState } from "react"
import { X, Code, Lock, LockOpen } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
interface NewSnippetFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SnippetFormData) => void
}

export interface SnippetFormData {
  title: string
  description: string
  code: string
  tags: {name: string}[]
  isPrivate: boolean
}

export default function NewSnippetForm({ isOpen, onClose, onSubmit }: NewSnippetFormProps) {
  const [formData, setFormData] = useState<SnippetFormData>({
    title: "",
    description: "",
    code: "",
    tags: [],
    isPrivate: false
  })
  
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    
    setFormData({
      title: "",
      description: "",
      code: "",
      tags: [],
      isPrivate: false
    })
    setTagInput("")
    onClose()
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.some(tag => tag.name === tagInput.trim())) {
        tagInput.split(" ").forEach(tag => {
          if(tag.trim() && !formData.tags.some(t => t.name === tag.trim())){
            setFormData(prev => ({
              ...prev,
              tags: [...prev.tags, {name: tag.trim()}]
            }))
          }
        })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.name !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      addTag()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/ backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Form Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-black/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Create New Snippet</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter snippet title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Describe your snippet..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full min-h-[100px] px-3 py-2 bg-black/50 border border-gray-600 rounded-md text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 focus:outline-none resize-vertical"
              required
            />
          </div>

          {/* Privacy Toggle */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Privacy</Label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant={!formData.isPrivate ? "default" : "outline"}
                onClick={() => setFormData(prev => ({ ...prev, isPrivate: false }))}
                className={`flex items-center space-x-2 ${
                  !formData.isPrivate
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <LockOpen className="w-4 h-4" />
                <span>Public</span>
              </Button>
              <Button
                type="button"
                variant={formData.isPrivate ? "default" : "outline"}
                onClick={() => setFormData(prev => ({ ...prev, isPrivate: true }))}
                className={`flex items-center space-x-2 ${
                  formData.isPrivate
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Tags</Label>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-black/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag: {name: string}, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => removeTag(tag.name)}
                      className="ml-2 text-purple-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Code Body */}
          <div className="space-y-2">
            <Label htmlFor="code" className="text-white font-medium">
              Code
            </Label>
            <textarea
              id="code"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              className="w-full min-h-[200px] px-3 py-2 bg-black/50 border border-gray-600 rounded-md text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 focus:outline-none resize-vertical font-mono text-sm"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Create Snippet
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 