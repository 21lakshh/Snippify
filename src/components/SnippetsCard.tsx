import { Badge } from "./ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Heart, Eye } from "lucide-react"
import { Button } from "./ui/button"

export default function SnippetsCard() {
    return (
        <div>
               {/* Code Snippet Repository Section */}
      <section id="snippets" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/30 hover:scale-110 transition-transform duration-300">
              Code Repository
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Don't Repeat Yourself
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access thousands of verified, community-tested code snippets. Save time and focus on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "React Custom Hook",
                description: "useLocalStorage hook for persistent state management",
                language: "TypeScript",
                likes: 234,
                views: 1200,
                code: `const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  // ... rest of implementation
};`,
              },
              {
                title: "API Error Handler",
                description: "Centralized error handling for API requests",
                language: "JavaScript",
                likes: 189,
                views: 890,
                code: `const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.data);
    return error.response.data.message;
  } else if (error.request) {
    // Request made but no response
    return 'Network error occurred';
  }
  return 'An unexpected error occurred';
};`,
              },
              {
                title: "Debounce Function",
                description: "Optimize performance with debounced function calls",
                language: "JavaScript",
                likes: 156,
                views: 670,
                code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Usage
const debouncedSearch = debounce(searchFunction, 300);`,
              },
            ].map((snippet, index) => (
              <Card
                key={index}
                className={`bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 animate-on-scroll stagger-${index + 1} group`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 group-hover:bg-blue-800/30 group-hover:text-blue-300 transition-all duration-300"
                    >
                      {snippet.language}
                    </Badge>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1 hover:text-red-400 transition-colors duration-300 cursor-pointer">
                        <Heart className="w-4 h-4 hover:scale-125 transition-transform duration-300" />
                        <span>{snippet.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{snippet.views}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{snippet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-800 group-hover:border-blue-500/30 transition-all duration-300">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            Browse All Snippets
          </Button>
        </div>
      </section>
        </div>
    )
}