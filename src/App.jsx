import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen text-gray-100 font-sans selection:bg-accent-blue/30 overflow-x-hidden">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col items-center pb-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
