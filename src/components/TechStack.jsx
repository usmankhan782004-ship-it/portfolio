import { useEffect, useRef } from 'react'
import './TechStack.css'

const CATEGORIES = [
    {
        id: 'devops',
        icon: '⚙',
        title: 'DevOps & Infrastructure',
        description: 'Building and automating scalable infrastructure with modern containerization and CI/CD workflows.',
        tags: ['Linux', 'Docker', 'Git', 'Bash', 'CI/CD', 'Nginx', 'AWS', 'GitHub Actions'],
        variant: 'devops',
    },
    {
        id: 'ai',
        icon: '⬡',
        title: 'AI & Machine Learning',
        description: 'Designing intelligent systems for real-world applications — from medical diagnostics to interactive tutors.',
        tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'OpenAI API', 'NLP'],
        variant: 'ai',
    },
    {
        id: 'security',
        icon: '⛨',
        title: 'Cybersecurity',
        description: 'Ethical hacking, penetration testing, and security hardening to protect critical systems and data.',
        tags: ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'OWASP', 'Kali Linux', 'Wireshark'],
        variant: 'security',
    },
]

export default function TechStack() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="tech" className="tech-stack" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">Technical Stack</p>
                <h2 className="section-title animate-on-scroll">Tools I Work With</h2>
                <p className="section-subtitle animate-on-scroll">
                    Specialized across three core domains — building, securing, and automating.
                </p>

                <div className="tech-grid">
                    {CATEGORIES.map((cat, i) => (
                        <div
                            key={cat.id}
                            className={`tech-card glass glass-cyan tech-card--${cat.variant} animate-on-scroll`}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className={`tech-card-icon tech-card-icon--${cat.variant}`}>
                                {cat.icon}
                            </div>
                            <h3 className="tech-card-title">{cat.title}</h3>
                            <p className="tech-card-desc">{cat.description}</p>
                            <div className="tech-tags">
                                {cat.tags.map((tag) => (
                                    <span key={tag} className="tech-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
