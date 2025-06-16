import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import SnippetsCard from "../components/SnippetsCard"
import Community from "../components/Community"
import UIComponentsSection from "../components/UIComponentsSection"

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <SnippetsCard />
      <UIComponentsSection />
      <Community />
      <Footer />
    </div>
  )
}