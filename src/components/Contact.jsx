import { useEffect, useRef } from 'react'
import './Contact.css'

export default function Contact() {
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

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="contact" className="contact" ref={sectionRef}>
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-card glass animate-on-scroll">
                        <h2 className="contact-heading">Let's Build Something</h2>
                        <p className="contact-text">
                            I'm always open to discussing new projects, collaboration opportunities,
                            or just geeking out about DevOps, AI, and security. Feel free to reach out.
                        </p>

                        <div className="contact-links">
                            <a
                                href="https://github.com/usmankhan782004-ship-it"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link contact-link--github"
                            >
                                <span className="contact-link-icon">⬡</span>
                                GitHub
                            </a>
                            <a
                                href="mailto:usmankhan7.8.2004@gmail.com"
                                className="contact-link contact-link--email"
                            >
                                <span className="contact-link-icon">✉</span>
                                Email Me
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                            >
                                <span className="contact-link-icon">◈</span>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <p className="footer-text">
                        © {new Date().getFullYear()} Muhammad Usman Khan · Built with{' '}
                        <a
                            href="https://github.com/usmankhan782004-ship-it"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {'<'}passion{' />'}
                        </a>
                    </p>
                    <p className="footer-showcase">
                        Currently building a website for my friend’s software house:{' '}
                        <a
                            href="https://nexora-techs.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Nexora Techs
                        </a>
                    </p>
                </footer>
            </div>
        </section>
    )
}
