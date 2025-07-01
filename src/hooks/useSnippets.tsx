import axios from "axios"
import { useEffect, useState, useCallback } from "react"

export default function useSnippets<T = any>(initialSnippets: T[]): [T[], boolean, () => void] {
    const [snippets, setSnippets] = useState<T[]>(initialSnippets)
    const [loading, setLoading] = useState(false)
    
    const fetchSnippets = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/snippet/all", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setSnippets(response.data.snippets || [])
        } catch (error) {
            console.error("Error fetching snippets:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSnippets()
    }, [fetchSnippets])  

    return [snippets, loading, fetchSnippets]
}