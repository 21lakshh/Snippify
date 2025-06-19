import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// Global cache to persist data between component mounts
let cachedSnippets: any[] = [];
let hasInitiallyLoaded = false;

export default function useCachedPrivateSnippets<T = any>() {
  const [snippets, setSnippets] = useState<T[]>(cachedSnippets);
  const [loading, setLoading] = useState(!hasInitiallyLoaded);

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/snippet/private", {
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

  return [snippets, loading, refetch] as const;
} 