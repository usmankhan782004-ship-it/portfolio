import { useEffect, useRef, useState } from 'react'
import './MasteryRoadmap.css'

const MILESTONES = [
    {
        month: 'Month 1',
        title: 'Foundations & CLI Mastery',
        description:
            'Deep dive into Linux fundamentals — navigating the file system, understanding permissions, mastering essential commands, and building muscle memory for the terminal.',
        skills: ['Bash', 'File System', 'Permissions', 'Package Managers', 'SSH'],
    },
    {
        month: 'Month 2',
        title: 'Shell Scripting & Automation',
        description:
            'Writing robust shell scripts, automating repetitive tasks, building cron jobs, and learning text processing tools to boost productivity 10x.',
        skills: ['Bash Scripts', 'Cron', 'sed', 'awk', 'grep', 'Automation'],
    },
    {
        month: 'Month 3',
        title: 'System Administration & Networking',
        description:
            'Managing users, services, and processes. Understanding networking fundamentals, firewall configuration, and system monitoring.',
        skills: ['systemd', 'Networking', 'Firewalls', 'Logs', 'Process Mgmt'],
    },
    {
        month: 'Month 4',
        title: 'Docker & Containerization',
        description:
            'Building, running, and orchestrating containers. Writing production-grade Dockerfiles, composing multi-service architectures, and understanding image optimization.',
        skills: ['Docker', 'Docker Compose', 'Images', 'Volumes', 'Networking'],
    },
    {
        month: 'Month 5',
        title: 'CI/CD Pipelines & Infrastructure',
        description:
            'Setting up automated build-test-deploy workflows with GitHub Actions, understanding infrastructure-as-code principles, and deploying to cloud platforms.',
        skills: ['GitHub Actions', 'CI/CD', 'YAML', 'Cloud Deploy', 'IaC'],
    },
    {
        month: 'Month 6',
        title: 'Security Hardening & Monitoring',
        description:
            'Securing Linux servers — SSH hardening, intrusion detection, vulnerability scanning, performance monitoring, and establishing production-ready security postures.',
        skills: ['SSH Hardening', 'Fail2ban', 'Monitoring', 'Scanning', 'Auditing'],
    },
]

export default function MasteryRoadmap() {
    const timelineRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const nodeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.2 }
        )

        const nodes = timelineRef.current?.querySelectorAll('.roadmap-node')
        nodes?.forEach((node) => nodeObserver.observe(node))

        // Scroll-based progress bar
        const handleScroll = () => {
            if (!timelineRef.current) return
            const rect = timelineRef.current.getBoundingClientRect()
            const windowH = window.innerHeight
            const totalH = rect.height

            if (rect.top >= windowH) {
                setProgress(0)
            } else if (rect.bottom <= 0) {
                setProgress(100)
            } else {
                const scrolled = windowH - rect.top
                const pct = Math.min(100, Math.max(0, (scrolled / (totalH + windowH)) * 100))
                setProgress(pct)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            nodes?.forEach((node) => nodeObserver.unobserve(node))
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section id="roadmap" className="roadmap">
            <div className="container">
                <p className="section-label animate-on-scroll">Journey</p>
                <h2 className="section-title animate-on-scroll">Linux Mastery Roadmap</h2>
                <p className="section-subtitle animate-on-scroll">
                    A structured 6-month path from fundamentals to production-grade security hardening.
                </p>

                <div className="roadmap-summary animate-on-scroll">
                    <div className="roadmap-stat glass">
                        <div className="roadmap-stat-value">6</div>
                        <div className="roadmap-stat-label">Months</div>
                    </div>
                    <div className="roadmap-stat glass">
                        <div className="roadmap-stat-value">30+</div>
                        <div className="roadmap-stat-label">Skills</div>
                    </div>
                    <div className="roadmap-stat glass">
                        <div className="roadmap-stat-value">∞</div>
                        <div className="roadmap-stat-label">Commitment</div>
                    </div>
                </div>

                <div className="roadmap-timeline" ref={timelineRef}>
                    <div className="roadmap-line" />
                    <div
                        className="roadmap-progress"
                        style={{ height: `${progress}%` }}
                    />

                    {MILESTONES.map((m, i) => (
                        <div
                            key={i}
                            className="roadmap-node"
                            style={{ transitionDelay: `${i * 0.12}s` }}
                        >
                            <div className="roadmap-dot" />
                            <span className="roadmap-month">{m.month}</span>
                            <div className="roadmap-card glass">
                                <h3 className="roadmap-card-title">{m.title}</h3>
                                <p className="roadmap-card-desc">{m.description}</p>
                                <div className="roadmap-skills">
                                    {m.skills.map((s) => (
                                        <span key={s} className="roadmap-skill">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
