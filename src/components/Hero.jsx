import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const ROLES = [
    'DevOps Engineer',
    'AI Developer',
    'Security Enthusiast',
    'Linux Specialist',
    'Problem Solver',
]

const HERO_STATS = [
    { value: '3+', label: 'Live SaaS products' },
    { value: '1', label: 'Flagship AI system' },
    { value: '4', label: 'Core domains' },
]

const HERO_SIGNAL = [
    { label: 'Shipping', value: 'Live products' },
    { label: 'Focus', value: 'AI + automation' },
    { label: 'Style', value: 'Cyber editorial' },
]

export default function Hero() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const lastFrameRef = useRef(0)
    const [displayText, setDisplayText] = useState('')
    const [roleIndex, setRoleIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    // ── Typewriter effect ──
    useEffect(() => {
        const currentRole = ROLES[roleIndex]
        let timeout

        if (!isDeleting) {
            if (displayText.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1))
                }, 80)
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000)
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1))
                }, 40)
            } else {
                setIsDeleting(false)
                setRoleIndex((prev) => (prev + 1) % ROLES.length)
            }
        }

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, roleIndex])

    // ── Particle canvas ──
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        const particles = []
        const PARTICLE_COUNT = 48
        const CONNECTION_DIST = 92
        const FRAME_INTERVAL = 1000 / 30

        const resize = () => {
            lastFrameRef.current = 0
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resize()
        window.addEventListener('resize', resize)

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                vx: (Math.random() - 0.5) * 0.26,
                vy: (Math.random() - 0.5) * 0.26,
                radius: Math.random() * 1.2 + 0.45,
                opacity: Math.random() * 0.35 + 0.12,
            })
        }

        const handleMouse = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        canvas.addEventListener('mousemove', handleMouse)

        const animate = (timestamp) => {
            if (timestamp - lastFrameRef.current < FRAME_INTERVAL) {
                animId = requestAnimationFrame(animate)
                return
            }
            lastFrameRef.current = timestamp

            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            ctx.clearRect(0, 0, w, h)

            for (const p of particles) {
                // Mouse repulsion
                const dx = p.x - mouseRef.current.x
                const dy = p.y - mouseRef.current.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 150 && dist > 0) {
                    const force = (150 - dist) / 150
                    p.vx += (dx / dist) * force * 0.09
                    p.vy += (dy / dist) * force * 0.09
                }

                // Damping
                p.vx *= 0.992
                p.vy *= 0.992

                p.x += p.vx
                p.y += p.vy

                // Wrap edges
                if (p.x < 0) p.x = w
                if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h
                if (p.y > h) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`
                ctx.fill()
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.09
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`
                        ctx.lineWidth = 0.35
                        ctx.stroke()
                    }
                }
            }

            animId = requestAnimationFrame(animate)
        }

        animId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            canvas.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return (
        <section id="hero" className="hero">
            {/* Particle canvas background */}
            <canvas ref={canvasRef} className="hero-particles" />

            {/* Ambient orbs */}
            <div className="hero-orb hero-orb--cyan" />
            <div className="hero-orb hero-orb--purple" />

            <div className="container hero-content">
                <div className="hero-copy">
                    <p className="hero-greeting">
                        {'> '}hello_world<span className="hero-cursor">&nbsp;</span>
                    </p>

                    <h1 className="hero-name">
                        Muhammad<br />
                        <span className="hero-name-highlight">Usman Khan</span>
                    </h1>

                    <div className="hero-title">
                        <span className="typewriter-text">{displayText}</span>
                        <span className="typewriter-cursor">|</span>
                    </div>

                    <p className="hero-description">
                        Building resilient infrastructure, intelligent systems, and secure solutions.
                        I bridge the gap between development and operations while exploring the frontiers
                        of artificial intelligence and ethical hacking.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="hero-btn hero-btn--primary" onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
                            <span>⬡</span> View Projects
                        </a>
                        <a href="#contact" className="hero-btn hero-btn--secondary" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                            Get In Touch →
                        </a>
                    </div>

                    <div className="hero-metrics">
                        {HERO_STATS.map((stat) => (
                            <div key={stat.label} className="hero-metric glass">
                                <div className="hero-metric-value">{stat.value}</div>
                                <div className="hero-metric-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="hero-status">
                        <span className="hero-status-dot" />
                        Available for collaboration & opportunities
                    </div>
                </div>

                <div className="hero-scene">
                    <div className="hero-core glass">
                        <div className="hero-core-rings" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="hero-core-orb" aria-hidden="true">
                            <span className="hero-core-orb-shell" />
                            <span className="hero-core-orb-shell hero-core-orb-shell--inner" />
                            <span className="hero-core-orb-glow" />
                        </div>

                        <div className="hero-core-panel hero-core-panel--top">
                            <div className="hero-core-panel-label">Systems online</div>
                            <div className="hero-core-panel-value">AI • SaaS • Security</div>
                        </div>

                        <div className="hero-core-panel hero-core-panel--bottom">
                            <div className="hero-core-panel-label">Current build</div>
                            <div className="hero-core-panel-value">Osmo + product portfolio</div>
                        </div>

                        <div className="hero-signal">
                            {HERO_SIGNAL.map((item) => (
                                <div key={item.label} className="hero-signal-item">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll">
                <div className="hero-scroll-line" />
            </div>
        </section>
    )
}
