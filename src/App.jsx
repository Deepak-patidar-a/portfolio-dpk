import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contacts from './components/Contacts'
import Navbar from './components/Navbar'
import Learnings from './components/Learnings'
import BottomNav from './components/Bottomnav'


function App() {
  return (
    <div className="bg-[#FAFAF9]">
      <Navbar/>
      <BottomNav/>
      <Hero />
      <About />
      <Experience/>
      <Projects/>
      <Skills />
      <Learnings/>
      <Contacts/>
      {/* More sections coming: Skills, Experience, Projects, Contact */}
    </div>
  )
}

export default App