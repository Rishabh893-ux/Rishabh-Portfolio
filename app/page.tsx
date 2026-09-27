import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import GitHubRepos from "@/components/GitHubRepos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Experience />
        <ProjectGrid />
        <About />
        <Skills />
        <Timeline />
        <GitHubRepos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
