import { Menu, Trash2 } from "lucide-react";
import { type Snippet } from "../types/dashboard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import ConfirmationDialog from "./ui/confirmation-dialog";
import useCachedPrivateSnippets from "../hooks/useCachedPrivateSnippets";
import axios from "axios";
import { useState } from "react";

interface DeleteSnippetsProps {
  onToggleSidebar: () => void;
}

export default function DeleteSnippets({ onToggleSidebar }: DeleteSnippetsProps) {
  const [snippets, loading, refetch] = useCachedPrivateSnippets<Snippet>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Snippet | null>(null);

  const handleDeleteClick = (snippet: Snippet) => {
    setConfirmDelete(snippet);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;

    setDeletingId(confirmDelete.id);
    setConfirmDelete(null);
    
    try {
      const response = await axios.delete(`https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/snippet/delete/${confirmDelete.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });

      console.log("Delete response:", response);
      
      // Refresh cached data after successful deletion
      refetch();
    } catch (error: any) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
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
            <h1 className="text-xl font-semibold text-white">Delete Snippets</h1>
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
              <div
                key={snippet.id}
                className="p-4 bg-gray-900/50 border border-gray-800 hover:border-red-600/50 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-2">{snippet.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{snippet.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {snippet.tags && Array.isArray(snippet.tags) && snippet.tags.length > 0 ? (
                        snippet.tags.map((tagItem: any, index: number) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="bg-gray-800 text-gray-300"
                    >
                            {tagItem.tag ? tagItem.tag.name : tagItem.name}
                          </Badge>
                        ))
                      ) : null}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDeleteClick(snippet)}
                    disabled={deletingId === snippet.id}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                    size="sm"
                  >
                    {deletingId === snippet.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8">
            <p>No snippets found to delete.</p>
            <p className="text-sm mt-2">Create some snippets first!</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!confirmDelete}
        title="Delete Snippet"
        message={`Are you sure you want to delete "${confirmDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
            </div>
  );
}
