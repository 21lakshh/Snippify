import { useEffect, useId, useState } from "react";
import {  motion } from "motion/react";
import NewSnippetForm, { type SnippetFormData } from "./NewSnippetForm";
import { Menu } from "lucide-react";
import { Badge } from "./ui/badge";
import { type Snippet } from "../types/dashboard";
import useCachedPrivateSnippets from "../hooks/useCachedPrivateSnippets";
import axios from "axios";

interface UpdateSnippetsProps {
  onToggleSidebar: () => void;
}

export default function UpdateSnippets({ onToggleSidebar }: UpdateSnippetsProps) {
  const [snippets, loading, refetch] = useCachedPrivateSnippets<Snippet>();
  const [active, setActive] = useState<Snippet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        setShowForm(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);



  const handleSnippetClick = (snippet: Snippet) => {
    setActive(snippet);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: SnippetFormData) => {
    // Handle update logic here later
    try{
        console.log(active?.id);
        console.log(data);
    const response = await axios.put(`https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/snippet/update/${active?.id}`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

        console.log(response);
        setShowForm(false);
        setActive(null);
        refetch(); // Refresh cached data after successful update
    } catch (error) {
        console.log(error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setActive(null);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">Update Snippets</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-2 text-gray-400">Loading snippets...</span>
          </div>
        ) : Array.isArray(snippets) && snippets.length > 0 ? (
          <div className="max-w-4xl mx-auto w-full space-y-4">
            {snippets.map((snippet) => (
            <motion.div
                layoutId={`card-${snippet.id}-${id}`}
                key={`card-${snippet.id}-${id}`}
                onClick={() => handleSnippetClick(snippet)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-gray-800/30 bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl cursor-pointer transition-all duration-200"
              >
                <div className="flex gap-4 flex-col md:flex-row w-full">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${snippet.id}-${id}`}
                      className="font-medium text-white text-center md:text-left mb-2"
                    >
                      {snippet.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${snippet.id}-${id}`}
                      className="text-gray-400 text-center md:text-left mb-2"
                    >
                      {snippet.description}
                    </motion.p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {snippet.tags && Array.isArray(snippet.tags) && snippet.tags.length > 0 ? (
                        snippet.tags.map((tagItem: any, index: number) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="bg-purple-600/20 text-purple-300 border border-purple-500/30"
                          >
                            {tagItem.tag ? tagItem.tag.name : tagItem.name}
                          </Badge>
                        ))
                      ) : null}
                    </div>
                  </div>
                </div>
                  </motion.div>
            ))}
                </div>
        ) : (
          <div className="text-gray-400 text-center py-8">
            <p>No snippets found to update.</p>
            <p className="text-sm mt-2">Create some snippets first!</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && active && (
        <NewSnippetForm
          isOpen={showForm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={{
            title: active.title,
            description: active.description,
            code: active.code,
            tags: active.tags ? active.tags.map((tag: any) => ({ 
              name: tag.tag ? tag.tag.name : tag.name 
            })) : [],
            isPrivate: active.isPrivate || false
          }}
        />
      )}
            </div>
  );
}


