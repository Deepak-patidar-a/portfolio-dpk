import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contacts from './components/Contacts'
import Navbar from './components/Navbar'
import Learnings from './components/Learnings'


function App() {
  return (
    <div className="bg-[#FAFAF9]">
      <Navbar/>
      <Hero />
      <About />
      <Skills />
      <Experience/>
      <Projects/>
      <Learnings/>
      <Contacts/>
      {/* More sections coming: Skills, Experience, Projects, Contact */}
    </div>
  )
}

export default App