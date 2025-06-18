import { Terminal, Braces, Hash, Code } from "lucide-react"

export default function AnimatedBackground() {
      const codeSnippets = [
    "const magic = () => { return 'Hello World' }",
    "function createAwesome() { return '✨' }",
    "const developer = { skills: ['React', 'TypeScript'] }",
    "export default function Component() { ... }",
    "import { useState } from 'react'",
    "async function fetchData() { ... }",
    "const [loading, setLoading] = useState(false)",
    "useEffect(() => { console.log('mounted') }, [])",
  ]

    return (
        <>
                {/* Floating Code Elements */}
                <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
                            {codeSnippets.map((snippet, index) => {
          // Position first 5 snippets normally, new ones on the left
          const isLeftSnippet = index >= 5;

          const leftPosition = isLeftSnippet ? 
            `${5 + (index - 5) * 3}%` : // Left area positioning (5%, 8%, 11%)
            `${20 + index * 15}%`;      // Original positioning
          const topPosition = isLeftSnippet ?
            `${15 + (index - 5) * 25}%` : // Left area top positioning
            `${10 + index * 20}%`;         // Original positioning
          
          return (
            <div
              key={index}
              className="absolute text-xs text-blue-400/20 font-mono animate-code-float"
              style={{
                left: leftPosition,
                top: topPosition,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {snippet}
            </div>
          );
        })}
                </div>

                {/* Enhanced Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
                </div>

                {/* Floating Icons */}
                <div className="absolute inset-0 pointer-events-none">
                    <Terminal
                        className="absolute top-20 left-20 w-6 h-6 text-blue-400/30 animate-float"
                        style={{ animationDelay: "0s" }}
                    />
                    <Braces
                        className="absolute top-40 right-32 w-8 h-8 text-purple-400/30 animate-float"
                        style={{ animationDelay: "0.5s" }}
                    />
                    <Hash
                        className="absolute bottom-40 left-40 w-5 h-5 text-pink-400/30 animate-float"
                        style={{ animationDelay: "1s" }}
                    />
                    <Code
                        className="absolute top-60 right-20 w-7 h-7 text-cyan-400/30 animate-float"
                        style={{ animationDelay: "0.25s" }}
                    />
                </div>
        </>
    )
} 