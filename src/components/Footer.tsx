import {
    Code,
    Github,
    Twitter,
    Linkedin,
  } from "lucide-react"

export default function Footer() {
    return (
        <div>
            <footer className="py-12 px-6 border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50 animate-on-scroll">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="animate-on-scroll stagger-1">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Snippify
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Empowering developers with reusable code snippets and community connections.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        {[
                            {
                                title: "Platform",
                                links: ["Browse Snippets", "Add Snippet", "UI Components", "API Documentation"],
                            },
                            {
                                title: "Community",
                                links: ["Discord Server", "Twitter Community", "Developer Blog", "Events"],
                            },
                            {
                                title: "Support",
                                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
                            },
                        ].map((section, index) => (
                            <div key={index} className={`animate-on-scroll stagger-${index + 2}`}>
                                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-2 text-gray-400">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href="#"
                                                className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 animate-on-scroll stagger-5">
                        <p>&copy; {new Date().getFullYear()} Snippify. All rights reserved. Built with ❤️ by Laksh.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}