import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Users, Zap, Code, ArrowRight } from "lucide-react"

export default function Community() {
    return (
        <div>
              {/* Developer Community Section */}
      <section id="community" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/30 hover:scale-110 transition-transform duration-300">
              Developer Community
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Connect with Developers
              </span>
              <br />
              <span className="text-white">all over India</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our thriving community of developers. Network, collaborate, and share knowledge with like-minded
              professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "500+ Developers",
                description: "Active community members sharing knowledge and collaborating on projects",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Daily Discussions",
                description: "Engage in technical discussions, code reviews, and problem-solving sessions",
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Open Source",
                description: "Contribute to open source projects and showcase your work to the community",
              },
            ].map((feature, index) => (
              <div key={index} className={`text-center animate-on-scroll stagger-${index + 1} group`}>
                <div
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 hover:shadow-lg hover:shadow-pink-500/25 animate-float"
                  style={{ animationDelay: `${index}s` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center animate-on-scroll stagger-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-lg px-8 py-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
            >
              Join Our Community
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
        </div>
    )
}