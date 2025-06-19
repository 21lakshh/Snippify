import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface UIComponentsRenderProps {
  onToggleSidebar?: () => void;
}

export default function UIComponentsRender({ onToggleSidebar }: UIComponentsRenderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const libraries = [
    {
      name: "Shadcn/ui",
      description: "Copy & paste components built with Radix UI and Tailwind CSS",
      image: "🎯",
      popularity: "★★★★★",
      framework: "React",
      category: "Component Library"
    },
    {
      name: "Ant Design",
      description: "Enterprise-class UI design language and components",
      image: "🐜",
      popularity: "★★★★★",
      framework: "React",
      category: "Enterprise"
    },
    
    {
      name: "Headless UI",
      description: "Unstyled, accessible UI components for React & Vue",
      image: "👻",
      popularity: "★★★★☆",
      framework: "React/Vue",
      category: "Headless"
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom designs",
      image: "🌈",
      popularity: "★★★★★",
      framework: "React",
      category: "Component Library"
    }
  ];

  // Filter libraries based on search query
  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    library.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    library.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile hamburger menu */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">UI Components</h1>
              <p className="text-sm text-gray-400">Explore popular component libraries</p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-32 md:w-64 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Components Section */}
      <section className="flex-1 py-6 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredLibraries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No components found matching your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLibraries.map((library, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-900/50 border-gray-800 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10 group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {library.image}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        {library.popularity}
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-pink-400 transition-colors">
                      {library.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {library.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                        {library.framework}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                        {library.category}
                      </Badge>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all duration-300"
                    >
                      View Components
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
