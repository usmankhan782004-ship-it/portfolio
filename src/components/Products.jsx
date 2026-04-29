import { useEffect, useRef } from 'react'
import './Products.css'

const PRODUCTS = [
    {
        icon: '◉',
        label: 'SaaS Product',
        title: 'Professor Dost',
        description:
            'An AI-powered academic assistant that helps students find answers faster, organize study sessions, and learn interactively.',
        tags: ['AI Assistant', 'Education', 'Productivity'],
        href: 'https://professor-dost.vercel.app/',
        accent: 'cyan',
    },
    {
        icon: '◈',
        label: 'SaaS Product',
        title: 'Academia Pro',
        description:
            'A student workflow platform that organizes resources, reduces friction, and keeps academic tasks manageable in one place.',
        tags: ['Workflow', 'Student Tools', 'Web App'],
        href: 'https://academia-pro-kohl.vercel.app/',
        accent: 'purple',
    },
]

export default function Products() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.15 }
        )

        const items = sectionRef.current?.querySelectorAll('.animate-on-scroll')
        items?.forEach((el) => observer.observe(el))

        return () => items?.forEach((el) => observer.unobserve(el))
    }, [])

    return (
        <section id="products" className="products" ref={sectionRef}>
            <div className="container">
                <p className="section-label animate-on-scroll">SaaS Products</p>
                <h2 className="section-title animate-on-scroll">Live Products</h2>
                <p className="section-subtitle animate-on-scroll">
                    These are the SaaS products I have shipped and put in front of real users.
                </p>

                <div className="products-grid">
                    {PRODUCTS.map((product, index) => (
                        <article
                            key={product.title}
                            className={`product-card glass animate-on-scroll product-card--${product.accent}`}
                            style={{ transitionDelay: `${index * 0.12}s` }}
                        >
                            <div className="product-card-top">
                                <div className="product-icon">{product.icon}</div>
                                <a
                                    href={product.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="product-link"
                                >
                                    Open App ↗
                                </a>
                            </div>

                            <div className="product-card-body">
                                <span className="product-label">{product.label}</span>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-tags">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="product-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}