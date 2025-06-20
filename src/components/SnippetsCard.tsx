import { Badge } from "./ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import ShinyText from "./ui/ShinyText"


export default function SnippetsCard() {
    return (
        <div>
               {/* Code Snippet Repository Section */}
      <section id="snippets" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-b from-blue-500 to-cyan-500 bg-clip-text text-transparent jura-regular">
                Eliminate the Dry Rule
              </span>
            </h2>
            <ShinyText text="Access thousands of verified, community-tested code snippets. Save time and focus on what matters most." className="text-md md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4" disabled={false} speed={5}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "React Custom Hook",
                description: "useLocalStorage hook for persistent state management",
                language: "TypeScript",
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
                className={`bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 animate-on-scroll stagger-${index + 1} group w-full`}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 group-hover:bg-blue-800/30 group-hover:text-blue-300 transition-all duration-300 text-xs sm:text-sm"
                    >
                      {snippet.language}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300 text-lg sm:text-xl leading-tight">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm sm:text-base leading-relaxed">{snippet.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="bg-black/50 rounded-lg p-3 sm:p-4 border border-gray-800 group-hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                    <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      <code className="whitespace-pre-wrap break-words sm:whitespace-pre">{snippet.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </div>
    )
}