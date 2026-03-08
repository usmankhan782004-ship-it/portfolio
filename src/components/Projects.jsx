import { useEffect, useRef } from 'react'
import './Projects.css'

const PROJECTS = [
    {
        icon: '🧬',
        badge: { label: 'Final Year Project', variant: 'fyp' },
        title: 'AI Skin Allergy Detection',
        description:
            'Medical AI diagnostics system that leverages deep learning to classify skin allergies from images. Built with convolutional neural networks for accurate, real-time analysis to assist dermatological assessments.',
        tags: ['Python', 'TensorFlow', 'CNN', 'Medical AI', 'Image Classification'],
        github: 'https://github.com/usmankhan782004-ship-it',
    },
    {
        icon: '🛡',
        badge: { label: 'Security', variant: 'security' },
        title: 'ClaimGuard',
        description:
            'Security-focused claim management platform with advanced authentication, real-time email notifications via Resend, and a robust Supabase backend for secure data handling and dispute resolution workflows.',
        tags: ['Next.js', 'Supabase', 'Resend', 'Auth', 'TypeScript'],
        github: 'https://github.com/usmankhan782004-ship-it',
    },
    {
        icon: '🌿',
        badge: { label: 'E-Commerce', variant: 'ecommerce' },
        title: 'Herbivita',
        description:
            'Full-scale e-commerce platform for herbal products — featuring product catalog management, shopping cart, order processing, and payment integration. Extensive debugging and performance optimization throughout.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'REST API'],
        github: 'https://github.com/usmankhan782004-ship-it',
    },
    {
        icon: '🎓',
        badge: { label: 'AI Tutor', variant: 'ai' },
        title: 'Professor Lumina',
        description:
            'Interactive AI-powered tutor designed for personalized digital learning experiences. Features adaptive lesson paths, real-time quiz generation, and an intelligent conversation interface for engaging education.',
        tags: ['React', 'OpenAI API', 'NLP', 'Vite', 'Education Tech'],
        github: 'https://github.com/usmankhan782004-ship-it',
    },
    {
        icon: '📊',
        badge: { label: 'Data Viz', variant: 'data' },
        title: 'Personal Health Dashboard',
        description:
            'Streamlit-based data visualization tool that transforms personal health metrics into interactive charts and insights. Track trends, set goals, and make data-driven health decisions with intuitive dashboards.',
        tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Data Science'],
        github: 'https://github.com/usmankhan782004-ship-it',
    },
]

export default function Projects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1 }
        )

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="projects" className="projects" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">Portfolio</p>
                <h2 className="section-title animate-on-scroll">Featured Projects</h2>
                <p className="section-subtitle animate-on-scroll">
                    Real-world applications spanning AI diagnostics, security platforms, and intelligent learning systems.
                </p>

                <div className="projects-grid">
                    {PROJECTS.map((project, i) => (
                        <div
                            key={i}
                            className="project-card glass animate-on-scroll"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className="project-header">
                                <div className={`project-icon project-icon--${i}`}>
                                    {project.icon}
                                </div>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    ↗ GitHub
                                </a>
                            </div>

                            <div className="project-body">
                                <span className={`project-badge project-badge--${project.badge.variant}`}>
                                    {project.badge.label}
                                </span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="project-tag">{tag}</span>
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
