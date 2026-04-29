import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TechStack from './components/TechStack.jsx'
import Experience from './components/Experience.jsx'
import MasteryRoadmap from './components/MasteryRoadmap.jsx'
import Products from './components/Products.jsx'
import Projects from './components/Projects.jsx'
import Osmo from './components/Osmo.jsx'
import Contact from './components/Contact.jsx'
import NeuralBackdrop from './components/NeuralBackdrop.jsx'
import './App.css'

function App() {
    return (
        <div className="app">
            <NeuralBackdrop />
            <Navbar />
            <Hero />
            <TechStack />
            <Experience />
            <MasteryRoadmap />
            <Products />
            <Projects />
            <Osmo />
            <Contact />
        </div>
    )
}

export default App
