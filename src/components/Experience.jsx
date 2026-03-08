import { useEffect, useRef } from 'react'
import './Experience.css'

const TIMELINE = [
    {
        period: '2024 – Present',
        title: 'Final Year – BS Computer Science',
        org: 'University',
        desc: 'Focusing on AI/ML research for medical diagnostics. Building the AI Skin Allergy Detection system as a capstone project.',
    },
    {
        period: '2024',
        title: 'DevOps & Linux Mastery',
        org: 'Self-Directed',
        desc: 'Completed a structured 6-month deep dive into Linux, Docker, CI/CD pipelines, and infrastructure automation.',
    },
    {
        period: '2023 – 2024',
        title: 'Full-Stack Development',
        org: 'Freelance & Projects',
        desc: 'Shipped production apps including ClaimGuard, Herbivita e-commerce, and Professor Lumina AI tutor. Worked with React, Next.js, Supabase, and Node.js.',
    },
    {
        period: '2023',
        title: 'Cybersecurity Foundations',
        org: 'Self-Directed',
        desc: 'Studied ethical hacking, penetration testing, and network security. Practiced with Kali Linux, Wireshark, and CTF challenges.',
    },
]

export default function Experience() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.2 }
        )

        const items = sectionRef.current?.querySelectorAll('.experience-item, .animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="experience" className="experience" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">Background</p>
                <h2 className="section-title animate-on-scroll">Experience & Education</h2>
                <p className="section-subtitle animate-on-scroll">
                    A journey through code, security, and intelligent systems.
                </p>

                <div className="experience-grid">
                    {/* About card */}
                    <div className="experience-about glass animate-on-scroll">
                        <h3 className="experience-about-title">Who I Am</h3>
                        <p className="experience-about-text">
                            I'm a Computer Science student and self-taught DevOps engineer who thrives at the
                            intersection of automation, artificial intelligence, and cybersecurity. I believe
                            in learning by building — every project is a chance to push boundaries.
                        </p>
                        <div className="experience-highlights">
                            <span className="experience-highlight">
                                <span className="experience-highlight-dot" /> BS Computer Science
                            </span>
                            <span className="experience-highlight">
                                <span className="experience-highlight-dot" /> AI/ML Research
                            </span>
                            <span className="experience-highlight">
                                <span className="experience-highlight-dot" /> Linux Administration
                            </span>
                            <span className="experience-highlight">
                                <span className="experience-highlight-dot" /> Ethical Hacking
                            </span>
                            <span className="experience-highlight">
                                <span className="experience-highlight-dot" /> Full-Stack Dev
                            </span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="experience-timeline">
                        {TIMELINE.map((item, i) => (
                            <div
                                key={i}
                                className="experience-item"
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <div className="experience-item-dot" />
                                <div className="experience-item-card glass">
                                    <div className="experience-item-period">{item.period}</div>
                                    <h4 className="experience-item-title">{item.title}</h4>
                                    <div className="experience-item-org">{item.org}</div>
                                    <p className="experience-item-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
