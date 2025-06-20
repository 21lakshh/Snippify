import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ShinyText from "./ui/ShinyText";

export default function UIComponentsSection() {
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
    }
  ];

  return (
    <section id="components" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-b from-pink-400 to-purple-400 bg-clip-text text-transparent jura-regular">
            Curated UI Libraries
          </h2>
          <ShinyText text="Discover exceptional UI component libraries to enhance your applications with beautiful components." className="text-md md:text-xl text-gray-400 max-w-3xl mx-auto" disabled={false} speed={5}/>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraries.map((library, index) => (
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
                

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
