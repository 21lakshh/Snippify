import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// Global cache to persist data between component mounts
let cachedSnippets: any[] = [];
let hasInitiallyLoaded = false;

// Function to clear the global cache - to be called on logout
export const clearSnippetCache = () => {
  cachedSnippets = [];
  hasInitiallyLoaded = false;
};

export default function useCachedPrivateSnippets<T = any>() {
  const [snippets, setSnippets] = useState<T[]>(cachedSnippets);
  const [loading, setLoading] = useState(!hasInitiallyLoaded);

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/snippet/private", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      });
      
      const newSnippets = response.data.snippets || [];
      cachedSnippets = newSnippets; // Update global cache
      setSnippets(newSnippets);
      hasInitiallyLoaded = true;
    } catch (error) {
      console.error("Error fetching snippets:", error);
      // Clear cache on error (e.g., unauthorized)
      cachedSnippets = [];
      setSnippets([]);
      hasInitiallyLoaded = false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Only fetch on first load if not already cached
  useEffect(() => {
    if (!hasInitiallyLoaded) {
      fetchSnippets();
    }
  }, [fetchSnippets]);

  // Manual refetch function for when data changes
  const refetch = useCallback(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  // Clear local state (for when cache is cleared externally)
  const clearLocal = useCallback(() => {
    setSnippets([]);
    setLoading(false);
  }, []);

  return [snippets, loading, refetch, clearLocal] as const;
} 