import axios from "axios"
import { useEffect, useState } from "react"

    export default function useSnippets<T = any>(initialSnippets: T[]): [T[], boolean] {
    const [snippets, setSnippets] = useState<T[]>(initialSnippets)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        axios.get("https://snippify-backend.lakshyapaliwal200.workers.dev/api/v1/snippet/all", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setSnippets(res.data.snippets || [])
            setLoading(false)
        }).catch((error) => {
            console.error("Error fetching snippets:", error)
            setLoading(false)
        })
    }, [])  

    return [snippets, loading]
}