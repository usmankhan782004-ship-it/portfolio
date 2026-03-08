import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TechStack from './components/TechStack.jsx'
import Experience from './components/Experience.jsx'
import MasteryRoadmap from './components/MasteryRoadmap.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import './App.css'

function App() {
    return (
        <div className="app">
            <Navbar />
            <Hero />
            <TechStack />
            <Experience />
            <MasteryRoadmap />
            <Projects />
            <Contact />
        </div>
    )
}

export default App
