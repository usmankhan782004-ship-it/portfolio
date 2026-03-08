import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
    { label: 'Home', href: '#hero' },
    { label: 'Skills', href: '#tech' },
    { label: 'About', href: '#experience' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-40% 0px -55% 0px' }
        )

        const sections = document.querySelectorAll('section[id]')
        sections.forEach((s) => observer.observe(s))

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            sections.forEach((s) => observer.unobserve(s))
        }
    }, [])

    const handleClick = (e, href) => {
        e.preventDefault()
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-inner">
                <div className="navbar-logo">
                    <span className="logo-bracket">{'<'}</span>
                    USK
                    <span className="logo-dot">.</span>
                    dev
                    <span className="logo-bracket">{'/>'}</span>
                </div>

                <button
                    className={`navbar-toggle${mobileOpen ? ' open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-links${mobileOpen ? ' open' : ''}`}>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={activeSection === item.href.slice(1) ? 'active' : ''}
                                onClick={(e) => handleClick(e, item.href)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
