import { useEffect, useRef } from 'react'
import './Osmo.css'

const OSMO_CAPABILITIES = [
    'Researches relevant context and sources',
    'Collects links and structures usable outputs',
    'Drafts outreach and follow-up messages',
    'Chains tools instead of acting like a single prompt box',
    'Stays moderated, ethical, and user-controlled',
]

const OSMO_PHASES = [
    'Discover',
    'Collect',
    'Draft',
    'Chain',
    'Execute with oversight',
]

const OSMO_HIGHLIGHTS = [
    { value: 'Automated', label: 'Tool chaining' },
    { value: 'Moderated', label: 'Ethical control' },
    { value: 'Research-first', label: 'Web context' },
]

export default function Osmo() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.18 }
        )

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="osmo" className="osmo" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">AI System</p>
                <h2 className="section-title animate-on-scroll">Osmo</h2>
                <p className="section-subtitle animate-on-scroll">
                    Osmo is my automated AI Jarvis-style system for research, outreach, and tool chaining. It is built as an operator layer, not just a chatbot.
                </p>

                <div className="osmo-spotlight glass animate-on-scroll">
                    <div className="osmo-spotlight-orb" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>

                    <div className="osmo-spotlight-copy">
                        <span className="osmo-spotlight-badge">Flagship system</span>
                        <h3 className="osmo-spotlight-title">A control layer for research, outreach, and execution</h3>
                        <p className="osmo-spotlight-text">
                            Osmo is the most ambitious system in the portfolio: it gathers context, turns it into action, and keeps the user in charge from discovery through execution.
                        </p>

                        <div className="osmo-spotlight-flow" aria-hidden="true">
                            <span>Research</span>
                            <span>Extract</span>
                            <span>Draft</span>
                            <span>Chain</span>
                        </div>
                    </div>

                    <div className="osmo-spotlight-stats">
                        {OSMO_HIGHLIGHTS.map((item) => (
                            <div key={item.label} className="osmo-spotlight-stat">
                                <div className="osmo-spotlight-stat-value">{item.value}</div>
                                <div className="osmo-spotlight-stat-label">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="osmo-layout">
                    <div className="osmo-card glass animate-on-scroll">
                        <div className="osmo-orbit" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                        <h3 className="osmo-title">What it does</h3>
                        <p className="osmo-text">
                            It researches the web, collects useful links, prepares outreach drafts, and connects multiple tools into one guided flow while keeping the user in control.
                        </p>

                        <div className="osmo-pills">
                            {OSMO_PHASES.map((phase) => (
                                <span key={phase} className="osmo-pill">
                                    {phase}
                                </span>
                            ))}
                        </div>

                        <div className="osmo-mini-panel" aria-hidden="true">
                            <span className="osmo-mini-panel-label">Live state</span>
                            <div className="osmo-mini-panel-bars">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>

                    <div className="osmo-card osmo-card--accent glass animate-on-scroll">
                        <h3 className="osmo-title">Core capabilities</h3>
                        <ul className="osmo-list">
                            {OSMO_CAPABILITIES.map((item) => (
                                <li key={item} className="osmo-list-item">
                                    <span className="osmo-dot" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="osmo-callout">
                            Built for strong autonomy while staying practical and ethical.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}