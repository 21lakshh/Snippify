import { Button } from "./ui/button"
import { Users, Zap, Code, ArrowRight } from "lucide-react"
import { AvatarCircles } from "@/components/magicui/AvatarCircle";
import ShinyText from "./ui/ShinyText";
export default function Community() {

    return (
        <div>
              {/* Developer Community Section */}
      <section id="community" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent jura-regular">
                Connect with Developers
              </span>
              <br />
              <span className="text-white jura-regular">all over </span>
              <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent jura-regular">
                India
              </span>
              <div className="flex justify-center items-center mt-4">
              <AvatarCircles
              numPeople={99}
              avatarUrls={[
                { imageUrl: "https://github.com/shadcn.png", profileUrl: "https://github.com/shadcn" },
                { imageUrl: "https://github.com/shadcn.png", profileUrl: "https://github.com/shadcn" },
                { imageUrl: "https://github.com/shadcn.png", profileUrl: "https://github.com/shadcn" },
                { imageUrl: "https://github.com/shadcn.png", profileUrl: "https://github.com/shadcn" },
                { imageUrl: "https://github.com/shadcn.png", profileUrl: "https://github.com/shadcn" },
              ]}
            />
              </div>
            </h2>
            <ShinyText text="Join our thriving community of developers. Network, collaborate, and share knowledge with like-minded professionals." disabled={false} speed={5} className='custom-class text-md md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto' />
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
              onClick={() => {
                window.location.href = "https://x.com/i/communities/1911761736794776016"
              }}
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