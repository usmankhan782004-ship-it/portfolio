import { useEffect } from 'react'
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
    useEffect(() => {
        let frameId = 0

        const updateScrollMotion = () => {
            const documentElement = document.documentElement
            const maxScroll = Math.max(1, documentElement.scrollHeight - window.innerHeight)
            const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))

            documentElement.style.setProperty('--scroll-progress', progress.toFixed(4))
            documentElement.style.setProperty('--scroll-offset', `${window.scrollY}px`)
            frameId = 0
        }

        const handleScroll = () => {
            if (frameId) return
            frameId = window.requestAnimationFrame(updateScrollMotion)
        }

        updateScrollMotion()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
            if (frameId) window.cancelAnimationFrame(frameId)
        }
    }, [])

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
