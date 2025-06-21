import { Badge } from "./ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { useState } from "react"

interface TagItem {
    tag: {
        name: string
    }
}

// Function to assign colors to tags based on their names
const getTagColor = (tagName: string) => {
  const colors = [
    'blue', 'green', 'purple', 'pink', 'yellow', 'red', 
    'indigo', 'orange', 'teal', 'cyan'
  ];
  
  // Create a simple hash of the tag name to consistently assign the same color
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to pick a color index
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex] as 'blue' | 'green' | 'purple' | 'pink' | 'yellow' | 'red' | 'indigo' | 'orange' | 'teal' | 'cyan';
};

export default function SnipCard({snippet}: {snippet: any}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
      <div>
               {/* Code Snippet Repository Section */}
      <section id="snippets" className="py-5 px-6 relative">
        <div className="max-w-7xl mx-auto">
              <Card
                className="group bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={getTagColor("purple")}
                      className="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:scale-105 transition-all duration-300"
                    >
                      {snippet.author?.username || "Unknown Author"}
                    </Badge>
                    
                    {/* Copy Button */}
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                        copied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{snippet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 rounded-lg p-5 border border-gray-800 group-hover:border-blue-500/30 transition-all duration-300">
                    <pre className="text-sm text-gray-300 overflow-x-auto font-mono">
                      <code className="text-gray-300">{snippet.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                  </div>

                  {/* for tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {snippet.tags && Array.isArray(snippet.tags) && snippet.tags.length > 0 ? (
                      snippet.tags.map((tagItem: TagItem, index: number) => (
                        <Badge 
                          key={index}
                          variant={getTagColor(tagItem.tag.name)}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          {tagItem.tag.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No tags</span>
                    )}
                  </div>
                </CardContent>
              </Card>
        </div>
      </section>
        </div>
    )
}