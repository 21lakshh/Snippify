import { Badge } from "./ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

interface TagItem {
    tag: {
        name: string
    }
}
export default function SnipCard({snippet}: {snippet: any}) {
  return (
      <div>
               {/* Code Snippet Repository Section */}
      <section id="snippets" className="py-5 px-6 relative">
        <div className="max-w-7xl mx-auto">
              <Card
                className={`bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 group-hover:bg-blue-800/30 group-hover:text-blue-300 transition-all duration-300"
                    >
                      {snippet.author?.username || "Unknown Author"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{snippet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 rounded-lg p-5 border border-gray-800 group-hover:border-blue-500/30 transition-all duration-300">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                  </div>

                  {/* for tags */}
                  <div className="flex flex-row gap-2 mt-4">
                    {snippet.tags && Array.isArray(snippet.tags) && snippet.tags.length > 0 ? (
                      snippet.tags.map((tagItem: TagItem, index: number) => (
                        <Badge 
                          key={index}
                          variant="secondary" 
                          className="bg-gray-800 text-gray-300 group-hover:bg-blue-800/30 group-hover:text-blue-300 transition-all duration-300"
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