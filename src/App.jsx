import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'

function App() {
  return (
    <div className="bg-[#0A0A0F]">
      <Hero />
      <About />
      <Skills />
      <Experience/>
      {/* More sections coming: Skills, Experience, Projects, Contact */}
    </div>
  )
}

export default App